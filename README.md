# SPARPLE

> Your documents. Found instantly.

Offline-first document vault for Android. Scans your phone, understands what each file is, organizes everything with virtual labels (never moves your files), and lets you find anything with one search box — all without an internet connection.

---

## What's inside

- **React + Vite** frontend, dark glassmorphism UI, heavy Framer Motion animations
- **Capacitor** native Android wrapper
- **SQLite (sql.js)** for local storage with full-text search (FTS5)
- **PDF.js** for extracting text from PDF documents
- **Tesseract.js** for OCR on images/scanned documents — fully offline
- **Rule-based classifier** — zero-download document type detection (passport, Aadhaar, PAN, marksheets, bills, receipts, etc.)
- **GitHub Actions** — automatically builds the APK every time you push to `main`

---

## How to build the APK (no PC needed)

### Step 1 — Push this project to GitHub

Create a new repo on GitHub, then push all these files into it.

### Step 2 — Open in GitHub Codespaces

On your repo page: **Code → Codespaces → Create codespace on main**

Codespaces will automatically:
- Install Node.js, Java 17, and the Android SDK
- Run `npm install`
- Build the web app
- Sync the Android project

This takes a few minutes the first time. Just wait — you don't need to type anything.

### Step 3 — Build the APK

Once the Codespace finishes setting up (it auto-generates the Gradle wrapper for you), run in the terminal:

```bash
cd android
./gradlew assembleDebug
```

If `gradlew` is missing or you see a wrapper error, run this once first:
```bash
cd android
gradle wrapper --gradle-version 8.4
chmod +x gradlew
./gradlew assembleDebug
```

Your APK will be at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

Right-click it in the file explorer → **Download** to save it to your phone.

### Step 4 — Or just push to `main` (fully automated)

Every push to `main` triggers GitHub Actions to build the APK automatically and publish it under your repo's **Releases** tab. You can download it directly from there on your phone — no Codespace needed after the first setup.

---

## Installing the APK on your phone

1. Download the `.apk` file to your phone
2. Tap it — Android will ask to allow "install from unknown sources" the first time
3. Allow it, then install
4. On first launch, grant storage permission when asked

---

## Project structure

```
sparple/
├── src/
│   ├── pages/          Screens (Home, Scan, Search, Library, Document, Onboarding)
│   ├── components/     Reusable UI (DocumentCard, BottomNav)
│   ├── services/       Core logic (scanner.js, classifier.js, database.js)
│   ├── hooks/          App-wide state (useAppContext)
│   └── styles/         Design tokens (globals.css)
├── android/             Native Android project (Capacitor)
├── .github/workflows/   Auto-build pipeline
├── .devcontainer/       Codespaces auto-setup
└── scripts/             Build helper scripts
```

---

## How the scanning works

1. **Discovery** — walks Downloads, Documents, DCIM, Pictures, WhatsApp, Telegram folders
2. **Extraction** — PDF.js pulls text from PDFs; Tesseract.js OCRs images
3. **Classification** — pattern-matching engine scores extracted text against 25+ document type rules (passport, Aadhaar, PAN, marksheets, bills, etc.)
4. **Low confidence** documents get flagged `needs_review` — user labels them in one tap
5. **Storage** — SQLite with FTS5 full-text search index; files are never moved, only referenced by path
6. **Search** — searches indexed text content, not just filenames

---

## Customizing the classifier

All document recognition rules live in `src/services/classifier.js`. Each rule has regex patterns with weights — add new document types or tune existing ones there. No model retraining needed since it's pure pattern matching.

---

## Roadmap (post-MVP)

- Transformers.js semantic search fallback for documents the rule-based classifier misses
- Background re-scan on a schedule
- Export/backup of the label database
- Multi-language OCR (Hindi, regional languages)

---

Built for Sparple. Offline by design. Nothing ever leaves your device.
