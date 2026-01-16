# CORS Error Fix - Quick Guide

## Problem

You were experiencing a CORS (Cross-Origin Resource Sharing) error when your frontend (`localhost:5173`) tried to access your backend API (`localhost:5001`):

```
Access to fetch at 'http://localhost:5001/hack-f1811/us-central1/getSubjects' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

## Root Causes Identified

### 1. ❌ Wrong API Base URL
**Problem**: Frontend was using wrong project ID  
**Location**: `frontend/src/services/api.ts`  
**Was**: `http://localhost:5001/exam-intelligence-platform/us-central1`  
**Fixed to**: `http://localhost:5001/hack-f1811/us-central1`

### 2. ❌ Auth Middleware Blocking CORS Preflight
**Problem**: Authentication middleware was rejecting OPTIONS requests  
**Location**: `backend/src/middleware/auth.ts`  
**Issue**: CORS preflight requests (OPTIONS) were being blocked by auth check  
**Fix**: Added check to skip authentication for OPTIONS requests

## Changes Made

### Backend: `backend/src/middleware/auth.ts`

Added OPTIONS request handling:

```typescript
export const verifyAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Skip auth for OPTIONS requests (CORS preflight)
        if (req.method === 'OPTIONS') {
            next();
            return;
        }

        // ... rest of auth logic
    }
};
```

### Frontend: `frontend/src/services/api.ts`

Fixed API base URL:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:5001/hack-f1811/us-central1';  // ✅ Correct project ID
```

## How to Apply the Fix

### Step 1: Rebuild Backend

```powershell
cd backend
npm run build
```

If build fails with TypeScript errors, you can use the emulator which will compile on the fly:

```powershell
npm run serve
```

### Step 2: Restart Backend Emulator

```powershell
cd backend
npm run serve
```

This will start the Firebase Functions emulator on `http://localhost:5001`

### Step 3: Restart Frontend

```powershell
cd frontend
npm run dev
```

This will start the frontend on `http://localhost:5173`

### Step 4: Test the Fix

1. Open `http://localhost:5173` in your browser
2. Navigate to the Subjects page
3. The subjects should now load without CORS errors

## Understanding CORS

### What is CORS?

CORS (Cross-Origin Resource Sharing) is a security feature that prevents web pages from making requests to a different domain than the one serving the page.

**Your setup**:
- Frontend: `http://localhost:5173` (different port)
- Backend: `http://localhost:5001` (different port)

These are considered different "origins" even though they're both localhost.

### How CORS Works

1. **Preflight Request**: Browser sends an OPTIONS request first
2. **Server Response**: Server must respond with CORS headers
3. **Actual Request**: If preflight succeeds, browser sends the actual request

### Why the Fix Works

**Before**:
1. Browser sends OPTIONS request
2. Auth middleware rejects it (401 Unauthorized)
3. CORS headers never get set
4. Browser blocks the request

**After**:
1. Browser sends OPTIONS request
2. Auth middleware skips it (passes to next middleware)
3. CORS middleware sets proper headers
4. Browser allows the actual request
5. Actual request gets authenticated properly

## Alternative: Disable Auth for Development

If you want to test without authentication during development, you can temporarily remove the `verifyAuth` middleware:

### `backend/src/api/getSubjects.ts`

```typescript
// Before (with auth)
app.get('/', verifyAuth, async (req: Request, res: Response) => {

// After (without auth - DEVELOPMENT ONLY)
app.get('/', async (req: Request, res: Response) => {
```

⚠️ **Warning**: Only do this for local development. Never deploy without authentication!

## Verify the Fix

### Check Backend Logs

When you make a request, you should see in the backend console:

```
✔  functions[us-central1-getSubjects]: http function initialized
```

### Check Browser Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Reload the page
4. Look for the `getSubjects` request
5. Check the response headers - should include:
   ```
   Access-Control-Allow-Origin: http://localhost:5173
   Access-Control-Allow-Methods: GET, POST, OPTIONS
   ```

### Check for Errors

If you still see CORS errors:

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Hard reload** (Ctrl+Shift+R)
3. **Check both servers are running**:
   - Backend: `http://localhost:5001`
   - Frontend: `http://localhost:5173`
4. **Verify project ID** in Firebase Console matches `hack-f1811`

## Common CORS Issues

### Issue: "No 'Access-Control-Allow-Origin' header"
**Solution**: Make sure backend has `cors({ origin: true })` configured

### Issue: "Response to preflight request doesn't pass"
**Solution**: Auth middleware must allow OPTIONS requests (already fixed)

### Issue: "Network error" or "Failed to fetch"
**Solution**: Check backend is actually running on port 5001

### Issue: Still getting 401 Unauthorized
**Solution**: Check that user is logged in and token is being sent

## Production Deployment

For production, you'll need to:

1. **Set allowed origins** in CORS config:
   ```typescript
   app.use(cors({ 
       origin: ['https://your-domain.com', 'https://your-domain.web.app']
   }));
   ```

2. **Set environment variable** for frontend:
   ```env
   VITE_API_BASE_URL=https://us-central1-hack-f1811.cloudfunctions.net
   ```

3. **Deploy backend**:
   ```bash
   firebase deploy --only functions
   ```

4. **Deploy frontend**:
   ```bash
   firebase deploy --only hosting
   ```

## Summary

✅ **Fixed API URL**: Changed from `exam-intelligence-platform` to `hack-f1811`  
✅ **Fixed CORS**: Auth middleware now allows OPTIONS requests  
✅ **CORS configured**: Backend already had `cors({ origin: true })`  

The CORS error should now be resolved. Restart both servers and test!
