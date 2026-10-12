import { Router } from 'express';
import { atsService } from '../services/atsService.js';

const router = Router();

// POST /api/ats/analyze
router.post('/analyze', (req, res, next) => {
  try {
    const { resume, jobDescription } = req.body || {};
    if (!resume) {
      return res.status(400).json({ error: 'Resume payload is required for ATS analysis' });
    }
    const report = atsService.analyze(resume, jobDescription || '');
    res.json(report);
  } catch (err) {
    next(err);
  }
});

export default router;
