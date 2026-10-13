# SmartResume AI — Complete Full-Stack Resume Builder

A modern, high-performance resume builder powered by React, Express, persistent database storage, ATS (Applicant Tracking System) scoring, and AI-assisted generation.

---

## Architecture Overview

### 1. Backend Server (`/server`)
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Default Port**: `5001` (to prevent conflict with macOS AirPlay receiver on port 5000)
- **Data Persistence**:
  - Auto-persisting JSON database located in `server/data/resumes.json`.
  - Auto-seeds starter profiles (Full-Stack Engineer, CS Fresher / BCA, Cybersecurity Analyst).
  - Optional MongoDB integration support via `MONGODB_URI`.
- **AI Engine (`/api/ai`)**:
  - High-performance built-in offline NLP engine (zero API keys needed out-of-the-box).
  - Optional Google Gemini API integration when `GEMINI_API_KEY` is provided in `server/.env`.
  - Feature 1: **Professional Summary Generator** (Results-Driven, Technical Architect, Growth & Fresher).
  - Feature 2: **STAR-Format Bullet Enhancer** (Action Verbs + Task + Measurable Metrics).
  - Feature 3: **Skill Recommender** (Tailored technical keywords for roles).
- **ATS Scanner & Analyzer (`/api/ats`)**:
  - Full ATS compatibility score (0 to 100).
  - Category breakdown: Contact completeness, structural headings, action verb density, measurable numbers/%, skill keyword footprint.
  - Target Job Description Matcher: paste job description for instant keyword gap analysis.
- **Export & Backup (`/api/export`)**:
  - Plain-text ASCII export formatted for ATS online application forms.
  - JSON full-state backup download.

### 2. Frontend Client (`/client`)
- **Framework**: Vite + React 18 + TailwindCSS + Lucide Icons
- **Features**:
  - Live backend connection status indicator in top navbar.
  - **My Resumes Drawer**: Save to cloud, browse saved resumes, duplicate, and delete.
  - **Template Library**: One-click starter resume loading.
  - **Live ATS Score Modal**: Real-time score gauge, strengths, and recommendations.
  - **AI Assistant Triggers**: Inline "✨ AI Summary", "✨ AI Polish", and "✨ Suggest Skills" buttons.
  - **Live Real-Time Preview & PDF Export**: Instant print preview / PDF download.

---

## Quick Start

### 1. Run Backend Server
```bash
cd server
npm install
npm start
```
> Server runs at `http://localhost:5001`

### 2. Run Frontend Client
```bash
cd client
npm install
npm run dev
```
> Open [http://localhost:5173](http://localhost:5173) in your browser. All API requests (`/api/*`) are proxied directly to the backend on port 5001.

---

## API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status, AI engine mode, and storage diagnostics |
| `GET` | `/api/resumes` | List all saved resumes (supports `?search=` and `?type=`) |
| `POST` | `/api/resumes` | Create and persist a new resume |
| `GET` | `/api/resumes/:id` | Fetch specific resume by ID |
| `PUT` | `/api/resumes/:id` | Update resume by ID |
| `DELETE` | `/api/resumes/:id` | Delete resume |
| `POST` | `/api/resumes/:id/duplicate` | Duplicate an existing resume |
| `GET` | `/api/templates` | List pre-built starter templates |
| `GET` | `/api/templates/:id` | Load complete template payload |
| `POST` | `/api/ai/generate-summary` | Generate 3 tailored professional summaries |
| `POST` | `/api/ai/enhance-bullet` | Enhance descriptions into quantified STAR-format bullets |
| `POST` | `/api/ai/suggest-skills` | Recommend trending skills for a given role |
| `GET` | `/api/ai/verbs` | Get categorized directory of high-impact action verbs |
| `POST` | `/api/ats/analyze` | Run comprehensive ATS score audit & job keyword match |
| `POST` | `/api/export/text` | Export plain-text formatted resume |
| `POST` | `/api/export/json` | Download JSON resume backup |
this is my new project 
