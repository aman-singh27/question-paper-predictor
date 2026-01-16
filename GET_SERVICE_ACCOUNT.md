# How to Get Google Application Credentials (Service Account)

## Overview

Google Application Credentials are needed for the backend to authenticate with Firebase services (Firestore, Cloud Functions, etc.) during local development and for running seed scripts.

## Step-by-Step Guide

### Step 1: Open Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **hack-f1811**

### Step 2: Navigate to Project Settings

1. Click the **gear icon** ⚙️ next to "Project Overview" in the left sidebar
2. Select **Project settings**

### Step 3: Go to Service Accounts Tab

1. In the Project Settings page, click on the **Service accounts** tab at the top
2. You should see a section titled "Firebase Admin SDK"

### Step 4: Generate New Private Key

1. Scroll down to the **Firebase Admin SDK** section
2. Select **Node.js** as your language (should be selected by default)
3. Click the **Generate new private key** button
4. A dialog will appear warning you to keep this key secure
5. Click **Generate key**

### Step 5: Download the JSON File

- A JSON file will be downloaded automatically
- The filename will be something like: `hack-f1811-firebase-adminsdk-xxxxx-xxxxxxxxxx.json`
- **⚠️ IMPORTANT**: This file contains sensitive credentials - never commit it to git!

### Step 6: Move the File to Your Project

1. Move the downloaded JSON file to your project's `backend` directory:
   ```
   GDG/
   └── backend/
       └── hack-f1811-firebase-adminsdk-xxxxx.json
   ```

2. **Recommended**: Rename it to something simpler like `serviceAccount.json`:
   ```powershell
   # In PowerShell
   cd backend
   Rename-Item "hack-f1811-firebase-adminsdk-xxxxx-xxxxxxxxxx.json" "serviceAccount.json"
   ```

### Step 7: Set Environment Variable

#### Windows PowerShell (Current Session)
```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS="$PWD\serviceAccount.json"
```

#### Windows PowerShell (Permanent - User Level)
```powershell
[System.Environment]::SetEnvironmentVariable('GOOGLE_APPLICATION_CREDENTIALS', 'C:\Users\Aman Singh\GDG\backend\serviceAccount.json', 'User')
```

#### Windows Command Prompt
```cmd
set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\Aman Singh\GDG\backend\serviceAccount.json
```

#### Linux/Mac (Current Session)
```bash
export GOOGLE_APPLICATION_CREDENTIALS="./serviceAccount.json"
```

#### Linux/Mac (Permanent - Add to ~/.bashrc or ~/.zshrc)
```bash
echo 'export GOOGLE_APPLICATION_CREDENTIALS="/path/to/GDG/backend/serviceAccount.json"' >> ~/.bashrc
source ~/.bashrc
```

### Step 8: Verify the Setup

Run this command to verify the environment variable is set:

**PowerShell**:
```powershell
echo $env:GOOGLE_APPLICATION_CREDENTIALS
```

**Command Prompt**:
```cmd
echo %GOOGLE_APPLICATION_CREDENTIALS%
```

**Linux/Mac**:
```bash
echo $GOOGLE_APPLICATION_CREDENTIALS
```

You should see the path to your service account JSON file.

### Step 9: Verify .gitignore

Make sure your `.gitignore` file excludes service account files:

```bash
# Check if it's already there
cd backend
cat .gitignore
```

It should contain:
```
*-firebase-adminsdk-*.json
serviceAccount.json
```

If not, add these lines to `backend/.gitignore`.

## Alternative: Using .env File (Not Recommended for Service Account Path)

While you can set the path in `.env`, it's better to use environment variables directly for `GOOGLE_APPLICATION_CREDENTIALS` because:
- The path might be different on different machines
- It's more secure to keep it out of any tracked files

However, if you prefer, you can add to `backend/.env`:
```env
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json
```

Then load it in your code (already done in `firebaseAdmin.ts`).

## Troubleshooting

### Error: "Could not load the default credentials"

**Cause**: Environment variable not set or pointing to wrong file.

**Solution**:
1. Verify the environment variable is set (Step 8)
2. Verify the file exists at the specified path
3. Restart your terminal/IDE after setting the environment variable

### Error: "Permission denied"

**Cause**: Service account doesn't have proper permissions.

**Solution**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **IAM & Admin** → **Service Accounts**
4. Find your service account
5. Ensure it has these roles:
   - Firebase Admin SDK Administrator Service Agent
   - Cloud Datastore User (for Firestore)

### File Downloaded but Can't Find It

**Solution**:
- Check your Downloads folder
- Search for files with `.json` extension
- Look for files starting with your project ID: `hack-f1811`

## Security Best Practices

✅ **DO**:
- Keep the service account file secure
- Add it to `.gitignore`
- Use environment variables to reference it
- Rotate credentials if accidentally exposed
- Use different service accounts for dev/staging/production

❌ **DON'T**:
- Commit service account files to git
- Share the file publicly
- Hardcode the credentials in your code
- Use production credentials in development

## Quick Setup Script (PowerShell)

Save this as `setup-credentials.ps1` in your `backend` directory:

```powershell
# setup-credentials.ps1
$serviceAccountFile = Get-ChildItem -Filter "*firebase-adminsdk*.json" | Select-Object -First 1

if ($serviceAccountFile) {
    Write-Host "Found service account file: $($serviceAccountFile.Name)"
    
    # Rename to serviceAccount.json
    Rename-Item $serviceAccountFile.Name "serviceAccount.json" -Force
    
    # Set environment variable
    $fullPath = Join-Path $PWD "serviceAccount.json"
    [System.Environment]::SetEnvironmentVariable('GOOGLE_APPLICATION_CREDENTIALS', $fullPath, 'User')
    
    Write-Host "✅ Service account configured successfully!"
    Write-Host "Path: $fullPath"
    Write-Host ""
    Write-Host "⚠️  Please restart your terminal/IDE for changes to take effect."
} else {
    Write-Host "❌ No service account file found in current directory."
    Write-Host "Please download it from Firebase Console first."
}
```

Run it:
```powershell
cd backend
.\setup-credentials.ps1
```

## Next Steps

After setting up credentials:

1. **Test the connection**:
   ```bash
   npm run seed:dry-run
   ```

2. **If successful, seed the database**:
   ```bash
   npm run seed
   ```

3. **Start the backend**:
   ```bash
   npm run serve
   ```

## Need Help?

If you encounter issues:
1. Check the [Firebase Admin SDK documentation](https://firebase.google.com/docs/admin/setup)
2. Verify your Firebase project settings
3. Check the troubleshooting section above
4. Ensure you have the necessary permissions in the Firebase project
