import { db } from '../config/firebaseAdmin';
import { getClassificationModel } from '../config/gemini';

/**
 * Insight Computer Service
 * Computes subject-level insights from all canonical papers
 */

export interface SubjectInsight {
    subject: string;
    computedAt: Date;
    paperCount: number;
    mostAskedTopic: {
        byCount: string;
        byMarks: string;
    };
    topicWeightage: Record<string, number>;
    questionTypeDistribution: Record<string, number>;
    topicQuestionTypeMap: Record<string, string>;
    repeatedQuestionClusters: Array<{
        clusterLabel: string;
        questions: string[];
    }>;
    yearlyTrends: Record<string, string[]>;
}

interface QuestionData {
    topic: string;
    questionType: string;
    marks: number | null;
    questionText: string;
    year?: string;
}

/**
 * Compute insights for a specific subject
 * @param subjectName - Subject to compute insights for
 * @returns Computed insight object
 */
export const computeSubjectInsights = async (
    subjectName: string
): Promise<SubjectInsight> => {
    // Fetch all canonical papers for this subject
    const papersSnapshot = await db
        .collection('papers')
        .where('subject', '==', subjectName)
        .where('duplicateDetected', '==', false)
        .get();

    const papers = papersSnapshot.docs;
    const paperCount = papers.length;

    // Aggregate all questions
    const allQuestions: QuestionData[] = [];

    for (const paperDoc of papers) {
        const questionsSnapshot = await paperDoc.ref.collection('questions').get();
        const year = paperDoc.data().createdAt?.toDate().getFullYear().toString();

        questionsSnapshot.docs.forEach((qDoc) => {
            const qData = qDoc.data();
            if (qData.topic) {
                allQuestions.push({
                    topic: qData.topic,
                    questionType: qData.questionType,
                    marks: qData.marks,
                    questionText: qData.questionText,
                    year,
                });
            }
        });
    }

    // 1. Topic Frequency
    const topicCount: Record<string, number> = {};
    const topicMarks: Record<string, number> = {};

    allQuestions.forEach((q) => {
        topicCount[q.topic] = (topicCount[q.topic] || 0) + 1;
        topicMarks[q.topic] = (topicMarks[q.topic] || 0) + (q.marks || 0);
    });

    // 2. Most Asked Topic
    const mostAskedByCount = Object.keys(topicCount).reduce((a, b) =>
        topicCount[a] > topicCount[b] ? a : b
        , Object.keys(topicCount)[0] || 'N/A');

    const mostAskedByMarks = Object.keys(topicMarks).reduce((a, b) =>
        topicMarks[a] > topicMarks[b] ? a : b
        , Object.keys(topicMarks)[0] || 'N/A');

    // 3. Topic Weightage (%)
    const totalMarks = Object.values(topicMarks).reduce((sum, m) => sum + m, 0);
    const topicWeightage: Record<string, number> = {};

    Object.keys(topicMarks).forEach((topic) => {
        topicWeightage[topic] = totalMarks > 0
            ? Math.round((topicMarks[topic] / totalMarks) * 100)
            : 0;
    });

    // 4. Question Type Distribution
    const typeCount: Record<string, number> = {};
    allQuestions.forEach((q) => {
        typeCount[q.questionType] = (typeCount[q.questionType] || 0) + 1;
    });

    const totalQuestions = allQuestions.length;
    const questionTypeDistribution: Record<string, number> = {};

    Object.keys(typeCount).forEach((type) => {
        questionTypeDistribution[type] = totalQuestions > 0
            ? Math.round((typeCount[type] / totalQuestions) * 100)
            : 0;
    });

    // 5. Most Common Type per Topic
    const topicTypeCount: Record<string, Record<string, number>> = {};

    allQuestions.forEach((q) => {
        if (!topicTypeCount[q.topic]) {
            topicTypeCount[q.topic] = {};
        }
        topicTypeCount[q.topic][q.questionType] =
            (topicTypeCount[q.topic][q.questionType] || 0) + 1;
    });

    const topicQuestionTypeMap: Record<string, string> = {};

    Object.keys(topicTypeCount).forEach((topic) => {
        const types = topicTypeCount[topic];
        const mostCommonType = Object.keys(types).reduce((a, b) =>
            types[a] > types[b] ? a : b
        );
        topicQuestionTypeMap[topic] = mostCommonType;
    });

    // 6. Repeated Question Clusters (Optional Gemini)
    let repeatedQuestionClusters: Array<{
        clusterLabel: string;
        questions: string[];
    }> = [];

    if (allQuestions.length > 20) {
        try {
            repeatedQuestionClusters = await clusterSimilarQuestions(
                allQuestions.map((q) => q.questionText)
            );
        } catch (error) {
            console.error('Question clustering failed:', error);
            // Continue without clusters
        }
    }

    // 7. Year-wise Topic Trend
    const yearlyTrends: Record<string, string[]> = {};

    allQuestions.forEach((q) => {
        if (q.year) {
            if (!yearlyTrends[q.year]) {
                yearlyTrends[q.year] = [];
            }
            if (!yearlyTrends[q.year].includes(q.topic)) {
                yearlyTrends[q.year].push(q.topic);
            }
        }
    });

    return {
        subject: subjectName,
        computedAt: new Date(),
        paperCount,
        mostAskedTopic: {
            byCount: mostAskedByCount,
            byMarks: mostAskedByMarks,
        },
        topicWeightage,
        questionTypeDistribution,
        topicQuestionTypeMap,
        repeatedQuestionClusters,
        yearlyTrends,
    };
};

/**
 * Cluster similar questions using Gemini (optional)
 * @param questions - Array of question texts
 * @returns Array of question clusters
 */
const clusterSimilarQuestions = async (
    questions: string[]
): Promise<Array<{ clusterLabel: string; questions: string[] }>> => {
    const model = getClassificationModel();

    const prompt = `Given a list of exam questions from the same subject,
group semantically similar questions.

Rules:
- Group only if meaning is essentially the same
- Output STRICT JSON
- No explanations

Output format:
[
  {
    "clusterLabel": "...",
    "questions": ["...", "..."]
  }
]

QUESTIONS:
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

    const clusters = JSON.parse(cleanedText);

    // Return only top 5 clusters
    return Array.isArray(clusters) ? clusters.slice(0, 5) : [];
};
