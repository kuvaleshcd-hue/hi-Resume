import { Router } from 'express';
import { aiService } from '../services/aiService.js';

const router = Router();

// GET /api/ai/status
router.get('/status', (_req, res) => {
  res.json({
    mode: aiService.getMode(),
    isExternalConfigured: aiService.isExternalAiConfigured()
  });
});

// POST /api/ai/enhance-bullet
router.post('/enhance-bullet', async (req, res, next) => {
  try {
    const { text, role, tech } = req.body || {};
    const result = await aiService.enhanceBullet({ text, role, tech });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/ai/generate-summary
router.post('/generate-summary', async (req, res, next) => {
  try {
    const { role, skills, experienceYears, name } = req.body || {};
    const result = await aiService.generateSummary({ role, skills, experienceYears, name });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/ai/suggest-skills
router.post('/suggest-skills', (req, res, next) => {
  try {
    const { role, currentSkills } = req.body || {};
    const result = aiService.suggestSkills({ role, currentSkills });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET /api/ai/verbs
router.get('/verbs', (_req, res) => {
  res.json(aiService.getActionVerbs());
});

export default router;
