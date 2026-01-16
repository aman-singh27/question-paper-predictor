import { getClassificationModel } from '../config/gemini';

/**
 * Subject Classification Service using Google Gemini
 * Single responsibility: Extract metadata from OCR text
 */

// Exact prompt template as specified
const CLASSIFICATION_PROMPT = `You are an academic exam paper classifier.

Given the raw OCR text of a university exam paper, extract the following fields:

- subject: official subject name
- course_code: if explicitly mentioned, else null
- exam_type: one of ["Mid Semester", "End Semester", "Quiz", "Other"]
- confidence: number between 0 and 1 indicating certainty

Rules:
- Do NOT hallucinate course codes
- Use only information present in the text
- If unsure, set field to null
- Output STRICT JSON ONLY
- No explanations

OCR TEXT:
{{OCR_TEXT}}`;

/**
 * Classification metadata interface
 */
export interface ClassificationMetadata {
    subject: string | null;
    courseCode: string | null;
    examType: 'Mid Semester' | 'End Semester' | 'Quiz' | 'Other';
    confidence: number;
}

/**
 * Classify exam paper using Gemini
 * @param ocrText - Extracted OCR text from paper
 * @returns Parsed classification metadata
 * @throws Error if Gemini fails or returns invalid JSON
 */
export const classifyExamPaper = async (
    ocrText: string
): Promise<ClassificationMetadata> => {
    try {
        // Get Gemini model
        const model = getClassificationModel();

        // Build prompt with OCR text
        const prompt = CLASSIFICATION_PROMPT.replace('{{OCR_TEXT}}', ocrText);

        // Call Gemini
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON response
        // Remove markdown code blocks if present
        const cleanedText = text
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        const metadata = JSON.parse(cleanedText);

        // Validate required fields
        if (
            !metadata.hasOwnProperty('subject') ||
            !metadata.hasOwnProperty('course_code') ||
            !metadata.hasOwnProperty('exam_type') ||
            !metadata.hasOwnProperty('confidence')
        ) {
            throw new Error('Invalid JSON structure from Gemini');
        }

        // Validate exam_type
        const validExamTypes = ['Mid Semester', 'End Semester', 'Quiz', 'Other'];
        if (!validExamTypes.includes(metadata.exam_type)) {
            metadata.exam_type = 'Other';
        }

        // Validate confidence
        if (
            typeof metadata.confidence !== 'number' ||
            metadata.confidence < 0 ||
            metadata.confidence > 1
        ) {
            metadata.confidence = 0.5;
        }

        return {
            subject: metadata.subject,
            courseCode: metadata.course_code,
            examType: metadata.exam_type,
            confidence: metadata.confidence,
        };
    } catch (error) {
        throw new Error(
            `Classification failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};
