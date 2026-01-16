import * as functions from 'firebase-functions';
import express, { Request, Response } from 'express';
import busboy from 'busboy';
import cors from 'cors';
import { verifyAuth } from '../middleware/auth';
import { extractTextFromBuffer } from '../services/ocrService';
import { normalizeText } from '../utils/textNormalizer';
import { generateFingerprint } from '../utils/fingerprint';
import { checkDuplicate } from '../services/duplicateChecker';
import { classifyExamPaper } from '../services/subjectClassifier';
import { extractQuestions } from '../services/questionExtractor';
import { inferTopic } from '../services/topicInferencer';
import { db } from '../config/firebaseAdmin';

const app = express();
app.use(cors({ origin: true }));

/**
 * POST /analyzePaper
 * Accepts file upload directly (no Storage)
 * Complete pipeline: OCR → Normalize → Deduplicate → Classify → Extract Questions → Infer Topics
 */
app.post('/', verifyAuth, async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        let fileBuffer: Buffer | null = null;
        let fileName = '';

        // Parse multipart form data
        const bb = busboy({ headers: req.headers });

        bb.on('file', (fieldname, file, info) => {
            const { filename } = info;
            fileName = filename;
            const chunks: Buffer[] = [];

            file.on('data', (data) => {
                chunks.push(data);
            });

            file.on('end', () => {
                fileBuffer = Buffer.concat(chunks);
            });
        });

        await new Promise<void>((resolve, reject) => {
            bb.on('finish', resolve);
            bb.on('error', reject);
            req.pipe(bb);
        });

        if (!fileBuffer) {
            res.status(400).json({
                error: 'Bad Request',
                message: 'No file uploaded',
            });
            return;
        }

        // Step 1: Extract text using Google Cloud Vision (from buffer)
        const rawText = await extractTextFromBuffer(fileBuffer);

        // Step 2: Normalize the extracted text
        const normalizedText = normalizeText(rawText);

        // Step 3: Generate fingerprint
        const fingerprint = generateFingerprint(normalizedText);

        // Step 4: Create initial paper document
        const paperRef = db.collection('papers').doc();
        const paperId = paperRef.id;

        // Step 5: Check for duplicate
        const duplicateCheck = await checkDuplicate(fingerprint, paperId);

        if (duplicateCheck.isDuplicate && duplicateCheck.paperId) {
            // DUPLICATE DETECTED - Early exit
            await paperRef.set({
                paperId,
                ocrText: normalizedText,
                uploadedBy: user.uid,
                createdAt: new Date(),
                ocrCompleted: true,
                fileName,
                fingerprint,
                duplicateDetected: true,
                canonicalPaperId: duplicateCheck.paperId,
            });

            res.status(200).json({
                success: true,
                message: 'Duplicate paper detected - linked to existing analysis',
                data: {
                    paperId,
                    canonicalPaperId: duplicateCheck.paperId,
                    ocrStatus: 'completed',
                    duplicateDetected: true,
                },
            });
            return;
        }

        // NEW PAPER - Continue full pipeline
        await paperRef.set({
            paperId,
            ocrText: normalizedText,
            uploadedBy: user.uid,
            createdAt: new Date(),
            ocrCompleted: true,
            fileName,
            fingerprint,
            duplicateDetected: false,
            subject: null,
            courseCode: null,
            examType: null,
            classificationConfidence: null,
            classificationCompleted: false,
            questionExtractionCompleted: false,
            topicInferenceCompleted: false,
        });

        // Step 6: Classify paper using Gemini
        try {
            const metadata = await classifyExamPaper(normalizedText);

            await paperRef.update({
                subject: metadata.subject,
                courseCode: metadata.courseCode,
                examType: metadata.examType,
                classificationConfidence: metadata.confidence,
                classificationCompleted: true,
            });

            // Step 7: Extract questions
            try {
                const questions = await extractQuestions(normalizedText);

                const batch = db.batch();
                const questionRefs: { id: string; text: string }[] = [];

                questions.forEach((question) => {
                    const questionRef = paperRef.collection('questions').doc();
                    batch.set(questionRef, {
                        questionNumber: question.questionNumber,
                        questionText: question.questionText,
                        marks: question.marks,
                        questionType: question.questionType,
                    });
                    questionRefs.push({
                        id: questionRef.id,
                        text: question.questionText,
                    });
                });
                await batch.commit();

                await paperRef.update({
                    questionExtractionCompleted: true,
                });

                // Step 8: Infer topics
                let topicInferenceSuccess = true;
                const topicPromises = questionRefs.map(async (qRef) => {
                    try {
                        const topic = await inferTopic(
                            metadata.subject || 'Unknown Subject',
                            qRef.text
                        );

                        await paperRef.collection('questions').doc(qRef.id).update({
                            topic,
                        });
                    } catch (topicError) {
                        topicInferenceSuccess = false;
                        await paperRef.collection('questions').doc(qRef.id).update({
                            topicInferenceError:
                                topicError instanceof Error
                                    ? topicError.message
                                    : 'Topic inference failed',
                        });
                    }
                });

                await Promise.all(topicPromises);

                await paperRef.update({
                    topicInferenceCompleted: topicInferenceSuccess,
                });

                res.status(200).json({
                    success: true,
                    message: 'Complete analysis pipeline finished',
                    data: {
                        paperId,
                        ocrStatus: 'completed',
                        classificationStatus: 'completed',
                        questionExtractionStatus: 'completed',
                        topicInferenceStatus: topicInferenceSuccess ? 'completed' : 'partial',
                        duplicateDetected: false,
                        metadata: {
                            subject: metadata.subject,
                            courseCode: metadata.courseCode,
                            examType: metadata.examType,
                            confidence: metadata.confidence,
                        },
                        questionsExtracted: questions.length,
                    },
                });
            } catch (questionError) {
                await paperRef.update({
                    questionExtractionCompleted: false,
                    questionExtractionError:
                        questionError instanceof Error
                            ? questionError.message
                            : 'Question extraction failed',
                });

                res.status(200).json({
                    success: true,
                    message: 'OCR and classification completed, question extraction failed',
                    data: {
                        paperId,
                        ocrStatus: 'completed',
                        classificationStatus: 'completed',
                        questionExtractionStatus: 'failed',
                        duplicateDetected: false,
                        metadata: {
                            subject: metadata.subject,
                            courseCode: metadata.courseCode,
                            examType: metadata.examType,
                            confidence: metadata.confidence,
                        },
                        questionExtractionError:
                            questionError instanceof Error
                                ? questionError.message
                                : 'Question extraction failed',
                    },
                });
            }
        } catch (classificationError) {
            await paperRef.update({
                classificationCompleted: false,
                classificationError:
                    classificationError instanceof Error
                        ? classificationError.message
                        : 'Classification failed',
            });

            res.status(200).json({
                success: true,
                message: 'OCR completed, classification failed',
                data: {
                    paperId,
                    ocrStatus: 'completed',
                    classificationStatus: 'failed',
                    duplicateDetected: false,
                    classificationError:
                        classificationError instanceof Error
                            ? classificationError.message
                            : 'Classification failed',
                },
            });
        }
    } catch (error) {
        console.error('OCR analysis error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error instanceof Error ? error.message : 'OCR analysis failed',
        });
    }
});

export const analyzePaper = functions.https.onRequest(app);
