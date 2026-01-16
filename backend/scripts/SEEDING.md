# Firestore Seeding Guide

## Overview

This guide explains how to use the production-ready Firestore seeding system for the exam intelligence platform. The seeding script is idempotent, environment-aware, and includes comprehensive validation and rollback capabilities.

## Architecture

### Components

1. **seedFirestore.ts** - Main seeding script with CLI interface
2. **seedData.ts** - Centralized seed data definitions with versioning
3. **seedValidation.ts** - Data validation utilities
4. **seedTypes.ts** - TypeScript type definitions

### Features

- ✅ **Idempotent** - Safe to run multiple times without duplicating data
- ✅ **Environment-aware** - Different behavior for dev/staging/production
- ✅ **Validation** - Schema checking before writing data
- ✅ **Atomic operations** - Uses Firestore batch writes
- ✅ **Versioning** - Tracks seed data versions
- ✅ **Rollback** - Can remove seeded data
- ✅ **Dry-run mode** - Preview changes without writing
- ✅ **Structured logging** - Timestamps and detailed progress

## Usage

### Prerequisites

1. **Environment Variables** - Ensure your `.env` file contains:
   ```env
   FIREBASE_PROJECT_ID=your-project-id
   GEMINI_API_KEY=your-api-key
   GCP_REGION=us-central1
   NODE_ENV=development
   SEED_VERSION=1.0.0
   ENABLE_SEED_LOGS=true
   ```

2. **Service Account** - Set `GOOGLE_APPLICATION_CREDENTIALS`:
   ```bash
   # Windows PowerShell
   $env:GOOGLE_APPLICATION_CREDENTIALS="path\to\serviceAccount.json"
   
   # Linux/Mac
   export GOOGLE_APPLICATION_CREDENTIALS="path/to/serviceAccount.json"
   ```

3. **Dependencies** - Install required packages:
   ```bash
   cd backend
   npm install
   ```

### Basic Commands

#### Normal Seeding
```bash
npm run seed
```
Seeds data to Firestore. Skips existing documents.

#### Dry Run (Preview)
```bash
npm run seed:dry-run
```
Shows what would be seeded without writing to Firestore.

#### Force Mode (Skip Confirmations)
```bash
npm run seed:force
```
Bypasses production confirmation prompts. Use in CI/CD.

#### Rollback (Remove Seeded Data)
```bash
npm run seed:rollback
```
Deletes all seeded documents and metadata.

### Environment-Specific Behavior

#### Development
```bash
NODE_ENV=development npm run seed
```
- No confirmation prompts
- Verbose logging
- Fast execution

#### Staging
```bash
NODE_ENV=staging npm run seed
```
- Warning messages
- Detailed logging
- Version checking

#### Production
```bash
NODE_ENV=production npm run seed
```
- **Requires explicit confirmation**
- Version downgrade protection
- Comprehensive logging
- Use `--force` flag to bypass prompts in CI/CD

## Data Structure

### Subject Insights Collection

Each document in `subjectInsights` contains:

```typescript
{
  subject: string;              // Subject name
  paperCount: number;           // Number of papers analyzed
  computedAt: Date;             // Computation timestamp
  
  mostAskedTopic: {
    byCount: string;            // Most frequent topic
    byMarks: string;            // Highest marks topic
  };
  
  topicWeightage: {
    [topic: string]: number;    // Percentage weightage
  };
  
  questionTypeDistribution: {
    [type: string]: number;     // Percentage distribution
  };
  
  topicQuestionTypeMap: {
    [topic: string]: string;    // Topic to question type mapping
  };
  
  yearlyTrends: {
    [year: string]: string[];   // Topics per year
  };
}
```

### Seed Metadata Collection

The `_seedMetadata` collection tracks seeding history:

```typescript
{
  version: string;              // Seed data version
  timestamp: Date;              // Seeding timestamp
  environment: string;          // Environment (dev/staging/prod)
  documentsSeeded: number;      // Number of documents created
  collections: string[];        // Collections seeded
  status: string;               // success | failed | partial
}
```

## Version Management

### Current Version
The seed data version is defined in `seedData.ts`:
```typescript
export const SEED_VERSION = '1.0.0';
```

### Version Checking
- The script compares `SEED_VERSION` with the current version in Firestore
- Downgrades require confirmation (unless `--force` is used)
- Upgrades proceed automatically

### Updating Seed Data
1. Modify data in `seedData.ts`
2. Increment `SEED_VERSION` (follow semantic versioning)
3. Run `npm run seed`

## Rollback Procedures

### Full Rollback
Removes all seeded data:
```bash
npm run seed:rollback
```

### Dry-Run Rollback
Preview what would be deleted:
```bash
npm run seed:rollback -- --dry-run
```

### Force Rollback
Skip confirmation prompt:
```bash
npm run seed:rollback -- --force
```

> **⚠️ Warning**: Rollback deletes ALL documents in the `subjectInsights` collection, including user-generated data. Use with caution in production.

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Seed Firestore
  env:
    GOOGLE_APPLICATION_CREDENTIALS: ${{ secrets.GCP_SA_KEY }}
    NODE_ENV: production
  run: |
    cd backend
    npm install
    npm run seed:force
```

### Environment Variables in CI/CD
Set these secrets in your CI/CD platform:
- `GCP_SA_KEY` - Service account JSON content
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `GEMINI_API_KEY` - Gemini API key

## Troubleshooting

### Error: "GOOGLE_APPLICATION_CREDENTIALS is not set"
**Solution**: Set the environment variable pointing to your service account JSON file.

### Error: "FIREBASE_PROJECT_ID is required"
**Solution**: Add `FIREBASE_PROJECT_ID` to your `.env` file.

### Error: "Permission denied"
**Solution**: Ensure your service account has Firestore write permissions.

### Warning: "Attempting to downgrade"
**Solution**: Either:
- Update `SEED_VERSION` to match or exceed current version
- Use `--force` flag if downgrade is intentional

### Documents Not Being Created
**Solution**: Check validation errors in the output. Fix data in `seedData.ts`.

## Security Best Practices

1. **Never commit service account files** - Add to `.gitignore`
2. **Use environment variables** - Store credentials securely
3. **Rotate credentials** - If accidentally exposed
4. **Limit permissions** - Service account should only have Firestore access
5. **Audit logs** - Review Firestore audit logs regularly
6. **Production confirmation** - Always review before seeding production

## Adding New Seed Data

### Step 1: Define Data
Add to `seedData.ts`:
```typescript
export const subjectInsightsSeedData: SeedDataSet[] = [
  // ... existing data
  {
    id: 'new-subject',
    data: {
      subject: 'New Subject',
      paperCount: 3,
      // ... rest of the fields
    },
  },
];
```

### Step 2: Validate
Run dry-run to check for errors:
```bash
npm run seed:dry-run
```

### Step 3: Execute
Seed the data:
```bash
npm run seed
```

## Monitoring

### Log Output
The script provides detailed logging:
- ℹ️ Info messages
- ✅ Success messages
- ⚠️ Warnings
- ❌ Errors
- ⏭️ Skipped operations

### Summary Statistics
After seeding, you'll see:
```
📊 Seeding Summary:
  Created: X
  Skipped: Y
  Failed: Z
```

### Firestore Console
Verify seeded data in Firebase Console:
1. Navigate to Firestore Database
2. Check `subjectInsights` collection
3. Review `_seedMetadata` collection for version info

## Support

For issues or questions:
1. Check this documentation
2. Review error messages and logs
3. Verify environment configuration
4. Check Firestore permissions
