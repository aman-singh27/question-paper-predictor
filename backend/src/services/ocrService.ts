import vision from '@google-cloud/vision';

/**
 * OCR Service using Google Cloud Vision API
 * Extracts text from image/PDF buffers
 */

// Initialize Vision API client
const client = new vision.ImageAnnotatorClient();

/**
 * Extract text from file buffer using Google Cloud Vision
 * @param fileBuffer - File buffer (PDF or image)
 * @returns Extracted text
 */
export const extractTextFromBuffer = async (
    fileBuffer: Buffer
): Promise<string> => {
    try {
        // Call Vision API with buffer
        const [result] = await client.documentTextDetection({
            image: { content: fileBuffer },
        });

        const fullTextAnnotation = result.fullTextAnnotation;

        if (!fullTextAnnotation || !fullTextAnnotation.text) {
            throw new Error('No text detected in the document');
        }

        return fullTextAnnotation.text;
    } catch (error) {
        throw new Error(
            `OCR extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};
