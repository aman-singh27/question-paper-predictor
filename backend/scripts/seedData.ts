import { SubjectInsightData } from './seedTypes';

/**
 * Centralized seed data definitions with versioning
 * Version: 1.0.0
 */

export const SEED_VERSION = '1.0.0';

export interface SeedDataSet {
    id: string;
    data: SubjectInsightData;
}

/**
 * Subject Insights seed data
 */
export const subjectInsightsSeedData: SeedDataSet[] = [
    {
        id: 'operating-systems',
        data: {
            subject: 'Operating Systems',
            paperCount: 5,
            computedAt: new Date(),

            mostAskedTopic: {
                byCount: 'Memory Management',
                byMarks: 'Memory Management',
            },

            topicWeightage: {
                'Memory Management': 32,
                'Process Scheduling': 24,
                'Deadlocks': 18,
                'File Systems': 14,
                'CPU Scheduling': 12,
            },

            questionTypeDistribution: {
                Subjective: 68,
                Numerical: 27,
                MCQ: 5,
            },

            topicQuestionTypeMap: {
                'Memory Management': 'Subjective',
                'Deadlocks': 'Numerical',
                'CPU Scheduling': 'Numerical',
            },

            yearlyTrends: {
                '2022': ['Memory Management', 'Deadlocks'],
                '2023': ['Process Scheduling'],
                '2024': ['Memory Management'],
            },
        },
    },

    {
        id: 'computer-networks',
        data: {
            subject: 'Computer Networks',
            paperCount: 2,
            computedAt: new Date(),

            mostAskedTopic: {
                byCount: 'Data Link Layer',
                byMarks: 'Data Link Layer',
            },

            topicWeightage: {
                'Data Link Layer': 40,
                'Network Layer': 35,
                'Transport Layer': 25,
            },

            questionTypeDistribution: {
                Subjective: 80,
                Numerical: 20,
                MCQ: 0,
            },

            topicQuestionTypeMap: {
                'Data Link Layer': 'Subjective',
            },

            yearlyTrends: {
                '2023': ['Data Link Layer'],
            },
        },
    },
];

/**
 * Minimal seed data for testing
 */
export const minimalSeedData: SeedDataSet[] = [
    {
        id: 'test-subject',
        data: {
            subject: 'Test Subject',
            paperCount: 1,
            computedAt: new Date(),
            mostAskedTopic: {
                byCount: 'Test Topic',
                byMarks: 'Test Topic',
            },
            topicWeightage: {
                'Test Topic': 100,
            },
            questionTypeDistribution: {
                Subjective: 100,
            },
            topicQuestionTypeMap: {
                'Test Topic': 'Subjective',
            },
            yearlyTrends: {
                '2024': ['Test Topic'],
            },
        },
    },
];
