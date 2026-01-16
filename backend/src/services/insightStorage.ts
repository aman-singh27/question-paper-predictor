import { db } from '../config/firebaseAdmin';
import { SubjectInsight } from './insightComputer';

/**
 * Insight Storage Service
 * Writes computed insights to Firestore atomically
 */

/**
 * Store subject insights in Firestore
 * Overwrites previous version atomically
 * @param insight - Computed insight object
 */
export const storeSubjectInsights = async (
    insight: SubjectInsight
): Promise<void> => {
    // Normalize subject name for document ID
    const subjectId = insight.subject
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

    const insightRef = db.collection('subjectInsights').doc(subjectId);

    // Atomic write - overwrites previous version
    await insightRef.set({
        subject: insight.subject,
        computedAt: insight.computedAt,
        paperCount: insight.paperCount,
        mostAskedTopic: insight.mostAskedTopic,
        topicWeightage: insight.topicWeightage,
        questionTypeDistribution: insight.questionTypeDistribution,
        topicQuestionTypeMap: insight.topicQuestionTypeMap,
        repeatedQuestionClusters: insight.repeatedQuestionClusters,
        yearlyTrends: insight.yearlyTrends,
    });
};
