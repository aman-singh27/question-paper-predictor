import { Request, Response, NextFunction } from 'express';
import { admin } from '../config/firebaseAdmin';

/**
 * Auth middleware to verify Firebase ID token
 * Attaches decoded user to request object
 */
export const verifyAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Missing or invalid authorization header',
            });
            return;
        }

        const token = authHeader.split('Bearer ')[1];

        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);

        // Attach user info to request
        (req as any).user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
        };

        next();
    } catch (error) {
        res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or expired token',
        });
    }
};
