# SmartResume AI — Resume Builder MVP

## Requirements
- Node.js 20+ recommended
- npm

## Run it
Terminal 1:
```bash
cd server
npm install
npm run dev
```
Terminal 2:
```bash
cd client
npm install
npm run dev
```
Open http://localhost:5173

## Included
- Resume type selection
- Step-by-step personal, education, skills, projects, experience, certification and achievement forms
- Live resume preview
- Local browser draft saving
- Print / Save as PDF
- Express API with health check and demo resume CRUD endpoints

## Important
This is a functional MVP starter. Resume drafts are stored in browser localStorage. The server demo uses an in-memory store, so it resets when restarted. Authentication, MongoDB persistence, AI generation and ATS analysis are not connected yet.
