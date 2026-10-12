import { Router } from 'express';
import { sampleTemplates } from '../data/templates.js';

const router = Router();

// GET /api/templates
router.get('/', (_req, res) => {
  const summaries = sampleTemplates.map(t => ({
    id: t.id,
    title: t.title,
    type: t.type,
    name: t.personal?.name,
    role: t.personal?.title,
    skillsCount: t.skills?.length || 0,
    hasProjects: (t.projects?.length || 0) > 0,
    hasExperience: (t.experience?.length || 0) > 0
  }));
  res.json(summaries);
});

// GET /api/templates/:id
router.get('/:id', (req, res) => {
  const tpl = sampleTemplates.find(t => t.id === req.params.id);
  if (!tpl) {
    return res.status(404).json({ error: 'Template not found' });
  }
  res.json(tpl);
});

export default router;
