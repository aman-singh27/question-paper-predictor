import { getClassificationModel } from '../config/gemini';

/**
 * Question Extractor Service using Google Gemini
 * Single responsibility: Parse OCR text into structured questions
 */

// Exact prompt template as specified
const QUESTION_EXTRACTION_PROMPT = `You are an exam paper parser.

Given the OCR text of a university exam paper, extract ALL questions.

For each question, return:
- question_number (string, preserve original numbering)
- question_text (string)
- marks (number or null)
- question_type (one of ["Subjective", "Numerical", "MCQ", "Other"])

Rules:
- Do NOT summarize or rephrase questions
- Preserve original wording
- If marks are not mentioned, set null
- Output STRICT JSON ONLY
- Output an array of objects
- No explanations, no markdown

OCR TEXT:
{{OCR_TEXT}}`;

/**
 * Question interface
 */
export interface Question {
    questionNumber: string;
    questionText: string;
    marks: number | null;
    questionType: 'Subjective' | 'Numerical' | 'MCQ' | 'Other';
}

/**
 * Extract questions from OCR text using Gemini
 * @param ocrText - Normalized OCR text
 * @returns Array of structured questions
 * @throws Error if Gemini fails or returns invalid JSON
 */
export const extractQuestions = async (
    ocrText: string
): Promise<Question[]> => {
    try {
        // Get Gemini model
        const model = getClassificationModel();

        // Build prompt with OCR text
        const prompt = QUESTION_EXTRACTION_PROMPT.replace('{{OCR_TEXT}}', ocrText);

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

        const questions = JSON.parse(cleanedText);

        // Validate array structure
        if (!Array.isArray(questions)) {
            throw new Error('Response is not an array');
        }

        // Validate each question has required fields
        const validatedQuestions: Question[] = questions.map((q, index) => {
            if (
                !q.hasOwnProperty('question_number') ||
                !q.hasOwnProperty('question_text') ||
                !q.hasOwnProperty('marks') ||
                !q.hasOwnProperty('question_type')
            ) {
                throw new Error(`Question at index ${index} missing required fields`);
            }

            // Validate question_type
            const validTypes = ['Subjective', 'Numerical', 'MCQ', 'Other'];
            if (!validTypes.includes(q.question_type)) {
                q.question_type = 'Other';
            }

            return {
                questionNumber: String(q.question_number),
                questionText: String(q.question_text),
                marks: q.marks === null ? null : Number(q.marks),
                questionType: q.question_type,
            };
        });

        return validatedQuestions;
    } catch (error) {
        throw new Error(
            `Question extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};
