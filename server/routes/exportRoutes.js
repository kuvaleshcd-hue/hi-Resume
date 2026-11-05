import { Router } from 'express';

const router = Router();

function formatPlainText(d) {
  const p = d.personal || {};
  const lines = [];

  // Header
  lines.push((p.name || 'FULL NAME').toUpperCase());
  if (p.title) lines.push(p.title);
  const contact = [p.email, p.phone, p.location, p.linkedin, p.github, p.portfolio].filter(Boolean);
  if (contact.length > 0) lines.push(contact.join(' | '));
  lines.push('------------------------------------------------------------');

  // Objective
  if (p.summary) {
    lines.push('\nOBJECTIVE');
    lines.push('------------------------------------------------------------');
    lines.push(p.summary.trim());
  }

  // Education
  if (Array.isArray(d.education) && d.education.some(ed => ed.degree || ed.institution)) {
    lines.push('\nEDUCATION');
    lines.push('------------------------------------------------------------');
    d.education.filter(ed => ed.degree || ed.institution).forEach(ed => {
      lines.push(`${ed.degree || 'Degree'} | ${ed.start || ''}${ed.end ? ' – ' + ed.end : ''}`);
      lines.push(`${ed.institution || ''}${ed.university ? ', ' + ed.university : ''}${ed.location ? ', ' + ed.location : ''}`);
      if (ed.grade) lines.push(`  Grade / CGPA: ${ed.grade}`);
      lines.push('');
    });
  }

  // Projects
  if (Array.isArray(d.projects) && d.projects.some(pr => pr.name)) {
    lines.push(`\n${d.projectsTitle || 'RELEVANT PROJECTS'}`);
    lines.push('------------------------------------------------------------');
    d.projects.filter(pr => pr.name).forEach(pr => {
      lines.push(`${pr.name}${pr.date ? '  (' + pr.date + ')' : ''}`);
      if (pr.subtitle) lines.push(`  ${pr.subtitle}`);
      if (pr.link) lines.push(`  Link: ${pr.link}`);
      if (pr.description) {
        pr.description.split('\n').filter(Boolean).forEach(l => {
          lines.push(`  • ${l.replace(/^[•\-\*]\s*/, '')}`);
        });
      }
      lines.push('');
    });
  }

  // Technical Skills (Table / Categories)
  if (Array.isArray(d.skillCategories) && d.skillCategories.length > 0) {
    lines.push('\nTECHNICAL SKILLS');
    lines.push('------------------------------------------------------------');
    d.skillCategories.filter(sc => sc.category || sc.skills).forEach(sc => {
      lines.push(`${sc.category.padEnd(20, ' ')} : ${sc.skills}`);
    });
  } else if (Array.isArray(d.skills) && d.skills.length > 0) {
    lines.push('\nTECHNICAL SKILLS');
    lines.push('------------------------------------------------------------');
    lines.push(d.skills.join(', '));
  }

  // Experience
  if (Array.isArray(d.experience) && d.experience.some(e => e.role || e.company)) {
    lines.push('\nEXPERIENCE');
    lines.push('------------------------------------------------------------');
    d.experience.filter(e => e.role || e.company).forEach(e => {
      lines.push(`${e.role || 'Role'} — ${e.company || 'Company'} (${e.start || ''} – ${e.end || 'Present'})`);
      if (e.subtitle) lines.push(`  ${e.subtitle}`);
      if (e.details) {
        e.details.split('\n').filter(Boolean).forEach(l => {
          lines.push(`  • ${l.replace(/^[•\-\*]\s*/, '')}`);
        });
      }
      lines.push('');
    });
  }

  // Publications & Achievements
  if (Array.isArray(d.achievements) && d.achievements.some(Boolean)) {
    lines.push(`\n${d.achievementsTitle || 'PUBLICATIONS & ACHIEVEMENTS'}`);
    lines.push('------------------------------------------------------------');
    d.achievements.filter(Boolean).forEach(a => {
      lines.push(`• ${a.replace(/^[•\-\*]\s*/, '')}`);
    });
  }

  return lines.join('\n');
}

// POST /api/export/text
router.post('/text', (req, res) => {
  const resume = req.body || {};
  const text = formatPlainText(resume);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(text);
});

// POST /api/export/json
router.post('/json', (req, res) => {
  const resume = req.body || {};
  res.setHeader('Content-Disposition', `attachment; filename="${(resume.personal?.name || 'resume').toLowerCase().replace(/\s+/g, '_')}_backup.json"`);
  res.json(resume);
});

export default router;
