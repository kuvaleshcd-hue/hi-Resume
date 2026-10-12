import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { storage } from './services/storageService.js';
import { aiService } from './services/aiService.js';

import resumeRoutes from './routes/resumeRoutes.js';
import templateRoutes from './routes/templateRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import atsRoutes from './routes/atsRoutes.js';
import exportRoutes from './routes/exportRoutes.js';

const app = express();
const port = process.env.PORT || 5001;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: [clientOrigin, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Request Logger
app.use((req, _res, next) => {
  const start = Date.now();
  const { method, url } = req;
  _res.on('finish', () => {
    const duration = Date.now() - start;
    if (!url.startsWith('/api/health')) {
      console.log(`[API] ${method} ${url} ${_res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Health & System Info
app.get('/api/health', async (_req, res) => {
  const stats = await storage.getStats();
  res.json({
    ok: true,
    service: 'smartresume-api',
    version: '2.0.0',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    aiEngine: aiService.getMode(),
    resumesCount: stats.total,
    storage: stats.storageType
  });
});

// Routes
app.use('/api/resumes', resumeRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/export', exportRoutes);

// 404 Handler
app.use('/api/*', (_req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Central Error Handler
app.use((err, _req, res, _next) => {
  console.error('[Error]', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Initialize storage and start server
async function start() {
  await storage.init();
  app.listen(port, () => {
    console.log(`\n==============================================`);
    console.log(`🚀 SmartResume AI API Server running!`);
    console.log(`📡 URL: http://localhost:${port}`);
    console.log(`🧠 AI Engine: ${aiService.getMode()}`);
    console.log(`💾 Storage: Local JSON Database with auto-persistence`);
    console.log(`==============================================\n`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
