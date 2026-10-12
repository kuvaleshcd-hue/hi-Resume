import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { sampleTemplates } from '../data/templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DATA_FILE = path.join(DATA_DIR, 'resumes.json');

class StorageService {
  constructor() {
    this.resumes = new Map();
    this.initialized = false;
    this.savePromise = null;
  }

  async init() {
    if (this.initialized) return;
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      try {
        const raw = await fs.readFile(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed.forEach(item => {
            if (item && item.id) {
              this.resumes.set(item.id, item);
            }
          });
        }
      } catch (err) {
        if (err.code !== 'ENOENT') {
          console.error('[StorageService] Error reading resumes file:', err.message);
        }
      }

      // If empty, seed with starter templates so user has rich initial records
      if (this.resumes.size === 0) {
        sampleTemplates.forEach(tpl => {
          const item = {
            ...tpl,
            id: tpl.id || randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          this.resumes.set(item.id, item);
        });
        await this.persist();
      }

      this.initialized = true;
      console.log(`[StorageService] Initialized with ${this.resumes.size} resumes stored in ${DATA_FILE}`);
    } catch (err) {
      console.error('[StorageService] Initialization error:', err);
      this.initialized = true;
    }
  }

  async persist() {
    try {
      const items = Array.from(this.resumes.values());
      await fs.mkdir(DATA_DIR, { recursive: true });
      const tempPath = `${DATA_FILE}.tmp.${Date.now()}`;
      await fs.writeFile(tempPath, JSON.stringify(items, null, 2), 'utf-8');
      await fs.rename(tempPath, DATA_FILE);
    } catch (err) {
      console.error('[StorageService] Failed to persist data:', err.message);
    }
  }

  async getAll({ search, type } = {}) {
    await this.init();
    let list = Array.from(this.resumes.values());

    if (type && type !== 'all') {
      list = list.filter(r => (r.type || '').toLowerCase() === type.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(r => {
        const name = r.personal?.name || '';
        const title = r.title || r.personal?.title || '';
        const email = r.personal?.email || '';
        const skills = (r.skills || []).join(' ');
        return (
          name.toLowerCase().includes(q) ||
          title.toLowerCase().includes(q) ||
          email.toLowerCase().includes(q) ||
          skills.toLowerCase().includes(q)
        );
      });
    }

    // Sort by updatedAt descending
    list.sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));

    return list;
  }

  async getById(id) {
    await this.init();
    return this.resumes.get(id) || null;
  }

  async create(payload) {
    await this.init();
    const id = payload.id && !this.resumes.has(payload.id) ? payload.id : randomUUID();
    const now = new Date().toISOString();
    const item = {
      id,
      title: payload.title || (payload.personal?.name ? `${payload.personal.name}'s Resume` : 'Untitled Resume'),
      type: payload.type || 'ATS-Friendly',
      personal: {
        name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        portfolio: '',
        summary: '',
        ...(payload.personal || {})
      },
      education: Array.isArray(payload.education) ? payload.education : [],
      skills: Array.isArray(payload.skills) ? payload.skills : [],
      projects: Array.isArray(payload.projects) ? payload.projects : [],
      experience: Array.isArray(payload.experience) ? payload.experience : [],
      certifications: Array.isArray(payload.certifications) ? payload.certifications : [],
      achievements: Array.isArray(payload.achievements) ? payload.achievements : [],
      createdAt: now,
      updatedAt: now
    };

    this.resumes.set(id, item);
    await this.persist();
    return item;
  }

  async update(id, payload) {
    await this.init();
    const existing = this.resumes.get(id);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...payload,
      id: existing.id,
      createdAt: existing.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.resumes.set(id, updated);
    await this.persist();
    return updated;
  }

  async delete(id) {
    await this.init();
    if (!this.resumes.has(id)) return false;
    this.resumes.delete(id);
    await this.persist();
    return true;
  }

  async duplicate(id) {
    await this.init();
    const original = this.resumes.get(id);
    if (!original) return null;

    const copy = JSON.parse(JSON.stringify(original));
    copy.id = randomUUID();
    copy.title = `${original.title || original.personal?.name || 'Resume'} (Copy)`;
    copy.createdAt = new Date().toISOString();
    copy.updatedAt = new Date().toISOString();

    this.resumes.set(copy.id, copy);
    await this.persist();
    return copy;
  }

  async getStats() {
    await this.init();
    const items = Array.from(this.resumes.values());
    const byType = {};
    items.forEach(item => {
      const t = item.type || 'ATS-Friendly';
      byType[t] = (byType[t] || 0) + 1;
    });

    return {
      total: items.length,
      storageType: 'json-file',
      filePath: DATA_FILE,
      byType,
      lastUpdated: items.length > 0 ? items[0].updatedAt : null
    };
  }
}

export const storage = new StorageService();
