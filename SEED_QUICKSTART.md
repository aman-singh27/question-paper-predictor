# Quick Start Guide - Firestore Seeding

## ✅ Setup Complete!

Your Firestore seeding is now configured and ready to use.

## Configuration Summary

**Service Account**: `hack-f1811-firebase-adminsdk-fbsvc-a3b6bb2d01.json`  
**Environment**: Development  
**Project ID**: hack-f1811

## Running Seed Scripts

### Option 1: Using npm scripts (Recommended)

Before running, set the environment variable in your PowerShell session:

```powershell
cd backend
$env:GOOGLE_APPLICATION_CREDENTIALS="$PWD\hack-f1811-firebase-adminsdk-fbsvc-a3b6bb2d01.json"
```

Then run:

```bash
# Preview what will be seeded (dry-run)
npm run seed:dry-run

# Actually seed the database
npm run seed

# Remove seeded data (rollback)
npm run seed:rollback

# Force mode (skip confirmations)
npm run seed:force
```

### Option 2: Direct execution

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS="$PWD\hack-f1811-firebase-adminsdk-fbsvc-a3b6bb2d01.json"
npx ts-node --project scripts/tsconfig.json --transpile-only scripts/seedFirestore.ts
```

## What Gets Seeded

The script populates two collections in Firestore:

### 1. `subjectInsights` Collection

**Operating Systems** (`operating-systems`):
- 5 papers analyzed
- Topics: Memory Management, Process Scheduling, Deadlocks, File Systems, CPU Scheduling
- Question types: Subjective (68%), Numerical (27%), MCQ (5%)

**Computer Networks** (`computer-networks`):
- 2 papers analyzed  
- Topics: Data Link Layer, Network Layer, Transport Layer
- Question types: Subjective (80%), Numerical (20%)

### 2. `_seedMetadata` Collection

Tracks seeding history:
- Version: 1.0.0
- Timestamp
- Environment
- Documents seeded count

## Verify in Firebase Console

1. Go to: https://console.firebase.google.com/project/hack-f1811/firestore
2. Check for `subjectInsights` collection (should have 2 documents)
3. Check for `_seedMetadata` collection (should have 1 document: `current`)

## Features

✅ **Idempotent** - Safe to run multiple times (skips existing documents)  
✅ **Validated** - Checks data structure before writing  
✅ **Versioned** - Tracks seed data versions  
✅ **Atomic** - Uses batch writes (all-or-nothing)  
✅ **Logged** - Detailed output with timestamps  

## Troubleshooting

### Error: "GOOGLE_APPLICATION_CREDENTIALS is not set"
```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS="$PWD\hack-f1811-firebase-adminsdk-fbsvc-a3b6bb2d01.json"
```

### Error: "FIREBASE_PROJECT_ID is required"
Check that `backend/.env` contains:
```env
FIREBASE_PROJECT_ID=hack-f1811
NODE_ENV=development
```

### Script runs but no data appears
- Check Firebase Console for the collections
- Verify you're looking at the correct project (hack-f1811)
- Check the script output for "Skipped" messages (data might already exist)

## Next Steps

1. ✅ Verify data in Firebase Console
2. Start the backend: `npm run serve`
3. Start the frontend: `cd ../frontend && npm run dev`
4. Test the application at `http://localhost:5173`

## Documentation

- **Detailed Guide**: [`backend/scripts/SEEDING.md`](./backend/scripts/SEEDING.md)
- **Service Account Setup**: [`GET_SERVICE_ACCOUNT.md`](./GET_SERVICE_ACCOUNT.md)
- **General Setup**: [`SETUP.md`](./SETUP.md)
