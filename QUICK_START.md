# 🚀 Quick Start - Firebase Functions & Node 24

## ✅ Task 1: Firebase Functions Local Run Path

### Current Status
```
✓ Functions code ready: functions/index.js
✓ Functions config ready: firebase.json  
✓ Dependencies installed: functions/node_modules/
✗ Firebase CLI: NOT INSTALLED
✗ Node 24: NOT INSTALLED (currently v22.16.0)
✗ API Key: NOT SET
```

### To Run Functions Locally

**Step 1:** Install Firebase CLI
```powershell
npm install -g firebase-tools
```

**Step 2:** Upgrade to Node 24 (one of these)
```powershell
# Option A: Using nvm
nvm install 24
nvm use 24

# Option B: Direct download
# Go to https://nodejs.org and download Node 24 LTS
```

**Step 3:** Set API Key
```powershell
# Edit: C:\Users\myproject\Portfolio\functions\.env.resume-klent
GEMINI_API_KEY=your-gemini-api-key-here
```

**Step 4:** Start Firebase Emulator
```powershell
cd C:\Users\myproject\Portfolio
firebase emulators:start --only functions
```

**Expected Output:**
```
✔ functions emulator started at http://localhost:5001
```

---

## ✅ Task 2: Node 24 Compatibility Notes

### Issue Summary
- Functions require Node 24 (engines field in package.json)
- System has Node 22.16.0 → EBADENGINE warning
- Frontend (React) works fine on Node 22
- Only functions need Node 24

### Quick Upgrade Commands

```powershell
# Check current version
node --version
# Output: v22.16.0

# Install nvm (first time only)
# Download from: https://github.com/coreybutler/nvm-windows/releases

# Install & switch to Node 24
nvm install 24
nvm use 24

# Verify
node --version
# Output: v24.x.x

# Reinstall functions dependencies with Node 24
cd functions
rm -r node_modules package-lock.json
npm install
```

### Post-Upgrade Verification
```powershell
cd functions
npm list --all 2>&1 | findstr EBADENGINE  # Should return nothing
firebase deploy --only functions  # Deploy to cloud
```

---

## 📋 Deployment Checklist

Before going live:

- [ ] Node 24 installed and active
- [ ] Firebase CLI installed globally
- [ ] `GEMINI_API_KEY` set in Firebase secrets
- [ ] Firebase authenticated: `firebase login`
- [ ] Functions emulator tested locally
- [ ] Portfolio frontend builds: `npm run build` in `portfolio/`
- [ ] No critical vulnerabilities blocking deployment

---

## 🔗 Useful Commands

| Command | Purpose |
|---------|---------|
| `firebase emulators:start --only functions` | Run emulator |
| `firebase functions:log` | View function logs |
| `firebase deploy --only functions` | Deploy to cloud |
| `firebase functions:list` | See deployed functions |
| `nvm list` | Show available Node versions |
| `npm run build` (in portfolio/) | Build frontend |

---

## 📍 File Locations

```
C:\Users\myproject\Portfolio\
├── portfolio/              # Frontend (Node 22 OK)
├── functions/              # Backend functions (Node 24 required)
│   ├── index.js           # Chat function code
│   ├── .env.resume-klent  # API keys (add GEMINI_API_KEY)
│   └── package.json       # Has "engines": {"node": "24"}
├── .firebaserc            # Firebase project config
├── firebase.json          # Function deployment config
├── SETUP_GUIDE.md         # Full documentation
└── QUICK_START.md         # This file
```

---

## ⚡ Current Active State

✅ **Frontend**: Running on http://localhost:5174/  
✅ **Node_modules**: All dependencies installed  
✅ **Build**: Portfolio builds successfully  
❌ **Firebase Emulator**: Not started (needs Firebase CLI + Node 24)  
⚠️ **Functions Deploy**: Ready once Node 24 is installed  

---

## 🆘 Still Need Help?

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed troubleshooting and explanations.

---

**Summary:** Install Firebase CLI → Upgrade Node 24 → Set API key → Run emulator  
**Time needed:** ~15 minutes total
