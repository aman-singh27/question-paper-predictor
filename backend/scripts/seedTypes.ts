/**
 * TypeScript type definitions for Firestore seeding
 */

export interface SeedMetadata {
    version: string;
    timestamp: Date;
    environment: string;
    documentsSeeded: number;
    collections: string[];
    status: 'success' | 'failed' | 'partial';
}

export interface SeedOptions {
    dryRun: boolean;
    force: boolean;
    rollback: boolean;
    environment: string;
    verbose: boolean;
}

export interface ValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
}

export interface SubjectInsightData {
    subject: string;
    paperCount: number;
    computedAt: Date;
    mostAskedTopic: {
        byCount: string;
        byMarks: string;
    };
    topicWeightage: Record<string, number>;
    questionTypeDistribution: Record<string, number>;
    topicQuestionTypeMap: Record<string, string>;
    yearlyTrends: Record<string, string[]>;
}

export interface SeedDocument {
    id: string;
    collection: string;
    data: any;
}

export interface SeedResult {
    success: boolean;
    documentsCreated: number;
    documentsSkipped: number;
    documentsFailed: number;
    errors: string[];
}
