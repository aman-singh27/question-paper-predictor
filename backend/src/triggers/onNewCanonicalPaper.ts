import * as functions from 'firebase-functions';
import { db } from '../config/firebaseAdmin';
import { computeSubjectInsights } from '../services/insightComputer';
import { storeSubjectInsights } from '../services/insightStorage';

/**
 * Firestore Trigger: onNewCanonicalPaper
 * Triggered when a new canonical paper is created
 * Recomputes and stores subject insights
 */
export const onNewCanonicalPaper = functions.firestore
    .document('canonicalPapers/{fingerprint}')
    .onCreate(async (snapshot, context) => {
        try {
            const canonicalData = snapshot.data();
            const paperId = canonicalData.paperId;

            // Fetch the paper document to get subject
            const paperDoc = await db.collection('papers').doc(paperId).get();

            if (!paperDoc.exists) {
                console.error('Paper not found:', paperId);
                return;
            }

            const paperData = paperDoc.data();
            const subject = paperData?.subject;

            if (!subject) {
                console.log('Paper has no subject classification yet');
                return;
            }

            console.log(`Recomputing insights for subject: ${subject}`);

            // Compute insights for this subject
            const insights = await computeSubjectInsights(subject);

            // Store insights atomically
            await storeSubjectInsights(insights);

            console.log(`Insights updated for ${subject}: ${insights.paperCount} papers`);
        } catch (error) {
            console.error('Failed to compute insights:', error);
            // Don't throw - allow trigger to complete
        }
    });
