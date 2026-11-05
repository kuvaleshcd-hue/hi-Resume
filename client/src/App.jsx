import { useEffect, useState } from 'react';
import {
  FileText, ArrowRight, ArrowLeft, Plus, Trash2, Download, Check, Sparkles,
  Cloud, BarChart3, FolderOpen, Copy, FileCode, X, RefreshCw
} from 'lucide-react';

const types = [
  'ATS-Friendly'
];

export const kuvaleshResume = {
  type: 'ATS-Friendly',
  title: 'Kuvalesh C D — Full Stack AI Developer',
  personal: {
    name: 'KUVALESH C D',
    title: 'Full Stack AI Developer',
    email: 'kuvaleshcd@gmail.com',
    phone: '+91 73383 74900',
    location: 'Bengaluru, Karnataka',
    linkedin: '',
    github: 'kuvaleshcd-hue',
    portfolio: 'https://kuvalesh.netlify.app',
    summary: 'Information Science graduate with hands-on experience in speech, NLP, and full-stack AI development. Seeking an opportunity to apply my technical skills, learn from experienced teams, and contribute to impactful AI projects, especially ones that make technology accessible in Indian languages.'
  },
  education: [
    {
      degree: 'B.E. Information Science',
      institution: 'Ghousia College of Engineering, VTU, Bengaluru',
      university: '',
      location: '',
      start: '2023',
      end: '2027',
      grade: ''
    }
  ],
  projectsTitle: 'RELEVANT PROJECTS — SPEECH, NLP & AI',
  projects: [
    {
      name: 'Sarvam VideoDubber | AI Multi-language Video Dubbing Pipeline',
      date: '2025 – 2026',
      subtitle: "Sarvam AI BuildIn' Hours Hackathon — Shortlisted for offline round, Bengaluru",
      link: 'https://github.com/kuvaleshcd-hue/Sarvam-VideoDubber',
      description: "• End-to-end dubbing pipeline: Saaras v3 (STT) → Sarvam-Translate → Bulbul v3 (TTS) for 16 Indian languages\n• Built advanced audio processing with FFmpeg atempo sync, subtitle overlay, SRT export, and batch dubbing\n• Deployed on Streamlit Cloud; preparing IEEE INDICON 2026 paper on low-resource language dubbing evaluation • GitHub"
    },
    {
      name: 'VAANI | Kannada Voice Assistant',
      date: '2025',
      subtitle: '',
      link: '',
      description: "• Built an end-to-end Kannada voice assistant using LLaMA 3 via Groq, with STT and TTS integration\n• Focused on natural conversational flow in Kannada for rural and non-English-speaking users"
    },
    {
      name: 'Hanu Agri | AI Agricultural Demand Prediction System',
      date: '2025',
      subtitle: '',
      link: 'https://github.com/kuvaleshcd-hue/Hanu-Agri',
      description: "• 7 ML models: crop recommendation, disease detection (image), price forecasting, fertilizer guidance, demand-supply analysis, profitability calculator, and weather advisory — exposed via Flask REST APIs\n• scikit-learn (.pkl models) + vanilla JS + Chart.js + Leaflet maps; deployed on Netlify • Live Demo • GitHub"
    },
    {
      name: 'Vision Films | Photography & Videography Studio Website',
      date: '2025',
      subtitle: '',
      link: 'https://github.com/kuvaleshcd-hue/Vision-Films',
      description: "• Cinematic portfolio site for Vision Films Mysore — smooth scroll, CSS animations, gallery, responsive layout\n• Live Demo • GitHub • Demonstrates UI/UX and frontend design proficiency"
    }
  ],
  skillCategories: [
    {
      category: 'Speech & Audio',
      skills: 'STT/TTS pipelines, FFmpeg audio processing, diarization concepts, Sarvam AI suite (Saaras, Bulbul, Translate), pyaudio, pydub'
    },
    {
      category: 'Languages',
      skills: 'Python, JavaScript, C, SQL, Bash • Kannada (native), English (fluent), Hindi'
    },
    {
      category: 'Backend / APIs',
      skills: 'FastAPI, Flask, Node.js, REST APIs, Google Calendar API, Gmail API, OAuth 2.0, WebSockets'
    },
    {
      category: 'Frontend',
      skills: 'React, Streamlit, HTML/CSS, Chrome Extension (Manifest V3)'
    },
    {
      category: 'Tools & Infra',
      skills: 'Git, GitHub, Docker (basic), VS Code, Jupyter, Streamlit Cloud, Antigravity'
    }
  ],
  skills: [
    'Speech & Audio (STT/TTS, FFmpeg, Sarvam AI)',
    'Python', 'FastAPI', 'Flask', 'Node.js', 'React', 'Streamlit',
    'Docker', 'Git', 'GitHub', 'SQL', 'LLaMA 3', 'Groq'
  ],
  experience: [
    {
      role: 'Full Stack AI Developer Intern',
      company: 'OmniIDE, Bengaluru',
      start: '2026',
      end: 'Present',
      subtitle: 'Early-stage startup building open-source local-native AI infrastructure',
      details: "• Contributing to AI agent orchestration and developer tooling for local LLM deployment\n• Working directly with the founder on system architecture and full-stack implementation"
    },
    {
      role: 'Cybersecurity Intern',
      company: 'Elevate Labs',
      start: 'May',
      end: 'Jul 2026',
      subtitle: 'Best Performer Award',
      details: "• Built HoneyPot Server (Flask + paramiko SSH + Fail2ban), SOC dashboard, and Log Analyzer"
    },
    {
      role: 'Cybersecurity Intern',
      company: 'CodeAlpha',
      start: 'Jul',
      end: '2026',
      subtitle: '',
      details: "• Built Network Packet Sniffer (Scapy), PhishGuard URL scanner, and NIDS web app (FastAPI + WebSocket)"
    }
  ],
  certifications: [],
  achievementsTitle: 'PUBLICATIONS & ACHIEVEMENTS',
  achievements: [
    "IEEE INDICON 2026 paper in preparation: 'Sarvam VideoDubber: Low-Resource Multilingual AI Video Dubbing'",
    "Shortlisted for ARTPARK/IISc TIR Incubation Program (Zivana AI — YOLOv8 CCTV security system for Indian SMEs)",
    "Shortlisted for Sarvam BuildIn' Hours offline hackathon round, Bengaluru, 2025",
    "E-Cell IIT Bombay NEC2026 Hackathon participant; 3LC Hack[AI]thon 2.0 certificate (CEO Paul Endresen)",
    "GATE CSE 2027 aspirant targeting 65+ score for M.Tech admission; preparation ongoing since August 2024"
  ]
};

const blank = {
  type: 'ATS-Friendly',
  title: 'Untitled Resume',
  personal: {
    name: '', title: '', email: '', phone: '', location: '',
    linkedin: '', github: '', portfolio: '', summary: ''
  },
  education: [{ degree: '', institution: '', university: '', location: '', start: '', end: '', grade: '' }],
  projectsTitle: 'RELEVANT PROJECTS — SPEECH, NLP & AI',
  projects: [{ name: '', date: '', subtitle: '', link: '', description: '' }],
  skillCategories: [
    { category: 'Speech & Audio', skills: '' },
    { category: 'Languages', skills: '' },
    { category: 'Backend / APIs', skills: '' },
    { category: 'Frontend', skills: '' },
    { category: 'Tools & Infra', skills: '' }
  ],
  skills: [],
  experience: [{ role: '', company: '', start: '', end: '', subtitle: '', details: '' }],
  certifications: [{ name: '', issuer: '', date: '' }],
  achievementsTitle: 'PUBLICATIONS & ACHIEVEMENTS',
  achievements: ['']
};

const steps = ['Personal', 'Education', 'Projects', 'Skills', 'Experience', 'Achievements'];
const clone = x => JSON.parse(JSON.stringify(x));

function renderRichText(text, fallbackLink) {
  if (!text) return null;
  const parts = text.split(/(•\s*GitHub|•\s*Live Demo|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/gi);
  return parts.map((part, i) => {
    if (!part) return null;
    if (/^•\s*GitHub$/i.test(part.trim())) {
      return (
        <span key={i}>
          • <a href={fallbackLink || 'https://github.com/kuvaleshcd-hue'} target="_blank" rel="noreferrer" className="resume-blue-link">GitHub</a>
        </span>
      );
    }
    if (/^•\s*Live Demo$/i.test(part.trim())) {
      return (
        <span key={i}>
          • <a href="https://kuvalesh.netlify.app" target="_blank" rel="noreferrer" className="resume-blue-link">Live Demo</a>
        </span>
      );
    }
    const mdMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (mdMatch) {
      return (
        <a key={i} href={mdMatch[2]} target="_blank" rel="noreferrer" className="resume-blue-link">
          {mdMatch[1]}
        </a>
      );
    }
    if (/^https?:\/\//i.test(part.trim())) {
      return (
        <a key={i} href={part.trim()} target="_blank" rel="noreferrer" className="resume-blue-link">
          {part.trim().replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </a>
      );
    }
    return part;
  });
}

function Field({ label, value, onChange, placeholder = '', area = false, extra = null }) {
  return (
    <label className="field">
      <div className="field-header-row">
        <span>{label}</span>
        {extra}
      </div>
      {area ? (
        <textarea rows="3" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      ) : (
        <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </label>
  );
}

function Resume({ d }) {
  const p = d.personal || {};

  // Normalize skill categories: support skillCategories or fallback to skills array
  let skillCats = Array.isArray(d.skillCategories) && d.skillCategories.length > 0
    ? d.skillCategories.filter(sc => sc.category || sc.skills)
    : [];

  if (skillCats.length === 0 && Array.isArray(d.skills) && d.skills.length > 0) {
    const parsed = [];
    const plain = [];
    d.skills.forEach(s => {
      const idx = s.indexOf(':');
      if (idx > 0) {
        parsed.push({ category: s.slice(0, idx).trim(), skills: s.slice(idx + 1).trim() });
      } else {
        plain.push(s);
      }
    });
    if (parsed.length > 0) {
      skillCats = parsed;
      if (plain.length > 0) {
        skillCats.push({ category: 'Other Skills', skills: plain.join(', ') });
      }
    }
  }

  return (
    <article className="paper">
      {/* 1. Header: Name (bold uppercase), Location, Contact row with blue links */}
      <header className="resume-header">
        <h1 className="resume-name">{p.name || 'YOUR NAME'}</h1>
        {p.location && <div className="resume-location">{p.location}</div>}
        <div className="resume-contact">
          {p.phone && <span>{p.phone}</span>}
          {p.email && (
            <>
              {p.phone && <span className="sep">•</span>}
              <a href={`mailto:${p.email}`}>{p.email}</a>
            </>
          )}
          {p.portfolio && (
            <>
              {(p.phone || p.email) && <span className="sep">•</span>}
              <a href={p.portfolio.startsWith('http') ? p.portfolio : `https://${p.portfolio}`} target="_blank" rel="noreferrer">
                {p.portfolio.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </a>
            </>
          )}
          {p.github && (
            <>
              {(p.phone || p.email || p.portfolio) && <span className="sep">•</span>}
              <a href={p.github.startsWith('http') ? p.github : `https://github.com/${p.github.replace(/^GitHub:\s*/i, '')}`} target="_blank" rel="noreferrer">
                {p.github.includes('github.com/')
                  ? `GitHub: ${p.github.split('github.com/')[1]}`
                  : p.github.startsWith('GitHub:')
                  ? p.github
                  : `GitHub: ${p.github}`}
              </a>
            </>
          )}
          {p.linkedin && (
            <>
              {(p.phone || p.email || p.portfolio || p.github) && <span className="sep">•</span>}
              <a href={p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`} target="_blank" rel="noreferrer">
                {p.linkedin.includes('linkedin.com/in/')
                  ? `LinkedIn: ${p.linkedin.split('linkedin.com/in/')[1]}`
                  : p.linkedin}
              </a>
            </>
          )}
        </div>
      </header>

      {/* 2. OBJECTIVE: Royal blue uppercase title + full-width horizontal rule */}
      {p.summary && (
        <section className="resume-section">
          <div className="resume-section-head">
            <h2>OBJECTIVE</h2>
            <div className="resume-section-line" />
          </div>
          <p className="resume-objective-text">{p.summary}</p>
        </section>
      )}

      {/* 3. EDUCATION */}
      {d.education?.some(x => x.degree || x.institution) && (
        <section className="resume-section">
          <div className="resume-section-head">
            <h2>EDUCATION</h2>
            <div className="resume-section-line" />
          </div>
          {d.education.filter(x => x.degree || x.institution).map((x, i) => (
            <div className="resume-item" key={i}>
              <div className="resume-row">
                <b className="resume-item-title">{x.degree}</b>
                <span className="resume-item-date">{x.start}{x.end && ' – ' + x.end}</span>
              </div>
              <div className="resume-item-sub">
                {x.institution}{x.university && `, ${x.university}`}{x.location && `, ${x.location}`}
              </div>
              {x.grade && <div className="resume-item-sub italic">{x.grade}</div>}
            </div>
          ))}
        </section>
      )}

      {/* 4. RELEVANT PROJECTS (Matches PDF: right after Education!) */}
      {d.projects?.some(x => x.name || x.description) && (
        <section className="resume-section">
          <div className="resume-section-head">
            <h2>{d.projectsTitle || 'RELEVANT PROJECTS — SPEECH, NLP & AI'}</h2>
            <div className="resume-section-line" />
          </div>
          {d.projects.filter(x => x.name || x.description).map((x, i) => {
            const pipeIdx = (x.name || '').indexOf(' | ');
            const mainName = pipeIdx > 0 ? x.name.slice(0, pipeIdx) : x.name;
            const subtitleTag = pipeIdx > 0 ? x.name.slice(pipeIdx) : '';
            const bulletLines = (x.description || '')
              .split('\n')
              .map(l => l.trim())
              .filter(Boolean);

            return (
              <div className="resume-item" key={i}>
                <div className="resume-row">
                  <div className="resume-item-title">
                    {x.link ? (
                      <a href={x.link.startsWith('http') ? x.link : `https://${x.link}`} target="_blank" rel="noreferrer" className="resume-project-name">
                        {mainName}
                      </a>
                    ) : (
                      <span className="resume-project-name">{mainName}</span>
                    )}
                    {subtitleTag && <span>{subtitleTag}</span>}
                  </div>
                  {x.date && <span className="resume-item-date">{x.date}</span>}
                </div>
                {x.subtitle && <div className="resume-item-sub italic">{x.subtitle}</div>}
                {bulletLines.length > 0 && (
                  <ul className="resume-bullets">
                    {bulletLines.map((line, bIdx) => (
                      <li key={bIdx}>{renderRichText(line.replace(/^[•\-\*]\s*/, ''), x.link)}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* 5. TECHNICAL SKILLS: 2-Column Table (Matches PDF!) */}
      {(skillCats.length > 0 || (d.skills && d.skills.length > 0)) && (
        <section className="resume-section">
          <div className="resume-section-head">
            <h2>TECHNICAL SKILLS</h2>
            <div className="resume-section-line" />
          </div>
          {skillCats.length > 0 ? (
            <table className="resume-skills-table">
              <tbody>
                {skillCats.map((sc, i) => (
                  <tr key={i}>
                    <td className="skill-cat-cell">{sc.category}</td>
                    <td className="skill-val-cell">{sc.skills}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="resume-objective-text">{d.skills.join(' • ')}</p>
          )}
        </section>
      )}

      {/* 6. EXPERIENCE */}
      {d.experience?.some(x => x.role || x.company) && (
        <section className="resume-section">
          <div className="resume-section-head">
            <h2>EXPERIENCE</h2>
            <div className="resume-section-line" />
          </div>
          {d.experience.filter(x => x.role || x.company).map((x, i) => {
            const bulletLines = (x.details || '')
              .split('\n')
              .map(l => l.trim())
              .filter(Boolean);
            const dateStr = [x.start, x.end].filter(Boolean).join(' – ');

            return (
              <div className="resume-item" key={i}>
                <div className="resume-row">
                  <b className="resume-item-title">
                    {x.role} {x.company && '— ' + x.company}
                  </b>
                  {dateStr && <span className="resume-item-date">{dateStr}</span>}
                </div>
                {x.subtitle && <div className="resume-item-sub italic">{x.subtitle}</div>}
                {bulletLines.length > 0 && (
                  <ul className="resume-bullets">
                    {bulletLines.map((line, bIdx) => (
                      <li key={bIdx}>{renderRichText(line.replace(/^[•\-\*]\s*/, ''))}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* 7. CERTIFICATIONS (Optional, if exists) */}
      {d.certifications?.some(x => x.name) && (
        <section className="resume-section">
          <div className="resume-section-head">
            <h2>CERTIFICATIONS</h2>
            <div className="resume-section-line" />
          </div>
          <ul className="resume-bullets">
            {d.certifications.filter(x => x.name).map((x, i) => (
              <li key={i}>{x.name}{x.issuer ? ' — ' + x.issuer : ''}{x.date ? ' (' + x.date + ')' : ''}</li>
            ))}
          </ul>
        </section>
      )}

      {/* 8. PUBLICATIONS & ACHIEVEMENTS */}
      {d.achievements?.some(Boolean) && (
        <section className="resume-section">
          <div className="resume-section-head">
            <h2>{d.achievementsTitle || 'PUBLICATIONS & ACHIEVEMENTS'}</h2>
            <div className="resume-section-line" />
          </div>
          <ul className="resume-bullets">
            {d.achievements.filter(Boolean).map((x, i) => (
              <li key={i}>{renderRichText(x.replace(/^[•\-\*]\s*/, ''))}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

export default function App() {
  const [d, setD] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('sr-draft'));
      if (saved && saved.personal?.name && saved.personal?.name !== 'Alex Rivera' && saved.personal?.name !== 'YOUR NAME') {
        return saved;
      }
      return clone(kuvaleshResume);
    } catch {
      return clone(kuvaleshResume);
    }
  });

  const [page, setPage] = useState('home');
  const [step, setStep] = useState(0);
  const [skill, setSkill] = useState('');
  const [serverOnline, setServerOnline] = useState(false);
  const [savingCloud, setSavingCloud] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Modals
  const [showCloudModal, setShowCloudModal] = useState(false);
  const [showTplModal, setShowTplModal] = useState(false);
  const [showAtsModal, setShowAtsModal] = useState(false);
  const [showAiSummaryModal, setShowAiSummaryModal] = useState(false);
  const [showAiPolishModal, setShowAiPolishModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showGroqModal, setShowGroqModal] = useState(false);

  // Groq AI Builder State
  const [groqKey, setGroqKey] = useState(() => localStorage.getItem('sr-groq-key') || '');
  const [groqGithubUrl, setGroqGithubUrl] = useState('https://github.com/kuvaleshcd-hue');
  const [groqPrompt, setGroqPrompt] = useState('B.E. Information Science graduate at Ghousia College of Engineering. Hands-on experience in speech, NLP, and full-stack AI development. Built Sarvam VideoDubber for 16 Indian languages, VAANI Kannada voice assistant with LLaMA 3, Hanu Agri ML system, and Full Stack AI Developer intern at OmniIDE.');
  const [groqTargetRole, setGroqTargetRole] = useState('Full Stack AI Developer');
  const [groqCandidateName, setGroqCandidateName] = useState('KUVALESH C D');
  const [groqLoading, setGroqLoading] = useState(false);
  const [groqError, setGroqError] = useState('');

  // Data states
  const [cloudResumes, setCloudResumes] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [atsReport, setAtsReport] = useState(null);
  const [atsLoading, setAtsLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [summaryOptions, setSummaryOptions] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [polishTarget, setPolishTarget] = useState({ path: null, label: '', text: '' });
  const [polishOptions, setPolishOptions] = useState([]);
  const [polishLoading, setPolishLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('sr-draft', JSON.stringify(d));
  }, [d]);

  // Ping backend health
  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        setServerOnline(true);
      } else {
        setServerOnline(false);
      }
    } catch {
      setServerOnline(false);
    }
  };

  const showToast = msg => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const upd = (path, val) => setD(old => {
    const n = clone(old);
    let o = n;
    path.slice(0, -1).forEach(k => o = o[k]);
    o[path.at(-1)] = val;
    return n;
  });

  const add = (key, item) => setD(old => ({ ...old, [key]: [...(old[key] || []), clone(item)] }));
  const del = (key, i) => setD(old => ({ ...old, [key]: old[key].filter((_, j) => i !== j) }));

  const field = (label, path, placeholder = '', extra = null) => (
    <Field
      label={label}
      value={path.reduce((o, k) => o?.[k], d)}
      placeholder={placeholder}
      onChange={v => upd(path, v)}
      extra={extra}
    />
  );

  const area = (label, path, placeholder = '', extra = null) => (
    <Field
      area
      label={label}
      value={path.reduce((o, k) => o?.[k], d)}
      placeholder={placeholder}
      onChange={v => upd(path, v)}
      extra={extra}
    />
  );

  // --- Backend Actions ---
  const saveToCloud = async () => {
    setSavingCloud(true);
    try {
      const payload = {
        ...d,
        title: d.title || (d.personal?.name ? `${d.personal.name}'s Resume` : 'Untitled Resume')
      };
      const method = d.id ? 'PUT' : 'POST';
      const url = d.id ? `/api/resumes/${d.id}` : '/api/resumes';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const saved = await res.json();
        setD(saved);
        showToast('✓ Saved to Cloud Database!');
        loadCloudResumes();
      } else {
        showToast('Error saving to cloud');
      }
    } catch {
      showToast('Could not connect to server');
    } finally {
      setSavingCloud(false);
    }
  };

  const loadCloudResumes = async () => {
    try {
      const res = await fetch('/api/resumes');
      if (res.ok) {
        const data = await res.json();
        setCloudResumes(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openCloudManager = () => {
    loadCloudResumes();
    setShowCloudModal(true);
  };

  const deleteResume = async id => {
    if (!confirm('Are you sure you want to delete this saved resume?')) return;
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Resume deleted');
        loadCloudResumes();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const duplicateResume = async id => {
    try {
      const res = await fetch(`/api/resumes/${id}/duplicate`, { method: 'POST' });
      if (res.ok) {
        showToast('Resume duplicated');
        loadCloudResumes();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openTemplates = async () => {
    try {
      const res = await fetch('/api/templates');
      if (res.ok) {
        const data = await res.json();
        setTemplates(data);
      }
    } catch (e) {
      console.error(e);
    }
    setShowTplModal(true);
  };

  const loadTemplate = async id => {
    try {
      const res = await fetch(`/api/templates/${id}`);
      if (res.ok) {
        const tpl = await res.json();
        const loaded = clone(tpl);
        delete loaded.id;
        setD(loaded);
        setShowTplModal(false);
        showToast(`✓ Loaded template: ${tpl.title}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- ATS Scanner Action ---
  const runAtsScan = async () => {
    setAtsLoading(true);
    setShowAtsModal(true);
    try {
      const res = await fetch('/api/ats/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: d, jobDescription })
      });
      if (res.ok) {
        const report = await res.json();
        setAtsReport(report);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAtsLoading(false);
    }
  };

  // --- AI Summary Trigger ---
  const triggerAiSummary = async () => {
    setSummaryLoading(true);
    setShowAiSummaryModal(true);
    try {
      const res = await fetch('/api/ai/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: d.personal?.title || 'Software Developer',
          skills: d.skills || [],
          name: d.personal?.name || ''
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSummaryOptions(data.options || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSummaryLoading(false);
    }
  };

  // --- AI Polish Trigger ---
  const triggerAiPolish = async (path, label) => {
    const text = path.reduce((o, k) => o?.[k], d) || '';
    setPolishTarget({ path, label, text });
    setPolishLoading(true);
    setShowAiPolishModal(true);
    try {
      const res = await fetch('/api/ai/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          role: d.personal?.title || '',
          tech: d.skills?.slice(0, 4).join(', ') || ''
        })
      });
      if (res.ok) {
        const data = await res.json();
        setPolishOptions(data.suggestions || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPolishLoading(false);
    }
  };

  // --- AI Skills Trigger ---
  const triggerAiSkills = async () => {
    setShowSkillsModal(true);
    try {
      const res = await fetch('/api/ai/suggest-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: d.personal?.title || '',
          currentSkills: d.skills || []
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSuggestedSkills(data.suggestedSkills || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- Build with Groq LPU AI ---
  const buildWithGroq = async (e) => {
    if (e) e.preventDefault();
    setGroqLoading(true);
    setGroqError('');
    try {
      const res = await fetch('/api/ai/build-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          githubUrl: groqGithubUrl,
          prompt: groqPrompt,
          apiKey: groqKey,
          targetRole: groqTargetRole,
          candidateName: groqCandidateName
        })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Groq failed to generate resume');
      }
      if (groqKey) {
        localStorage.setItem('sr-groq-key', groqKey);
      }
      setD(clone(data.resume));
      setShowGroqModal(false);
      showToast('⚡ Resume successfully generated with Groq AI!');
      setPage('builder');
      setStep(0);
    } catch (err) {
      setGroqError(err.message || 'Error communicating with Groq API');
    } finally {
      setGroqLoading(false);
    }
  };

  // --- Export Plain Text ---
  const copyPlainText = async () => {
    try {
      const res = await fetch('/api/export/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d)
      });
      if (res.ok) {
        const text = await res.text();
        await navigator.clipboard.writeText(text);
        showToast('✓ Plain-text resume copied to clipboard!');
      }
    } catch {
      showToast('Export failed');
    }
  };

  const downloadJsonBackup = async () => {
    try {
      const res = await fetch('/api/export/json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d)
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(d.personal?.name || 'resume').toLowerCase().replace(/\s+/g, '_')}_backup.json`;
        a.click();
        showToast('✓ JSON backup downloaded');
      }
    } catch {
      showToast('Backup download failed');
    }
  };

  const repeat = (key, title, template, fields) => (
    <div className="block">
      <div className="blockhead">
        <h3>{title}</h3>
        <button className="link" onClick={() => add(key, template)}><Plus size={15} /> Add another</button>
      </div>
      {d[key].map((x, i) => (
        <div className="repeat" key={i}>
          <div className="repeathead">
            <b>{title} {i + 1}</b>
            {d[key].length > 1 && (
              <button className="icon" onClick={() => del(key, i)}><Trash2 size={15} /></button>
            )}
          </div>
          <div className="grid">{fields(i)}</div>
        </div>
      ))}
    </div>
  );

  const content = () => {
    // 0: Personal
    if (step === 0) return (
      <div className="grid">
        {field('Full name', ['personal', 'name'], 'KUVALESH C D')}
        {field('Professional title', ['personal', 'title'], 'Full Stack AI Developer')}
        {field('Location', ['personal', 'location'], 'Bengaluru, Karnataka')}
        {field('Phone', ['personal', 'phone'], '+91 73383 74900')}
        {field('Email', ['personal', 'email'], 'kuvaleshcd@gmail.com')}
        {field('Portfolio / Website URL', ['personal', 'portfolio'], 'https://kuvalesh.netlify.app')}
        {field('GitHub username / link', ['personal', 'github'], 'kuvaleshcd-hue')}
        {field('LinkedIn URL (optional)', ['personal', 'linkedin'], 'https://linkedin.com/in/...')}
        <div className="wide">
          {area(
            'OBJECTIVE',
            ['personal', 'summary'],
            'Clear career objective highlighting your background, aspirations, and value to employers',
            <button className="ai-trigger" type="button" onClick={triggerAiSummary}>
              <Sparkles size={12} /> AI Objective
            </button>
          )}
        </div>
      </div>
    );

    // 1: Education
    if (step === 1) return repeat(
      'education', 'Education',
      { degree: '', institution: '', university: '', location: '', start: '', end: '', grade: '' },
      i => (
        <>
          {field('Degree / Qualification', ['education', i, 'degree'], 'B.E. Information Science')}
          {field('Institution / College', ['education', i, 'institution'], 'Ghousia College of Engineering, VTU, Bengaluru')}
          {field('Start year', ['education', i, 'start'], '2023')}
          {field('End year', ['education', i, 'end'], '2027')}
          {field('University / Board (optional)', ['education', i, 'university'], 'VTU')}
          {field('Location (optional)', ['education', i, 'location'], 'Bengaluru')}
          {field('Grade / Percentage (optional)', ['education', i, 'grade'], 'CGPA or Percentage')}
        </>
      )
    );

    // 2: Relevant Projects (Placed right after Education, matching PDF!)
    if (step === 2) return (
      <>
        <div style={{ marginBottom: 18 }}>
          {field('Projects Section Title', ['projectsTitle'], 'RELEVANT PROJECTS — SPEECH, NLP & AI')}
        </div>
        {repeat(
          'projects', 'Project',
          { name: '', date: '', subtitle: '', link: '', description: '' },
          i => (
            <>
              {field('Project Title & Tagline', ['projects', i, 'name'], 'Sarvam VideoDubber | AI Multi-language Video Dubbing Pipeline')}
              {field('Date / Duration', ['projects', i, 'date'], '2025 – 2026')}
              <div className="wide">
                {field('Hackathon / Award / Subtitle', ['projects', i, 'subtitle'], "Sarvam AI BuildIn' Hours Hackathon — Shortlisted for offline round, Bengaluru")}
              </div>
              <div className="wide">
                {field('Project Link (GitHub / Live Demo)', ['projects', i, 'link'], 'https://github.com/kuvaleshcd-hue/Sarvam-VideoDubber')}
              </div>
              <div className="wide">
                {area(
                  'Bullet Points & Outcomes (One bullet per line)',
                  ['projects', i, 'description'],
                  "• End-to-end dubbing pipeline: Saaras v3 (STT) → Sarvam-Translate → Bulbul v3 (TTS)\n• Built advanced audio processing with FFmpeg atempo sync\n• Deployed on Streamlit Cloud • GitHub",
                  <button
                    className="ai-trigger"
                    type="button"
                    onClick={() => triggerAiPolish(['projects', i, 'description'], `Project: ${d.projects[i]?.name || 'Project'}`)}
                  >
                    <Sparkles size={12} /> AI Polish (STAR)
                  </button>
                )}
              </div>
            </>
          )
        )}
      </>
    );

    // 3: Technical Skills Table (Matches PDF table layout!)
    if (step === 3) return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <b>Technical Skill Categories</b>
            <p className="hint" style={{ margin: '3px 0 0' }}>Organize skills by category for the professional 2-column resume table.</p>
          </div>
          <button className="ai-trigger" type="button" onClick={triggerAiSkills}>
            <Sparkles size={12} /> AI Suggest Skills
          </button>
        </div>

        {/* Skill Categories Table Editor */}
        <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
          {(d.skillCategories || []).map((sc, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 34px', gap: 8, alignItems: 'center', background: '#f8fafc', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <input
                value={sc.category}
                onChange={e => {
                  const copy = clone(d.skillCategories || []);
                  copy[i].category = e.target.value;
                  upd(['skillCategories'], copy);
                }}
                placeholder="Category (e.g. Speech & Audio)"
                style={{ fontWeight: 700, fontSize: 11 }}
              />
              <input
                value={sc.skills}
                onChange={e => {
                  const copy = clone(d.skillCategories || []);
                  copy[i].skills = e.target.value;
                  upd(['skillCategories'], copy);
                }}
                placeholder="Comma-separated skills (e.g. Python, FastAPI, Docker)"
                style={{ fontSize: 11 }}
              />
              <button
                className="icon"
                type="button"
                title="Remove Category"
                onClick={() => {
                  const copy = (d.skillCategories || []).filter((_, j) => j !== i);
                  upd(['skillCategories'], copy);
                }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="secondary"
            style={{ justifySelf: 'flex-start', fontSize: 11, padding: '7px 12px' }}
            onClick={() => {
              const copy = clone(d.skillCategories || []);
              copy.push({ category: 'Category Name', skills: '' });
              upd(['skillCategories'], copy);
            }}
          >
            <Plus size={13} /> Add Skill Category Row
          </button>
        </div>

        {/* Quick individual skills */}
        <div>
          <b>Quick Skills / Tags (Optional)</b>
          <div className="skillrow" style={{ marginTop: 8 }}>
            <input
              value={skill}
              onChange={e => setSkill(e.target.value)}
              placeholder="e.g. React, Node.js, Docker, PyTorch"
              onKeyDown={e => {
                if (e.key === 'Enter' && skill.trim()) {
                  upd(['skills'], [...(d.skills || []), skill.trim()]);
                  setSkill('');
                }
              }}
            />
            <button className="primary" type="button" onClick={() => {
              if (skill.trim()) {
                upd(['skills'], [...(d.skills || []), skill.trim()]);
                setSkill('');
              }
            }}>Add</button>
          </div>
          <div className="chips">
            {d.skills?.map((s, i) => (
              <span key={i}>
                {s}
                <button type="button" onClick={() => upd(['skills'], d.skills.filter((_, j) => j !== i))}>×</button>
              </span>
            ))}
          </div>
        </div>
      </>
    );

    // 4: Experience
    if (step === 4) return (
      <>
        <p className="hint">Include internships, startup roles, or full-time experience.</p>
        {repeat(
          'experience', 'Experience',
          { role: '', company: '', start: '', end: '', subtitle: '', details: '' },
          i => (
            <>
              {field('Job Title / Role', ['experience', i, 'role'], 'Full Stack AI Developer Intern')}
              {field('Company & Location', ['experience', i, 'company'], 'OmniIDE, Bengaluru')}
              {field('Start date', ['experience', i, 'start'], '2026 / May 2026')}
              {field('End date', ['experience', i, 'end'], 'Present / Jul 2026')}
              <div className="wide">
                {field('Subtitle / Highlight / Award', ['experience', i, 'subtitle'], 'Early-stage startup building open-source local-native AI infrastructure')}
              </div>
              <div className="wide">
                {area(
                  'Responsibilities & Results (One bullet per line)',
                  ['experience', i, 'details'],
                  "• Contributing to AI agent orchestration and developer tooling for local LLM deployment\n• Working directly with the founder on system architecture",
                  <button
                    className="ai-trigger"
                    type="button"
                    onClick={() => triggerAiPolish(['experience', i, 'details'], `Experience: ${d.experience[i]?.role || 'Role'}`)}
                  >
                    <Sparkles size={12} /> AI Polish (STAR)
                  </button>
                )}
              </div>
            </>
          )
        )}
      </>
    );

    // 5: Publications & Achievements (Matches PDF!)
    return (
      <div className="block">
        <div style={{ marginBottom: 18 }}>
          {field('Achievements Section Title', ['achievementsTitle'], 'PUBLICATIONS & ACHIEVEMENTS')}
        </div>
        <div className="blockhead">
          <h3>Publications, Awards & Certifications</h3>
          <button className="link" type="button" onClick={() => add('achievements', '')}><Plus size={15} /> Add another</button>
        </div>
        <p className="hint" style={{ marginBottom: 12 }}>Include published papers, hackathon recognitions, incubation shortlists, certifications, or competitive exam goals.</p>
        {d.achievements?.map((x, i) => (
          <div className="skillrow" key={i}>
            <input
              value={x}
              onChange={e => upd(['achievements', i], e.target.value)}
              placeholder="e.g. IEEE INDICON 2026 paper: 'Low-Resource Multilingual AI Video Dubbing' or Hackathon Winner"
            />
            {d.achievements.length > 1 && (
              <button className="icon" type="button" onClick={() => del('achievements', i)}><Trash2 size={15} /></button>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="app">
      {/* Toast */}
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          background: '#14532d', color: '#fff', padding: '12px 20px',
          borderRadius: 8, fontSize: 13, fontWeight: 600, boxShadow: '0 10px 30px #00000030'
        }}>
          {toastMsg}
        </div>
      )}

      {/* Top Navbar */}
      <header className="top">
        <button className="brand" onClick={() => setPage('home')}>
          <span className="logo"><FileText /></span>
          smart<span>resume</span>
        </button>

        <div className="topright">
          <div className="backend-pill">
            <span className="pulse-dot" style={{ background: serverOnline ? '#10b981' : '#f59e0b' }} />
            <span>{serverOnline ? 'Backend Online (Port 5001)' : 'Offline Local Mode'}</span>
          </div>

          <button className="btn-chip" onClick={openCloudManager}>
            <Cloud size={14} /> My Resumes
          </button>

          <button className="btn-chip" onClick={openTemplates}>
            <FolderOpen size={14} /> Templates
          </button>

          <button
            className="btn-chip"
            style={{ borderColor: '#1d4ed8', color: '#1d4ed8', fontWeight: 600 }}
            onClick={() => {
              setD(clone(kuvaleshResume));
              showToast('✓ Loaded Kuvalesh C D Format');
            }}
          >
            <Sparkles size={14} /> Kuvalesh Format
          </button>

          <button
            className="btn-chip"
            style={{ background: '#f5f3ff', borderColor: '#8b5cf6', color: '#6d28d9', fontWeight: 700 }}
            onClick={() => setShowGroqModal(true)}
          >
            <Sparkles size={14} /> ⚡ Groq AI Builder
          </button>

          <button className="btn-chip highlight" onClick={runAtsScan}>
            <BarChart3 size={14} /> ATS Scanner
          </button>

          <button className="secondary" onClick={() => setPage('preview')}>Preview</button>
        </div>
      </header>

      {/* Home View */}
      {page === 'home' && (
        <main className="hero">
          <div className="pill"><Sparkles size={14} /> Powered by Groq LPU AI & ATS Intelligence</div>
          <h1>Make your experience<br /><em>stand out.</em></h1>
          <p>Create a polished, recruiter-ready resume one simple step at a time. Backed by persistent storage, real-time ATS scoring, and high-speed Groq AI assistance.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 25, flexWrap: 'wrap' }}>
            <button
              className="primary big"
              style={{
                marginTop: 0,
                background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
                borderColor: '#6d28d9',
                boxShadow: '0 8px 24px rgba(124, 58, 237, 0.3)'
              }}
              onClick={() => setShowGroqModal(true)}
            >
              <Sparkles size={18} /> ⚡ Build with Groq AI (GitHub/Link)
            </button>
            <button className="primary big" style={{ marginTop: 0 }} onClick={() => setPage('types')}>
              Manual Builder <ArrowRight size={18} />
            </button>
            <button className="secondary big" style={{ marginTop: 0 }} onClick={openTemplates}>
              <FolderOpen size={16} /> Load Starter Template
            </button>
          </div>
          <div className="benefits">
            <span><Check /> Persistent Backend Storage</span>
            <span><Check /> ATS Score & Keyword Match</span>
            <span><Check /> AI STAR-Format Polish</span>
            <span><Check /> PDF & Plain-Text Export</span>
          </div>
          <div className="hero-paper"><Resume d={d} /></div>
        </main>
      )}

      {/* Types View */}
      {page === 'types' && (
        <main className="typespage">
          <button className="back" onClick={() => setPage('home')}><ArrowLeft size={15} /> Back home</button>
          <div className="center">
            <small>STEP 01</small>
            <h1>What kind of resume<br />are you creating?</h1>
            <p>Choose a target category. You can customize every section in the builder.</p>
          </div>
          <div className="typegrid" style={types.length === 1 ? { display: 'flex', justifyContent: 'center' } : {}}>
            {types.map(t => (
              <button
                key={t}
                className={d.type === t ? 'type selected' : 'type'}
                style={types.length === 1 ? { maxWidth: 360, width: '100%' } : {}}
                onClick={() => upd(['type'], t)}
              >
                <FileText />
                <b>{t}</b>
                <small>Simple and recruiter-readable</small>
                {d.type === t && <Check className="tick" />}
              </button>
            ))}
          </div>
          <div className="bottom">
            <span>Selected: <b>{d.type}</b></span>
            <button className="primary" onClick={() => { setPage('builder'); setStep(0); }}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </main>
      )}

      {/* Builder View */}
      {page === 'builder' && (
        <main className="builder">
          <aside className="side">
            <div className="eyebrow">YOUR RESUME</div>
            <h2>Build your story</h2>
            <p>Complete the sections that showcase your capabilities.</p>
            <nav>
              {steps.map((s, i) => (
                <button
                  key={s}
                  className={i === step ? 'navactive' : ''}
                  onClick={() => setStep(i)}
                >
                  {i < step ? <Check size={15} /> : <span>{String(i + 1).padStart(2, '0')}</span>}
                  {s}
                </button>
              ))}
              <button onClick={() => setPage('preview')}>↗ Review & export</button>
            </nav>
            <div className="tip">
              <b>ATS Tip:</b> Quantify results where possible (e.g. "reduced latency by 35%"). Click the <b>ATS Scanner</b> button anytime to audit your score.
            </div>
          </aside>

          <section className="editor">
            <div className="edithead">
              <div>
                <small>STEP {step + 2} OF {steps.length + 1}</small>
                <h1>{steps[step]}</h1>
                <p>Add your {steps[step].toLowerCase()} information below.</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="secondary" onClick={saveToCloud} disabled={savingCloud}>
                  <Cloud size={14} /> {savingCloud ? 'Saving...' : 'Save to Cloud'}
                </button>
                <button className="primary" onClick={() => setPage('preview')}>Preview</button>
              </div>
            </div>

            <div className="form">
              {content()}
              <div className="actions">
                <button className="secondary" disabled={step === 0} onClick={() => setStep(s => s - 1)}>
                  <ArrowLeft size={15} /> Back
                </button>
                <button className="primary" onClick={() => step === steps.length - 1 ? setPage('preview') : setStep(s => s + 1)}>
                  Continue <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </section>

          <aside className="preview">
            <div className="previewlabel">LIVE PREVIEW</div>
            <Resume d={d} />
            <p>Updates live as you type.</p>
            <button className="primary fullbtn" onClick={() => setPage('preview')}>Review & export</button>
          </aside>
        </main>
      )}

      {/* Review View */}
      {page === 'preview' && (
        <main className="review">
          <button className="back" onClick={() => setPage('builder')}><ArrowLeft size={15} /> Back to editor</button>
          <div className="reviewtitle">
            <small>FINAL REVIEW & EXPORT</small>
            <h1>Your resume is ready</h1>
            <p>Audit with the ATS Scanner, verify dates and links, then export in your preferred format.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 15, flexWrap: 'wrap' }}>
              <button className="primary" onClick={() => window.print()}>
                <Download size={16} /> Download / Save PDF
              </button>
              <button className="secondary" onClick={copyPlainText}>
                <Copy size={15} /> Copy Plain Text (ATS)
              </button>
              <button className="secondary" onClick={downloadJsonBackup}>
                <FileCode size={15} /> Export JSON Backup
              </button>
              <button className="secondary" onClick={saveToCloud} disabled={savingCloud}>
                <Cloud size={15} /> Save to Cloud
              </button>
            </div>
          </div>
          <Resume d={d} />
        </main>
      )}

      {/* Footer */}
      <footer>
        <b>smartresume ai</b>
        <span>Connected backend persistence, ATS audit engine, and AI polish tools.</span>
        <button onClick={() => {
          if (confirm('Clear your local draft and reset?')) {
            localStorage.removeItem('sr-draft');
            setD(clone(blank));
            setPage('home');
          }
        }}>
          Reset draft
        </button>
      </footer>

      {/* --- MODAL 1: Cloud Resumes Manager --- */}
      {showCloudModal && (
        <div className="modal-backdrop" onClick={() => setShowCloudModal(false)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2><Cloud size={18} /> Cloud Resume Storage</h2>
              <button className="modal-close" onClick={() => setShowCloudModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: 0, fontSize: 12, color: '#627267' }}>
                  Resumes are securely persisted to the backend server database.
                </p>
                <button className="primary" onClick={saveToCloud} disabled={savingCloud} style={{ fontSize: 11, padding: '7px 14px' }}>
                  <Plus size={13} /> Save Current as New
                </button>
              </div>

              <div className="cloud-grid">
                {cloudResumes.length === 0 ? (
                  <div style={{ padding: 30, textAlign: 'center', color: '#88968d', fontSize: 12 }}>
                    No resumes saved yet. Click "Save Current as New" to store this resume!
                  </div>
                ) : (
                  cloudResumes.map(r => (
                    <div className="cloud-item" key={r.id}>
                      <div className="cloud-info">
                        <b>{r.title || r.personal?.name || 'Untitled Resume'}</b>
                        <small>Type: {r.type} • Last updated: {new Date(r.updatedAt || r.createdAt).toLocaleDateString()}</small>
                      </div>
                      <div className="cloud-actions">
                        <button
                          className="btn-chip"
                          onClick={() => {
                            setD(clone(r));
                            setShowCloudModal(false);
                            showToast(`Loaded "${r.title}"`);
                          }}
                        >
                          Load
                        </button>
                        <button className="icon" title="Duplicate" onClick={() => duplicateResume(r.id)}>
                          <Copy size={13} />
                        </button>
                        <button className="icon" title="Delete" onClick={() => deleteResume(r.id)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary" onClick={() => setShowCloudModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: Template Library --- */}
      {showTplModal && (
        <div className="modal-backdrop" onClick={() => setShowTplModal(false)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2><FolderOpen size={18} /> Starter Resume Templates</h2>
              <button className="modal-close" onClick={() => setShowTplModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p style={{ margin: 0, fontSize: 12, color: '#627267' }}>
                Load complete, professionally structured profiles with real achievements and skills:
              </p>
              <div className="cloud-grid">
                {templates.map(tpl => (
                  <div className="cloud-item" key={tpl.id}>
                    <div className="cloud-info">
                      <b>{tpl.title}</b>
                      <small>{tpl.name} • {tpl.role} ({tpl.skillsCount} skills)</small>
                    </div>
                    <button className="primary" style={{ fontSize: 11, padding: '7px 14px' }} onClick={() => loadTemplate(tpl.id)}>
                      Load Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary" onClick={() => setShowTplModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: ATS Score & Scanner --- */}
      {showAtsModal && (
        <div className="modal-backdrop" onClick={() => setShowAtsModal(false)}>
          <div className="modal-window" style={{ maxWidth: 740 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2><BarChart3 size={18} /> ATS Resume Audit & Scanner</h2>
              <button className="modal-close" onClick={() => setShowAtsModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              {atsLoading ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#087b52', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <RefreshCw className="spin" size={28} />
                  <b>Analyzing resume structure, action verbs, metrics, and keyword density...</b>
                </div>
              ) : atsReport ? (
                <>
                  <div className="ats-hero">
                    <div className="ats-score-circle">
                      <b>{atsReport.score}</b>
                      <span>OUT OF 100</span>
                    </div>
                    <div className="ats-hero-text">
                      <h3>ATS Grade: {atsReport.grade}</h3>
                      <p>
                        {atsReport.score >= 85
                          ? 'Outstanding! Your resume is strongly formatted for applicant tracking systems and recruiter screens.'
                          : atsReport.score >= 70
                          ? 'Competitive foundation with strong points, but addressing the recommendations below will significantly increase interview callbacks.'
                          : 'Needs attention. Several essential sections or quantifiable metrics are missing.'}
                      </p>
                    </div>
                  </div>

                  <div className="ats-breakdowns">
                    <div className="breakdown-item">
                      <div className="breakdown-row">
                        <span>Contact & Profile Links</span>
                        <span>{atsReport.breakdown.contact.score} / {atsReport.breakdown.contact.max}</span>
                      </div>
                      <div className="breakdown-bar">
                        <div className="breakdown-fill" style={{ width: `${(atsReport.breakdown.contact.score / atsReport.breakdown.contact.max) * 100}%` }} />
                      </div>
                    </div>
                    <div className="breakdown-item">
                      <div className="breakdown-row">
                        <span>Structure & Completeness</span>
                        <span>{atsReport.breakdown.sections.score} / {atsReport.breakdown.sections.max}</span>
                      </div>
                      <div className="breakdown-bar">
                        <div className="breakdown-fill" style={{ width: `${(atsReport.breakdown.sections.score / atsReport.breakdown.sections.max) * 100}%` }} />
                      </div>
                    </div>
                    <div className="breakdown-item">
                      <div className="breakdown-row">
                        <span>Action Verbs ({atsReport.stats.actionVerbCount} found)</span>
                        <span>{atsReport.breakdown.actionVerbs.score} / {atsReport.breakdown.actionVerbs.max}</span>
                      </div>
                      <div className="breakdown-bar">
                        <div className="breakdown-fill" style={{ width: `${(atsReport.breakdown.actionVerbs.score / atsReport.breakdown.actionVerbs.max) * 100}%` }} />
                      </div>
                    </div>
                    <div className="breakdown-item">
                      <div className="breakdown-row">
                        <span>Measurable Metrics ({atsReport.stats.metricCount} found)</span>
                        <span>{atsReport.breakdown.metrics.score} / {atsReport.breakdown.metrics.max}</span>
                      </div>
                      <div className="breakdown-bar">
                        <div className="breakdown-fill" style={{ width: `${(atsReport.breakdown.metrics.score / atsReport.breakdown.metrics.max) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Job Description Matching */}
                  <div style={{ background: '#f8faf9', padding: 14, borderRadius: 10, border: '1px solid #e2e8e3' }}>
                    <b style={{ fontSize: 12, display: 'block', marginBottom: 6 }}>Target Job Description Matcher:</b>
                    <textarea
                      rows="2"
                      value={jobDescription}
                      onChange={e => setJobDescription(e.target.value)}
                      placeholder="Paste target job posting description here to test keyword alignment..."
                      style={{ width: '100%', fontSize: 11, padding: 8, borderRadius: 6, border: '1px solid #d5ded7' }}
                    />
                    <button
                      className="primary"
                      style={{ marginTop: 8, fontSize: 11, padding: '6px 12px' }}
                      onClick={runAtsScan}
                    >
                      Compare Keyword Gap
                    </button>

                    {atsReport.jobMatch && (
                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#0b7d53', marginBottom: 6 }}>
                          Match Alignment: {atsReport.jobMatch.matchPercentage}%
                        </div>
                        {atsReport.jobMatch.matchedKeywords?.length > 0 && (
                          <div>
                            <small style={{ color: '#166534', fontWeight: 600 }}>Matched Keywords:</small>
                            <div className="keyword-wrap">
                              {atsReport.jobMatch.matchedKeywords.map((k, i) => (
                                <span className="kw-match" key={i}>✓ {k}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {atsReport.jobMatch.missingKeywords?.length > 0 && (
                          <div style={{ marginTop: 8 }}>
                            <small style={{ color: '#991b1b', fontWeight: 600 }}>Missing in Resume:</small>
                            <div className="keyword-wrap">
                              {atsReport.jobMatch.missingKeywords.map((k, i) => (
                                <span className="kw-missing" key={i}>+ {k}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Strengths & Improvements */}
                  <div>
                    <b style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Identified Strengths:</b>
                    <div style={{ display: 'grid', gap: 6 }}>
                      {atsReport.strengths.map((str, i) => (
                        <div className="rec-card strength" key={i}>✓ {str}</div>
                      ))}
                    </div>
                  </div>

                  {atsReport.improvements?.length > 0 && (
                    <div>
                      <b style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Recommended Actions:</b>
                      <div style={{ display: 'grid', gap: 6 }}>
                        {atsReport.improvements.map((rec, i) => (
                          <div className={`rec-card ${rec.impact}`} key={i}>
                            <b>[{rec.section}]</b> {rec.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>
            <div className="modal-footer">
              <button className="primary" onClick={runAtsScan}><RefreshCw size={14} /> Re-scan</button>
              <button className="secondary" onClick={() => setShowAtsModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 4: AI Summary Generator --- */}
      {showAiSummaryModal && (
        <div className="modal-backdrop" onClick={() => setShowAiSummaryModal(false)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2><Sparkles size={18} /> AI Career Objective Generator</h2>
              <button className="modal-close" onClick={() => setShowAiSummaryModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p style={{ margin: 0, fontSize: 12, color: '#627267' }}>
                Select a crafted career objective tailored for your role and skillset:
              </p>
              {summaryLoading ? (
                <div style={{ padding: 30, textAlign: 'center', color: '#7e22ce' }}>Generating tailored career objectives...</div>
              ) : (
                <div style={{ display: 'grid', gap: 12 }}>
                  {summaryOptions.map((opt, i) => (
                    <div className="ai-card" key={i}>
                      <div className="ai-card-title">
                        <span>{opt.title}</span>
                      </div>
                      <div className="ai-card-text">{opt.summary}</div>
                      <button
                        className="ai-card-apply"
                        onClick={() => {
                          upd(['personal', 'summary'], opt.summary);
                          setShowAiSummaryModal(false);
                          showToast('✓ Career objective applied to resume');
                        }}
                      >
                        Use this objective
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="secondary" onClick={() => setShowAiSummaryModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 5: AI Polish / Bullet Point Enhancer --- */}
      {showAiPolishModal && (
        <div className="modal-backdrop" onClick={() => setShowAiPolishModal(false)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2><Sparkles size={18} /> AI STAR-Format Enhancer</h2>
              <button className="modal-close" onClick={() => setShowAiPolishModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div style={{ background: '#f5f7f5', padding: 10, borderRadius: 8, fontSize: 11 }}>
                <b>Original text:</b> {polishTarget.text || '(empty)'}
              </div>
              <p style={{ margin: 0, fontSize: 12, color: '#627267' }}>
                Select a high-impact, quantified STAR-format rewrite:
              </p>
              {polishLoading ? (
                <div style={{ padding: 30, textAlign: 'center', color: '#7e22ce' }}>Enhancing with action verbs and metrics...</div>
              ) : (
                <div style={{ display: 'grid', gap: 12 }}>
                  {polishOptions.map((opt, i) => (
                    <div className="ai-card" key={i}>
                      <div className="ai-card-title">Option {i + 1}</div>
                      <div className="ai-card-text">{opt}</div>
                      <button
                        className="ai-card-apply"
                        onClick={() => {
                          upd(polishTarget.path, opt);
                          setShowAiPolishModal(false);
                          showToast('✓ Updated with AI polished bullet');
                        }}
                      >
                        Apply to Resume
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="secondary" onClick={() => setShowAiPolishModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 6: AI Skill Suggestions --- */}
      {showSkillsModal && (
        <div className="modal-backdrop" onClick={() => setShowSkillsModal(false)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2><Sparkles size={18} /> AI Skill Recommendations</h2>
              <button className="modal-close" onClick={() => setShowSkillsModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p style={{ margin: 0, fontSize: 12, color: '#627267' }}>
                Recommended skills based on your role (<b>{d.personal?.title || 'Developer'}</b>):
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {suggestedSkills.map((sk, i) => (
                  <button
                    key={i}
                    className="btn-chip"
                    onClick={() => {
                      if (!d.skills?.includes(sk)) {
                        upd(['skills'], [...(d.skills || []), sk]);
                        setSuggestedSkills(s => s.filter(item => item !== sk));
                        showToast(`Added ${sk}`);
                      }
                    }}
                  >
                    + {sk}
                  </button>
                ))}
              </div>
              {suggestedSkills.length > 0 && (
                <button
                  className="primary"
                  style={{ alignSelf: 'flex-start', marginTop: 10, fontSize: 11 }}
                  onClick={() => {
                    const merged = Array.from(new Set([...(d.skills || []), ...suggestedSkills]));
                    upd(['skills'], merged);
                    setShowSkillsModal(false);
                    showToast('✓ Added all recommended skills');
                  }}
                >
                  Add All Recommended Skills
                </button>
              )}
            </div>
            <div className="modal-footer">
              <button className="secondary" onClick={() => setShowSkillsModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 7: Groq AI Auto-Resume Builder (LLaMA 3.3 70B) --- */}
      {showGroqModal && (
        <div className="modal-backdrop" onClick={() => !groqLoading && setShowGroqModal(false)}>
          <div className="modal-window" style={{ maxWidth: 660 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <Sparkles size={18} style={{ color: '#7c3aed' }} /> Groq AI Auto-Resume Builder (LPU High-Speed)
              </h2>
              <button className="modal-close" onClick={() => !groqLoading && setShowGroqModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={buildWithGroq}>
              <div className="modal-body">
                <div style={{
                  background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '12px 14px',
                  borderRadius: 8, fontSize: 11, color: '#5b21b6', lineHeight: 1.5, marginBottom: 16
                }}>
                  <b>⚡ Ultra-Fast LPU Agent:</b> Paste your GitHub URL or profile summary. Groq's high-speed AI engine will analyze your repositories, technologies, and achievements, automatically compiling your complete ATS resume in seconds!
                </div>

                {groqError && (
                  <div style={{
                    background: '#fef2f2', border: '1px solid #fecaca', padding: '10px 14px',
                    borderRadius: 8, fontSize: 11, color: '#991b1b', marginBottom: 14
                  }}>
                    <b>Error:</b> {groqError}
                  </div>
                )}

                <div className="grid" style={{ marginBottom: 12 }}>
                  <label className="field wide">
                    <span>GitHub Profile / Repo Link (Auto-extracts repos, languages, stars)</span>
                    <input
                      value={groqGithubUrl}
                      onChange={e => setGroqGithubUrl(e.target.value)}
                      placeholder="e.g. https://github.com/kuvaleshcd-hue"
                    />
                  </label>
                  <label className="field">
                    <span>Candidate Name</span>
                    <input
                      value={groqCandidateName}
                      onChange={e => setGroqCandidateName(e.target.value)}
                      placeholder="e.g. KUVALESH C D"
                    />
                  </label>
                  <label className="field">
                    <span>Target Role</span>
                    <input
                      value={groqTargetRole}
                      onChange={e => setGroqTargetRole(e.target.value)}
                      placeholder="e.g. Full Stack AI Developer"
                    />
                  </label>
                </div>

                <label className="field" style={{ marginBottom: 14 }}>
                  <span>Career Notes / Bio / Past Experience / Aspirations</span>
                  <textarea
                    rows="3"
                    value={groqPrompt}
                    onChange={e => setGroqPrompt(e.target.value)}
                    placeholder="Describe your degree, core skills, key projects, and career aspirations..."
                  />
                </label>

                <label className="field">
                  <div className="field-header-row">
                    <span>Groq API Key (Optional if configured on server)</span>
                    <a
                      href="https://console.groq.com/keys"
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: 10, color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}
                    >
                      Get free Groq key ↗
                    </a>
                  </div>
                  <input
                    type="password"
                    value={groqKey}
                    onChange={e => setGroqKey(e.target.value)}
                    placeholder="gsk_... (Stored locally in browser)"
                  />
                </label>
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="primary"
                  disabled={groqLoading}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
                    borderColor: '#6d28d9',
                    padding: '10px 20px',
                    fontSize: 12
                  }}
                >
                  {groqLoading ? (
                    <>
                      <RefreshCw className="spin" size={14} /> Synthesizing with Groq LPU AI...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} /> 🚀 Generate Full Resume
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="secondary"
                  disabled={groqLoading}
                  onClick={() => setShowGroqModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
