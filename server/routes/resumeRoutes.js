import { Router } from 'express';
import { storage } from '../services/storageService.js';

const router = Router();

// GET /api/resumes/stats
router.get('/stats', async (_req, res, next) => {
  try {
    const stats = await storage.getStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

// GET /api/resumes
router.get('/', async (req, res, next) => {
  try {
    const { search, type } = req.query;
    const list = await storage.getAll({ search, type });
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// GET /api/resumes/:id
router.get('/:id', async (req, res, next) => {
  try {
    const item = await storage.getById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/resumes
router.post('/', async (req, res, next) => {
  try {
    const item = await storage.create(req.body || {});
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

// PUT /api/resumes/:id
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await storage.update(req.params.id, req.body || {});
    if (!updated) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/resumes/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const ok = await storage.delete(req.params.id);
    if (!ok) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// POST /api/resumes/:id/duplicate
router.post('/:id/duplicate', async (req, res, next) => {
  try {
    const duplicated = await storage.duplicate(req.params.id);
    if (!duplicated) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.status(201).json(duplicated);
  } catch (err) {
    next(err);
  }
});

// POST /api/resumes/import
router.post('/import', async (req, res, next) => {
  try {
    const imported = await storage.create(req.body);
    res.status(201).json(imported);
  } catch (err) {
    next(err);
  }
});

export default router;
