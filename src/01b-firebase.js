/* ---------- Firebase: shared saving outside claude.ai (e.g. GitHub Pages) ----------
   Paste your Firebase web app settings below (Firebase console → Project settings → Your apps).
   Leave it as null to save on this device only. On claude.ai the page's own shared database is used instead. */
const FIREBASE_CONFIG = null;
const FIREBASE_SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
function loadScript(src){ return new Promise((ok, fail) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = fail; document.head.appendChild(s); }); }
async function firebaseDb(){
  if (!FIREBASE_CONFIG || !FIREBASE_CONFIG.projectId) return null;
  try {
    for (const f of ["firebase-app-compat.js", "firebase-auth-compat.js", "firebase-firestore-compat.js"]) await loadScript(FIREBASE_SDK + f);
    const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(FIREBASE_CONFIG);
    await app.auth().signInAnonymously();
    const fs = app.firestore();
    try { fs.settings({ignoreUndefinedProperties:true, merge:true}); } catch {}
    return fs;
  } catch (e) { console.error("Firebase didn't connect:", e); return null; }
}
