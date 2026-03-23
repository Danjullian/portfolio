# Firebase Functions & Node 24 Setup Guide

## Current Environment Status
- **Current Node.js Version:** v22.16.0
- **Required Node.js Version (Functions):** Node 24
- **Firebase CLI Status:** ❌ Not installed
- **Portfolio Frontend:** ✅ Running on `http://localhost:5174/`
- **Firebase Functions:** ⚠️ Ready but not deployed

---

## Task 1: Firebase Functions Local Run Path

### Prerequisites Needed
1. **Firebase CLI Installation** (currently missing)
   ```powershell
   npm install -g firebase-tools
   ```

2. **Google Generative AI API Key**
   - Add to `functions/.env.resume-klent` or set as Firebase secret:
     ```
     GEMINI_API_KEY=your-api-key-here
     ```

### Test Firebase Functions Locally (Step-by-Step)

#### **Option A: Using Firebase Emulator (Requires Node 24)**

```powershell
# 1. First, install Firebase CLI globally
npm install -g firebase-tools

# 2. Upgrade Node to v24 (see Task 2 below)
# Use nvm or download from nodejs.org

# 3. Navigate to portfolio root
cd C:\Users\myproject\Portfolio

# 4. Start Firebase emulator for functions
firebase emulators:start --only functions

# Expected output:
# ✔  functions emulator started at http://localhost:5001
```

#### **Option B: Using npm script (Current workaround with Node 22)**

```powershell
# Navigate to functions folder
cd C:\Users\myproject\Portfolio\functions

# Try local execution (may have Node engine warnings)
npm run serve
```

### Functions Code Overview
**File:** `functions/index.js`

- **Function:** `chat` (HTTP request handler)
- **Region:** `us-central1`
- **Port (Emulator):** 5001
- **Secret Required:** `GEMINI_API_KEY`
- **Triggers:** POST/OPTIONS requests
- **CORS:** Enabled for all origins (`*`)

### Testing the Chat Function

Once emulator is running:

```bash
curl -X POST http://localhost:5001/portfolio-default/us-central1/chat \
  -H "Content-Type: application/json" \
  -d '{
    "history": [
      {"text": "Hello, how are you?", "role": "user"}
    ]
  }'
```

---

## Task 2: Node 24 Compatibility Notes

### Why Node 24 is Needed for Functions

1. **Firebase Functions 7.0.0 Requirements:**
   - Requires Node runtime 24 or higher
   - Specified in `functions/package.json`:
     ```json
     "engines": {
       "node": "24"
     }
     ```

2. **Google Generative AI Library:**
   - Version ^0.24.1+ has better Node 24 support
   - Async/await patterns optimized for newer Node runtime

3. **Security & Performance:**
   - Node 24 includes security patches for Firebase Admin SDK
   - Better performance for async operations

### Current Issue
- **System:** Node 22.16.0 ❌ (will trigger EBADENGINE warning)
- **Cause:** Version mismatch between system and functions requirement
- **Impact:** Functions will install with warnings but may not deploy optimally

---

### Upgrade Path: Node 22 → Node 24

#### **Option 1: Using nvm (Recommended)**

```powershell
# Install nvm-windows (if not already installed)
# Download from: https://github.com/coreybutler/nvm-windows/releases

# List available versions
nvm list available

# Install Node 24
nvm install 24

# Switch to Node 24
nvm use 24

# Verify
node --version  # Should show v24.x.x
```

#### **Option 2: Direct Download**

```powershell
# 1. Download Node 24 LTS from https://nodejs.org
# 2. Run installer
# 3. Verify installation
node --version
npm --version
```

#### **Option 3: Docker (Safest for Production)**

```dockerfile
FROM node:24-alpine

WORKDIR /app
COPY functions/ .
RUN npm install
CMD ["npm", "run", "serve"]
```

---

### Post-Upgrade Checklist

After upgrading to Node 24:

```powershell
# 1. Reinstall dependencies with exact Node 24
cd C:\Users\myproject\Portfolio\functions
rm -r node_modules package-lock.json
npm install

# 2. Verify no engine warnings
npm list --all 2>&1 | findstr EBADENGINE

# 3. Test deployment to Firebase
firebase deploy --only functions

# 4. Check Firebase logs
firebase functions:log
```

---

## Deployment Checklist

Before deploying functions to Firebase Cloud:

- [ ] Node 24 installed and verified
- [ ] `GEMINI_API_KEY` configured in Firebase secrets
- [ ] Firebase CLI authenticated: `firebase login`
- [ ] `.env.resume-klent` contains all secrets
- [ ] Local emulator tested successfully
- [ ] All dependencies installed: `npm install` in `/functions`
- [ ] No audit vulnerabilities blocking deployment (or exempted)
- [ ] Firebase project ID set in `.firebaserc`

### Deploy Functions to Cloud

```powershell
cd C:\Users\myproject\Portfolio

# Deploy only functions (not hosting)
firebase deploy --only functions

# Monitor deployment
firebase functions:log

# View active functions
firebase functions:list
```

---

## Current Dependencies Status

### Portfolio Frontend (Node 22 OK)
- React 19.2.3 ✅
- Vite 7.3.0 ✅
- Running successfully on port 5174 ✅

### Functions (Node 24 Required)
- firebase-functions 7.0.0 ⚠️
- firebase-admin 13.6.0 ⚠️
- @google/generative-ai 0.24.1 ⚠️

### Audit Status
| Package | Vulnerabilities | Severity |
|---------|------------------|----------|
| portfolio | 6 total | 2 moderate, 4 high |
| functions | 15 total | 9 low, 3 moderate, 2 high, 1 critical |

**Recommendation:** Run `npm audit fix` after Node 24 upgrade.

---

## Troubleshooting

### Error: `EBADENGINE` during `npm install`

**Cause:** Node version mismatch (22 vs 24 required)

**Fix:** Upgrade Node using nvm or direct download (see above)

### Error: `firebase: command not found`

**Cause:** Firebase CLI not installed

**Fix:** 
```powershell
npm install -g firebase-tools
firebase login
```

### Error: `GEMINI_API_KEY is undefined`

**Cause:** Environment variable not set

**Fix:**
```powershell
# Set in .env.resume-klent
GEMINI_API_KEY=your-actual-key-here

# Or set as Firebase secret
firebase functions:config:set gemini.api_key="your-key"
```

### Emulator fails to start on port 5001

**Cause:** Port already in use or dependencies not installed

**Fix:**
```powershell
# Kill process on port 5001
Get-Process -Id (Get-NetTCPConnection -LocalPort 5001).OwningProcess | Stop-Process -Force

# Reinstall dependencies
cd functions && npm install

# Try again
firebase emulators:start --only functions
```

---

## Next Steps

1. **Immediate:** Install Firebase CLI (`npm install -g firebase-tools`)
2. **Short-term:** Upgrade Node to v24 using nvm
3. **Before Deploy:** Set up `GEMINI_API_KEY` in Firebase secrets
4. **Testing:** Run emulator locally and test chat function
5. **Production:** Deploy to Firebase Cloud Functions

---

**Document Created:** March 23, 2026  
**Status:** Ready for Node 24 Upgrade & Firebase Local Testing
