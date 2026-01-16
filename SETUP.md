# 🚀 Development Setup Guide

## Prerequisites
- Node.js v22.17.0 (installed ✅)
- Firebase CLI (for backend emulators)
- Firebase project: `hack-f1811`

---

## 📋 Quick Start

### 1. Backend Setup

#### Step 1: Configure Environment Variables
The `.env` file has been created at `backend/.env`. You need to add your **Gemini API key**:

```bash
cd backend
# Edit .env and add your GEMINI_API_KEY
```

Your `.env` should look like:
```env
FIREBASE_PROJECT_ID=hack-f1811
GEMINI_API_KEY=your-actual-gemini-api-key-here
GCP_REGION=us-central1
NODE_ENV=development
```

#### Step 2: Install Dependencies (if not already done)
```bash
cd backend
npm install
```

#### Step 3: Build TypeScript
```bash
npm run build
```

#### Step 4: Start Backend Server
Choose one of the following:

**Option A: Firebase Emulators (Recommended for local development)**
```bash
npm run serve
```
This will start Firebase Functions emulator on `http://localhost:5001`

**Option B: Functions Shell**
```bash
npm run start
```

---

### 2. Frontend Setup

#### Step 1: Install Dependencies (if not already done)
```bash
cd frontend
npm install
```

#### Step 2: Start Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (default Vite port)

---

## 🔧 Troubleshooting

### Frontend Not Starting?
If `npm run dev` fails silently, try:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🌱 Seeding Firestore

The backend includes a production-ready seeding script to populate Firestore with initial data.

### Prerequisites
1. Ensure `GOOGLE_APPLICATION_CREDENTIALS` environment variable is set
2. Add `NODE_ENV=development` to your `backend/.env` file

### Seeding Commands

**Normal Seeding** (idempotent - safe to run multiple times):
```bash
cd backend
npm run seed
```

**Dry Run** (preview without writing data):
```bash
npm run seed:dry-run
```

**Force Mode** (skip confirmations, for CI/CD):
```bash
npm run seed:force
```

**Rollback** (remove seeded data):
```bash
npm run seed:rollback
```

### Environment-Specific Behavior
- **Development**: No confirmations, fast execution
- **Staging**: Warning messages, version checking
- **Production**: Requires explicit confirmation (use `--force` in CI/CD)

### What Gets Seeded
- `subjectInsights` collection with sample data for:
  - Operating Systems (5 papers)
  - Computer Networks (2 papers)
- `_seedMetadata` collection for version tracking

📖 **Detailed Documentation**: See [`backend/scripts/SEEDING.md`](./backend/scripts/SEEDING.md) for complete guide.

---

## 🔧 Troubleshooting

### Frontend Not Starting?
If `npm run dev` fails silently, try:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend Issues?
- Ensure Firebase CLI is installed: `npm install -g firebase-tools`
- Login to Firebase: `firebase login`
- Check that your `.env` file has valid credentials

### Seeding Issues?
- Verify `GOOGLE_APPLICATION_CREDENTIALS` is set correctly
- Ensure `NODE_ENV` is in your `.env` file
- Check service account has Firestore write permissions

---

## 📁 Project Structure

```
GDG/
├── backend/          # Firebase Cloud Functions
│   ├── src/         # TypeScript source
│   ├── lib/         # Compiled JavaScript
│   └── .env         # Environment variables (DO NOT COMMIT)
├── frontend/        # React + Vite app
│   └── src/        # React components
└── firebase.json    # Firebase configuration
```

---

## 🔐 Security Notes

- ✅ `.gitignore` is configured to prevent committing sensitive files
- ⚠️ Never commit `*-firebase-adminsdk-*.json` files
- ⚠️ Never commit `.env` files
- ✅ Use environment variables for all secrets

---

## 🎯 Next Steps

1. Add your Gemini API key to `backend/.env`
2. Add `NODE_ENV=development` to `backend/.env`
3. Start the backend: `cd backend && npm run serve`
4. Start the frontend: `cd frontend && npm run dev`
5. Open `http://localhost:5173` in your browser
6. (Optional) Seed Firestore: `cd backend && npm run seed`
