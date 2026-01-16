import { ValidationResult, SubjectInsightData } from './seedTypes';

/**
 * Data validation utilities for seed data
 */

/**
 * Validates SubjectInsight data structure
 */
export function validateSubjectInsight(data: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields validation
    if (!data.subject || typeof data.subject !== 'string') {
        errors.push('Missing or invalid "subject" field (must be string)');
    }

    if (typeof data.paperCount !== 'number' || data.paperCount < 0) {
        errors.push('Missing or invalid "paperCount" field (must be non-negative number)');
    }

    if (!(data.computedAt instanceof Date)) {
        errors.push('Missing or invalid "computedAt" field (must be Date)');
    }

    // mostAskedTopic validation
    if (!data.mostAskedTopic || typeof data.mostAskedTopic !== 'object') {
        errors.push('Missing or invalid "mostAskedTopic" field');
    } else {
        if (!data.mostAskedTopic.byCount || typeof data.mostAskedTopic.byCount !== 'string') {
            errors.push('Missing or invalid "mostAskedTopic.byCount" field');
        }
        if (!data.mostAskedTopic.byMarks || typeof data.mostAskedTopic.byMarks !== 'string') {
            errors.push('Missing or invalid "mostAskedTopic.byMarks" field');
        }
    }

    // topicWeightage validation
    if (!data.topicWeightage || typeof data.topicWeightage !== 'object') {
        errors.push('Missing or invalid "topicWeightage" field');
    } else {
        const weightageValues = Object.values(data.topicWeightage);
        const totalWeightage = weightageValues.reduce((sum: number, val: any) => {
            if (typeof val !== 'number') {
                errors.push(`Invalid weightage value: ${val} (must be number)`);
                return sum;
            }
            return sum + val;
        }, 0);

        if (Math.abs(totalWeightage - 100) > 1) {
            warnings.push(`Topic weightage sum is ${totalWeightage}% (expected ~100%)`);
        }
    }

    // questionTypeDistribution validation
    if (!data.questionTypeDistribution || typeof data.questionTypeDistribution !== 'object') {
        errors.push('Missing or invalid "questionTypeDistribution" field');
    } else {
        const distributionValues = Object.values(data.questionTypeDistribution);
        const totalDistribution = distributionValues.reduce((sum: number, val: any) => {
            if (typeof val !== 'number') {
                errors.push(`Invalid distribution value: ${val} (must be number)`);
                return sum;
            }
            return sum + val;
        }, 0);

        if (Math.abs(totalDistribution - 100) > 1) {
            warnings.push(`Question type distribution sum is ${totalDistribution}% (expected ~100%)`);
        }
    }

    // topicQuestionTypeMap validation
    if (!data.topicQuestionTypeMap || typeof data.topicQuestionTypeMap !== 'object') {
        errors.push('Missing or invalid "topicQuestionTypeMap" field');
    }

    // yearlyTrends validation
    if (!data.yearlyTrends || typeof data.yearlyTrends !== 'object') {
        errors.push('Missing or invalid "yearlyTrends" field');
    } else {
        for (const [year, topics] of Object.entries(data.yearlyTrends)) {
            if (!Array.isArray(topics)) {
                errors.push(`Invalid yearlyTrends for year ${year} (must be array)`);
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
    };
}

/**
 * Validates seed metadata
 */
export function validateSeedMetadata(metadata: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!metadata.version || typeof metadata.version !== 'string') {
        errors.push('Missing or invalid "version" field');
    }

    if (!(metadata.timestamp instanceof Date)) {
        errors.push('Missing or invalid "timestamp" field');
    }

    if (!metadata.environment || typeof metadata.environment !== 'string') {
        errors.push('Missing or invalid "environment" field');
    }

    if (typeof metadata.documentsSeeded !== 'number') {
        errors.push('Missing or invalid "documentsSeeded" field');
    }

    if (!Array.isArray(metadata.collections)) {
        errors.push('Missing or invalid "collections" field');
    }

    const validStatuses = ['success', 'failed', 'partial'];
    if (!validStatuses.includes(metadata.status)) {
        errors.push(`Invalid status: ${metadata.status} (must be one of: ${validStatuses.join(', ')})`);
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
    };
}
