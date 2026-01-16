import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from './env';

// Initialize Gemini client with API key from Google AI Studio
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Export reusable Gemini client
export const geminiClient = genAI;

// Export a model instance for classification
export const getClassificationModel = () => {
    return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
};
