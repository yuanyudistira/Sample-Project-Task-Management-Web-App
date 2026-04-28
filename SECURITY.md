# Security Issues - Modul 1 (Vulnerable)

⚠️ This version has **intentional security vulnerabilities** for learning.

Your job: Fix all of these before moving to production!

## Issue #1: Hardcoded API Keys ❌

**File:** `src/context/TaskContext.jsx:9-10`
\`\`\`javascript
const API_KEY = "sk-proj-12345abcde"; // ❌ EXPOSED!
const API_URL = "https://api.example.com";
\`\`\`

**Risk:** Anyone with access to this repo can abuse your API
**Fix:** Move to `.env` file and use `import.meta.env.VITE_API_KEY`
**Learning:** Environment variables protect secrets

---

## Issue #2: Console Logging Secrets ❌

**File:** `src/context/TaskContext.jsx:19`
\`\`\`javascript
console.log('API_KEY:', API_KEY); // ❌ VISIBLE IN BROWSER!
\`\`\`

**Risk:** Secrets visible in browser DevTools, easily screenshot/share
**Fix:** Remove this line, only log generic messages
**Learning:** Never log sensitive data to console

---

## Issue #3: No Input Validation ❌

**File:** `src/context/TaskContext.jsx:44-46`
\`\`\`javascript
const addTask = (task) => {
  setTasks([{ ...task, ... }]); // Takes ANY input!
}
\`\`\`

**Risk:** Malformed data corrupts app, XSS vulnerabilities
**Fix:** Create `validateTask()` function
**Learning:** Always validate user input

---

## Issue #4: No Error Handling ❌

**File:** `src/context/TaskContext.jsx:44, 48, 52, 56`
\`\`\`javascript
// These functions crash silently if something wrong
const addTask = (task) => { ... }
const updateTask = (id, task) => { ... }
const deleteTask = (id) => { ... }
\`\`\`

**Risk:** App breaks without user knowing
**Fix:** Add try/catch blocks and meaningful error messages
**Learning:** Errors should be handled gracefully

---

## Issue #5: No Error Messages (Generic) ❌

**File:** Multiple locations
\`\`\`javascript
console.error('Failed to add task'); // Too generic!
\`\`\`

**Risk:** Users don't know what went wrong
**Fix:** Add descriptive but safe error messages
**Learning:** Balance between debugging and security

---

## How to Fix

Compare with solution:
\`\`\`bash
git diff modul-1-vulnerable..modul-2-secured
\`\`\`

See exactly what changed!