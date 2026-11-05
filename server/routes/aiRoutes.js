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

// POST /api/ai/build-resume (Groq LLaMA 3.3 70B Auto-Resume Builder)
router.post('/build-resume', async (req, res, next) => {
  try {
    const { prompt, githubUrl, apiKey, targetRole, candidateName } = req.body || {};
    const resume = await aiService.buildResumeWithGroq({
      prompt,
      githubUrl,
      apiKey,
      targetRole,
      candidateName
    });
    res.json({
      ok: true,
      mode: 'Groq LPU (LLaMA 3.3 70B)',
      resume
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/ai/enhance-bullet
router.post('/enhance-bullet', async (req, res, next) => {
  try {
    const { text, role, tech, apiKey } = req.body || {};
    const result = await aiService.enhanceBullet({ text, role, tech, apiKey });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/ai/generate-summary
router.post('/generate-summary', async (req, res, next) => {
  try {
    const { role, skills, experienceYears, name, apiKey } = req.body || {};
    const result = await aiService.generateSummary({ role, skills, experienceYears, name, apiKey });
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
