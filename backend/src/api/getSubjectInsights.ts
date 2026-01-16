import * as functions from 'firebase-functions';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { verifyAuth } from '../middleware/auth';
import { db } from '../config/firebaseAdmin';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

/**
 * GET /subjectInsights?subjectId=...
 * Fetch precomputed subject insights
 * Read-only - returns stored data verbatim
 */
app.get('/', verifyAuth, async (req: Request, res: Response) => {
    try {
        const { subjectId } = req.query;

        // Validate required parameter
        if (!subjectId || typeof subjectId !== 'string') {
            res.status(400).json({
                error: 'Bad Request',
                message: 'Missing or invalid query parameter: subjectId',
            });
            return;
        }

        // Fetch insight document
        const insightDoc = await db
            .collection('subjectInsights')
            .doc(subjectId)
            .get();

        if (!insightDoc.exists) {
            res.status(404).json({
                error: 'Not Found',
                message: 'Subject insights not available',
            });
            return;
        }

        // Return stored insights verbatim - no transformation
        const insights = insightDoc.data();

        res.status(200).json(insights);
    } catch (error) {
        console.error('Failed to fetch subject insights:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to fetch subject insights',
        });
    }
});

export const getSubjectInsights = functions.https.onRequest(app);
