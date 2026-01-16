import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Validate and export environment variables
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || '';
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
export const GCP_REGION = process.env.GCP_REGION || 'us-central1';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const SEED_VERSION = process.env.SEED_VERSION || '1.0.0';
export const ENABLE_SEED_LOGS = process.env.ENABLE_SEED_LOGS !== 'false';

// Validation
if (!FIREBASE_PROJECT_ID) {
    throw new Error('FIREBASE_PROJECT_ID is required in environment variables');
}

if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is required in environment variables');
}
