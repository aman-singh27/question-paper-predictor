import { getClassificationModel } from '../config/gemini';

/**
 * Topic Inferencer Service using Google Gemini
 * Single responsibility: Infer topic label for a question
 */

// Exact prompt template as specified
const TOPIC_INFERENCE_PROMPT = `You are an academic question classifier.

Given:
- a subject name
- a single exam question

Return the MOST LIKELY topic this question belongs to.

Rules:
- Topic must be a short academic noun phrase (2–4 words)
- Do NOT include marks or question type
- Do NOT invent syllabus units
- Use standard university terminology
- Output STRICT JSON ONLY
- No explanations

Return format:
{
  "topic": "<topic name>"
}

SUBJECT:
{{SUBJECT_NAME}}

QUESTION:
{{QUESTION_TEXT}}`;

/**
 * Infer topic for a single question using Gemini
 * @param subject - Subject name from classification
 * @param questionText - Full question text
 * @returns Topic label (short noun phrase)
 * @throws Error if Gemini fails or returns invalid JSON
 */
export const inferTopic = async (
    subject: string,
    questionText: string
): Promise<string> => {
    try {
        // Get Gemini model
        const model = getClassificationModel();

        // Build prompt with subject and question
        const prompt = TOPIC_INFERENCE_PROMPT
            .replace('{{SUBJECT_NAME}}', subject || 'Unknown Subject')
            .replace('{{QUESTION_TEXT}}', questionText);

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

        const parsed = JSON.parse(cleanedText);

        // Validate topic field exists
        if (!parsed.hasOwnProperty('topic') || typeof parsed.topic !== 'string') {
            throw new Error('Invalid JSON structure - missing topic field');
        }

        return parsed.topic.trim();
    } catch (error) {
        throw new Error(
            `Topic inference failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};
