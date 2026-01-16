import * as functions from 'firebase-functions';
import express, { Request, Response } from 'express';
import { verifyAuth } from '../middleware/auth';

const app = express();
app.use(express.json());

/**
 * POST /uploadPaper
 * Accepts file metadata for exam paper upload
 * Auth required
 * Returns placeholder response
 */
app.post('/', verifyAuth, async (req: Request, res: Response) => {
    try {
        const { fileName, fileSize, mimeType, subject } = req.body;

        // Validate required fields
        if (!fileName || !fileSize || !mimeType) {
            res.status(400).json({
                error: 'Bad Request',
                message: 'Missing required fields: fileName, fileSize, mimeType',
            });
            return;
        }

        // Placeholder response
        const response = {
            success: true,
            message: 'Paper upload metadata received',
            data: {
                paperId: `paper_${Date.now()}`,
                fileName,
                fileSize,
                mimeType,
                subject: subject || 'unknown',
                uploadedAt: new Date().toISOString(),
                status: 'pending',
            },
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to process upload request',
        });
    }
});

export const uploadPaper = functions.https.onRequest(app);
