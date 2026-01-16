// Export all API Cloud Functions
export { uploadPaper } from './api/uploadPaper';
export { analyzePaper } from './api/analyzePaper';
export { subjectInsights } from './api/subjectInsights';
export { getSubjects } from './api/getSubjects';
export { getSubjectInsights } from './api/getSubjectInsights';

// Export Firestore Triggers
export { onNewCanonicalPaper } from './triggers/onNewCanonicalPaper';

// Health check endpoint
import * as functions from 'firebase-functions';

export const healthCheck = functions.https.onRequest((request, response) => {
    response.json({
        status: 'ok',
        message: 'Backend is running',
        timestamp: new Date().toISOString(),
    });
});
