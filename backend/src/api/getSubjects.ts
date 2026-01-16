import * as functions from 'firebase-functions';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { verifyAuth } from '../middleware/auth';
import { db } from '../config/firebaseAdmin';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Handle OPTIONS requests for CORS preflight
app.options('*', cors({ origin: true }));

/**
 * GET /subjects
 * List all subjects with readiness metadata
 * Read-only - no writes, no computation
 */
app.get('/', verifyAuth, async (req: Request, res: Response) => {
    try {
        // Query all subject insights
        const insightsSnapshot = await db.collection('subjectInsights').get();

        const subjects = insightsSnapshot.docs.map((doc) => {
            const data = doc.data();
            const paperCount = data.paperCount || 0;

            // Compute readiness status
            const status = paperCount >= 5 ? 'ready' : 'bootstrapping';

            return {
                subjectId: doc.id,
                subject: data.subject,
                paperCount,
                status,
            };
        });

        res.status(200).json(subjects);
    } catch (error) {
        console.error('Failed to fetch subjects:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to fetch subjects',
        });
    }
});

export const getSubjects = functions.https.onRequest(app);
