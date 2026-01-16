/**
 * Text Normalizer
 * Prepares OCR text for downstream NLP processing
 * All operations are deterministic - no AI involved
 */

/**
 * Normalize OCR text output
 * @param rawText - Raw text from OCR
 * @returns Normalized text ready for processing
 */
export const normalizeText = (rawText: string): string => {
    let normalized = rawText;

    // Convert to lowercase
    normalized = normalized.toLowerCase();

    // Remove common page number patterns
    // Matches: "page 1", "- 1 -", "[1]", etc.
    normalized = normalized.replace(/\bpage\s+\d+\b/gi, '');
    normalized = normalized.replace(/^-\s*\d+\s*-$/gm, '');
    normalized = normalized.replace(/^\[\d+\]$/gm, '');
    normalized = normalized.replace(/^\d+\s*$/gm, '');

    // Remove extra whitespace while preserving question numbering
    // Collapse multiple spaces into one
    normalized = normalized.replace(/ {2,}/g, ' ');

    // Collapse multiple newlines into maximum of two (preserve paragraph breaks)
    normalized = normalized.replace(/\n{3,}/g, '\n\n');

    // Remove spaces at start and end of lines
    normalized = normalized.replace(/^[ \t]+|[ \t]+$/gm, '');

    // Trim overall whitespace
    normalized = normalized.trim();

    return normalized;
};

/**
 * Check if text contains question numbering patterns
 * @param text - Text to check
 * @returns True if question patterns are detected
 */
export const hasQuestionNumbering = (text: string): boolean => {
    // Common question patterns: "1.", "Q1:", "Question 1", etc.
    const questionPatterns = [
        /\b\d+\./,           // "1.", "2."
        /\bq\d+:/i,          // "Q1:", "q2:"
        /\bquestion\s+\d+/i, // "Question 1"
    ];

    return questionPatterns.some(pattern => pattern.test(text));
};
