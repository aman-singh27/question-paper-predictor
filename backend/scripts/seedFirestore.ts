import { db } from '../src/config/firebaseAdmin';
import { subjectInsightsSeedData, minimalSeedData, SEED_VERSION } from './seedData';
import { validateSubjectInsight, validateSeedMetadata } from './seedValidation';
import { SeedOptions, SeedResult, SeedMetadata, SeedDocument } from './seedTypes';
import * as readline from 'readline';

/**
 * Production-Ready Firestore Seed Script
 * 
 * This script seeds the subjectInsights collection with initial data.
 * It is idempotent - safe to run multiple times without duplicating data.
 * 
 * Usage:
 *   npm run seed                    # Normal seeding
 *   npm run seed:dry-run            # Preview without writing
 *   npm run seed:force              # Skip confirmations
 *   npm run seed:rollback           # Remove seeded data
 * 
 * Requirements:
 *   - GOOGLE_APPLICATION_CREDENTIALS environment variable must be set
 *   - NODE_ENV environment variable should be set (development/staging/production)
 *   - Service account JSON file must exist at the specified path
 */

const METADATA_COLLECTION = '_seedMetadata';
const SUBJECT_INSIGHTS_COLLECTION = 'subjectInsights';

/**
 * Parse command line arguments
 */
function parseArguments(): SeedOptions {
    const args = process.argv.slice(2);

    return {
        dryRun: args.includes('--dry-run'),
        force: args.includes('--force'),
        rollback: args.includes('--rollback'),
        environment: process.env.NODE_ENV || 'development',
        verbose: args.includes('--verbose') || args.includes('-v'),
    };
}

/**
 * Structured logger with timestamps
 */
class Logger {
    private verbose: boolean;

    constructor(verbose: boolean = false) {
        this.verbose = verbose;
    }

    private timestamp(): string {
        return new Date().toISOString();
    }

    info(message: string) {
        console.log(`[${this.timestamp()}] ℹ️  ${message}`);
    }

    success(message: string) {
        console.log(`[${this.timestamp()}] ✅ ${message}`);
    }

    warning(message: string) {
        console.log(`[${this.timestamp()}] ⚠️  ${message}`);
    }

    error(message: string) {
        console.error(`[${this.timestamp()}] ❌ ${message}`);
    }

    skip(message: string) {
        console.log(`[${this.timestamp()}] ⏭️  ${message}`);
    }

    debug(message: string) {
        if (this.verbose) {
            console.log(`[${this.timestamp()}] 🔍 ${message}`);
        }
    }

    separator() {
        console.log('━'.repeat(60));
    }
}

/**
 * Prompt user for confirmation
 */
async function promptConfirmation(message: string): Promise<boolean> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(`${message} (yes/no): `, (answer) => {
            rl.close();
            resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y');
        });
    });
}

/**
 * Check if running in production environment
 */
function isProduction(environment: string): boolean {
    return environment === 'production' || environment === 'prod';
}

/**
 * Get current seed version from metadata
 */
async function getCurrentSeedVersion(logger: Logger): Promise<string | null> {
    try {
        const snapshot = await db.collection(METADATA_COLLECTION).doc('current').get();

        if (!snapshot.exists) {
            return null;
        }

        const data = snapshot.data();
        return data?.version || null;
    } catch (error) {
        logger.debug(`No existing seed metadata found: ${error}`);
        return null;
    }
}

/**
 * Compare semantic versions
 */
function compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const part1 = parts1[i] || 0;
        const part2 = parts2[i] || 0;

        if (part1 > part2) return 1;
        if (part1 < part2) return -1;
    }

    return 0;
}

/**
 * Validate all seed data before processing
 */
function validateAllSeedData(seedData: SeedDocument[], logger: Logger): boolean {
    logger.info('Validating seed data...');
    let hasErrors = false;

    for (const doc of seedData) {
        const result = validateSubjectInsight(doc.data);

        if (!result.valid) {
            logger.error(`Validation failed for document "${doc.id}":`);
            result.errors.forEach(err => logger.error(`  - ${err}`));
            hasErrors = true;
        }

        if (result.warnings.length > 0) {
            result.warnings.forEach(warn => logger.warning(`  - ${warn}`));
        }
    }

    if (!hasErrors) {
        logger.success(`Validated ${seedData.length} documents successfully`);
    }

    return !hasErrors;
}

/**
 * Idempotent seed function for subject insights
 */
async function seedSubjectInsights(
    seedData: SeedDocument[],
    options: SeedOptions,
    logger: Logger
): Promise<SeedResult> {
    const result: SeedResult = {
        success: true,
        documentsCreated: 0,
        documentsSkipped: 0,
        documentsFailed: 0,
        errors: [],
    };

    logger.info(`Processing ${seedData.length} documents...`);
    logger.separator();

    // Use Firestore batch for atomic operations
    const batch = db.batch();
    const documentsToCreate: string[] = [];

    for (const doc of seedData) {
        try {
            const ref = db.collection(SUBJECT_INSIGHTS_COLLECTION).doc(doc.id);
            const snapshot = await ref.get();

            if (snapshot.exists) {
                logger.skip(`Skipping "${doc.id}" (already exists)`);
                result.documentsSkipped++;
                continue;
            }

            if (options.dryRun) {
                logger.info(`[DRY RUN] Would create document: ${doc.id}`);
                result.documentsCreated++;
            } else {
                batch.set(ref, doc.data);
                documentsToCreate.push(doc.id);
                result.documentsCreated++;
            }
        } catch (error) {
            const errorMsg = `Failed to process document "${doc.id}": ${error}`;
            logger.error(errorMsg);
            result.errors.push(errorMsg);
            result.documentsFailed++;
            result.success = false;
        }
    }

    // Commit batch if not dry run
    if (!options.dryRun && documentsToCreate.length > 0) {
        try {
            await batch.commit();
            documentsToCreate.forEach(id => logger.success(`Created document: ${id}`));
        } catch (error) {
            const errorMsg = `Batch commit failed: ${error}`;
            logger.error(errorMsg);
            result.errors.push(errorMsg);
            result.success = false;
        }
    }

    return result;
}

/**
 * Save seed metadata
 */
async function saveSeedMetadata(
    result: SeedResult,
    options: SeedOptions,
    logger: Logger
): Promise<void> {
    if (options.dryRun) {
        logger.info('[DRY RUN] Would save seed metadata');
        return;
    }

    const metadata: SeedMetadata = {
        version: SEED_VERSION,
        timestamp: new Date(),
        environment: options.environment,
        documentsSeeded: result.documentsCreated,
        collections: [SUBJECT_INSIGHTS_COLLECTION],
        status: result.success ? 'success' : (result.documentsFailed > 0 ? 'partial' : 'failed'),
    };

    // Validate metadata before saving
    const validationResult = validateSeedMetadata(metadata);
    if (!validationResult.valid) {
        logger.error('Metadata validation failed:');
        validationResult.errors.forEach(err => logger.error(`  - ${err}`));
        return;
    }

    try {
        await db.collection(METADATA_COLLECTION).doc('current').set(metadata);
        logger.success('Saved seed metadata');
    } catch (error) {
        logger.error(`Failed to save metadata: ${error}`);
    }
}

/**
 * Rollback seeded data
 */
async function rollbackSeedData(options: SeedOptions, logger: Logger): Promise<void> {
    logger.warning('ROLLBACK MODE: This will delete seeded data');
    logger.separator();

    if (!options.force) {
        const confirmed = await promptConfirmation('Are you sure you want to rollback seeded data?');
        if (!confirmed) {
            logger.info('Rollback cancelled');
            return;
        }
    }

    try {
        // Get all documents in subjectInsights collection
        const snapshot = await db.collection(SUBJECT_INSIGHTS_COLLECTION).get();

        if (snapshot.empty) {
            logger.info('No documents to rollback');
            return;
        }

        logger.info(`Found ${snapshot.size} documents to delete`);

        if (options.dryRun) {
            snapshot.docs.forEach(doc => {
                logger.info(`[DRY RUN] Would delete: ${doc.id}`);
            });
            return;
        }

        // Delete in batches
        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        logger.success(`Deleted ${snapshot.size} documents`);

        // Delete metadata
        await db.collection(METADATA_COLLECTION).doc('current').delete();
        logger.success('Deleted seed metadata');

    } catch (error) {
        logger.error(`Rollback failed: ${error}`);
        throw error;
    }
}

/**
 * Main seed execution function
 */
async function runSeed() {
    const options = parseArguments();
    const logger = new Logger(options.verbose);

    try {
        logger.separator();
        logger.info('🌱 Starting Firestore seeding...');
        logger.info(`Environment: ${options.environment}`);
        logger.info(`Version: ${SEED_VERSION}`);
        if (options.dryRun) logger.warning('DRY RUN MODE - No data will be written');
        logger.separator();

        // Handle rollback mode
        if (options.rollback) {
            await rollbackSeedData(options, logger);
            logger.separator();
            logger.success('✨ Rollback completed');
            logger.separator();
            process.exit(0);
        }

        // Check for production environment
        if (isProduction(options.environment) && !options.force) {
            logger.warning('⚠️  PRODUCTION ENVIRONMENT DETECTED');
            const confirmed = await promptConfirmation('Are you sure you want to seed production?');

            if (!confirmed) {
                logger.info('Seeding cancelled');
                process.exit(0);
            }
        }

        // Check version
        const currentVersion = await getCurrentSeedVersion(logger);
        if (currentVersion) {
            logger.info(`Current seed version: ${currentVersion}`);

            const versionComparison = compareVersions(SEED_VERSION, currentVersion);
            if (versionComparison < 0 && !options.force) {
                logger.warning(`Attempting to downgrade from ${currentVersion} to ${SEED_VERSION}`);
                const confirmed = await promptConfirmation('Continue with downgrade?');

                if (!confirmed) {
                    logger.info('Seeding cancelled');
                    process.exit(0);
                }
            }
        }

        // Prepare seed data
        const seedData: SeedDocument[] = subjectInsightsSeedData.map(item => ({
            id: item.id,
            collection: SUBJECT_INSIGHTS_COLLECTION,
            data: item.data,
        }));

        // Validate seed data
        if (!validateAllSeedData(seedData, logger)) {
            logger.error('Seed data validation failed');
            process.exit(1);
        }

        logger.separator();

        // Execute seeding
        const result = await seedSubjectInsights(seedData, options, logger);

        // Save metadata
        await saveSeedMetadata(result, options, logger);

        // Print summary
        logger.separator();
        logger.info('📊 Seeding Summary:');
        logger.info(`  Created: ${result.documentsCreated}`);
        logger.info(`  Skipped: ${result.documentsSkipped}`);
        logger.info(`  Failed: ${result.documentsFailed}`);
        logger.separator();

        if (result.success) {
            logger.success('✨ Firestore seeding completed successfully');
        } else {
            logger.error('⚠️  Seeding completed with errors');
            result.errors.forEach(err => logger.error(`  - ${err}`));
        }

        logger.separator();
        process.exit(result.success ? 0 : 1);

    } catch (error) {
        logger.separator();
        logger.error('❌ Firestore seeding failed:');
        logger.error(String(error));
        logger.separator();
        logger.info('💡 Troubleshooting:');
        logger.info('  - Ensure GOOGLE_APPLICATION_CREDENTIALS is set correctly');
        logger.info('  - Verify NODE_ENV is set (development/staging/production)');
        logger.info('  - Check that service account has Firestore permissions');
        logger.separator();
        process.exit(1);
    }
}

runSeed();
