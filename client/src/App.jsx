import { useEffect, useState } from 'react';
import {
  FileText, ArrowRight, ArrowLeft, Plus, Trash2, Download, Check, Sparkles,
  Cloud, BarChart3, FolderOpen, Copy, FileCode, X, RefreshCw
} from 'lucide-react';

const types = [
  'ATS-Friendly', 'Fresher', 'Developer', 'Cybersecurity',
  'Chronological', 'Functional', 'Combination / Hybrid', 'Targeted',
  'Academic CV', 'Creative', 'Internship', 'Experienced'
];

const blank = {
  type: 'ATS-Friendly',
  title: 'Untitled Resume',
  personal: {
    name: '', title: '', email: '', phone: '', location: '',
    linkedin: '', github: '', portfolio: '', summary: ''
  },
  education: [{ degree: '', institution: '', university: '', location: '', start: '', end: '', grade: '' }],
  skills: [],
  projects: [{ name: '', tech: '', description: '', link: '' }],
  experience: [{ role: '', company: '', start: '', end: '', details: '' }],
  certifications: [{ name: '', issuer: '', date: '' }],
  achievements: ['']
};

const steps = ['Personal', 'Education', 'Skills', 'Projects', 'Experience', 'Certifications', 'Achievements'];
const clone = x => JSON.parse(JSON.stringify(x));

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
  return (
    <article className="paper">
      <header>
        <h1>{p.name || 'YOUR NAME'}</h1>
        <b>{p.title || 'Professional Title'}</b>
        <p>{[p.email, p.phone, p.location, p.linkedin, p.github, p.portfolio].filter(Boolean).join(' • ')}</p>
      </header>
      {p.summary && <section><h2>SUMMARY</h2><p>{p.summary}</p></section>}
      {d.education?.some(x => x.degree || x.institution) && (
        <section>
          <h2>EDUCATION</h2>
          {d.education.filter(x => x.degree || x.institution).map((x, i) => (
            <div className="entry" key={i}>
              <b>{x.degree}</b><span>{x.start} {x.end && '– ' + x.end}</span>
              <p>{x.institution} {x.university && ' • ' + x.university}</p>
              <small>{[x.location, x.grade].filter(Boolean).join(' • ')}</small>
            </div>
          ))}
        </section>
      )}
      {d.skills?.length > 0 && <section><h2>SKILLS</h2><p>{d.skills.join(' • ')}</p></section>}
      {d.projects?.some(x => x.name || x.description) && (
        <section>
          <h2>PROJECTS</h2>
          {d.projects.filter(x => x.name || x.description).map((x, i) => (
            <div className="entry" key={i}>
              <b>{x.name}</b>{x.tech && <small>{x.tech}</small>}
              <p className="preserve">{x.description}</p>
              {x.link && <small>{x.link}</small>}
            </div>
          ))}
        </section>
      )}
      {d.experience?.some(x => x.role || x.company) && (
        <section>
          <h2>EXPERIENCE</h2>
          {d.experience.filter(x => x.role || x.company).map((x, i) => (
            <div className="entry" key={i}>
              <b>{x.role} {x.company && '— ' + x.company}</b><span>{x.start} {x.end && '– ' + x.end}</span>
              <p className="preserve">{x.details}</p>
            </div>
          ))}
        </section>
      )}
      {d.certifications?.some(x => x.name) && (
        <section>
          <h2>CERTIFICATIONS</h2>
          <ul>{d.certifications.filter(x => x.name).map((x, i) => (
            <li key={i}>{x.name}{x.issuer ? ' — ' + x.issuer : ''}{x.date ? ' (' + x.date + ')' : ''}</li>
          ))}</ul>
        </section>
      )}
      {d.achievements?.some(Boolean) && (
        <section>
          <h2>ACHIEVEMENTS</h2>
          <ul>{d.achievements.filter(Boolean).map((x, i) => <li key={i}>{x}</li>)}</ul>
        </section>
      )}
    </article>
  );
}

export default function App() {
  const [d, setD] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sr-draft')) || clone(blank);
    } catch {
      return clone(blank);
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
    if (step === 0) return (
      <div className="grid">
        {field('Full name', ['personal', 'name'], 'Your name')}
        {field('Professional title', ['personal', 'title'], 'e.g. Full-Stack Developer')}
        {field('Email', ['personal', 'email'], 'you@example.com')}
        {field('Phone', ['personal', 'phone'], '+91 ...')}
        {field('Location', ['personal', 'location'], 'City, State')}
        {field('LinkedIn', ['personal', 'linkedin'], 'https://linkedin.com/in/...')}
        {field('GitHub', ['personal', 'github'], 'https://github.com/...')}
        {field('Portfolio', ['personal', 'portfolio'], 'https://...')}
        <div className="wide">
          {area(
            'Professional summary',
            ['personal', 'summary'],
            'Short summary of your background, core strengths, and goals',
            <button className="ai-trigger" type="button" onClick={triggerAiSummary}>
              <Sparkles size={12} /> AI Summary
            </button>
          )}
        </div>
      </div>
    );

    if (step === 1) return repeat(
      'education', 'Education',
      { degree: '', institution: '', university: '', location: '', start: '', end: '', grade: '' },
      i => (
        <>
          {field('Degree / Qualification', ['education', i, 'degree'], 'B.E. / B.Tech / BCA')}
          {field('Institution / College', ['education', i, 'institution'], 'College name')}
          {field('University / Board', ['education', i, 'university'], 'University name')}
          {field('Location', ['education', i, 'location'], 'City')}
          {field('Start year', ['education', i, 'start'], '2023')}
          {field('End year', ['education', i, 'end'], '2027 / Present')}
          {field('CGPA / Percentage', ['education', i, 'grade'], '8.5 CGPA')}
        </>
      )
    );

    if (step === 2) return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p className="hint">Add industry-relevant keywords and tools.</p>
          <button className="ai-trigger" type="button" onClick={triggerAiSkills}>
            <Sparkles size={12} /> AI Suggest Skills
          </button>
        </div>
        <div className="skillrow">
          <input
            value={skill}
            onChange={e => setSkill(e.target.value)}
            placeholder="e.g. React, Node.js, TypeScript, Docker"
            onKeyDown={e => {
              if (e.key === 'Enter' && skill.trim()) {
                upd(['skills'], [...(d.skills || []), skill.trim()]);
                setSkill('');
              }
            }}
          />
          <button className="primary" onClick={() => {
            if (skill.trim()) {
              upd(['skills'], [...(d.skills || []), skill.trim()]);
              setSkill('');
            }
          }}>Add Skill</button>
        </div>
        <div className="chips">
          {d.skills?.map((s, i) => (
            <span key={i}>
              {s}
              <button onClick={() => upd(['skills'], d.skills.filter((_, j) => j !== i))}>×</button>
            </span>
          ))}
        </div>
      </>
    );

    if (step === 3) return repeat(
      'projects', 'Project',
      { name: '', tech: '', description: '', link: '' },
      i => (
        <>
          {field('Project name', ['projects', i, 'name'], 'Project title')}
          {field('Technologies used', ['projects', i, 'tech'], 'Python, React, MongoDB...')}
          {field('GitHub / live URL', ['projects', i, 'link'], 'https://...')}
          <div className="wide">
            {area(
              'Description & Impact',
              ['projects', i, 'description'],
              'What did you build? What was your contribution and outcome?',
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
    );

    if (step === 4) return (
      <>
        <p className="hint">Freshers can skip this section or include internships / freelance work.</p>
        {repeat(
          'experience', 'Experience',
          { role: '', company: '', start: '', end: '', details: '' },
          i => (
            <>
              {field('Job title', ['experience', i, 'role'], 'Software Developer Intern')}
              {field('Company / Organization', ['experience', i, 'company'], 'Tech Corp')}
              {field('Start date', ['experience', i, 'start'], 'Jun 2025')}
              {field('End date', ['experience', i, 'end'], 'Present')}
              <div className="wide">
                {area(
                  'Responsibilities & Results',
                  ['experience', i, 'details'],
                  'One responsibility or achievement per line with quantifiable outcomes',
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

    if (step === 5) return repeat(
      'certifications', 'Certification',
      { name: '', issuer: '', date: '' },
      i => (
        <>
          {field('Certification name', ['certifications', i, 'name'], 'AWS Certified Developer')}
          {field('Issuer / Organization', ['certifications', i, 'issuer'], 'Amazon Web Services')}
          {field('Issue date', ['certifications', i, 'date'], '2025')}
        </>
      )
    );

    return (
      <div className="block">
        <div className="blockhead">
          <h3>Achievements</h3>
          <button className="link" onClick={() => add('achievements', '')}><Plus size={15} /> Add another</button>
        </div>
        {d.achievements?.map((x, i) => (
          <div className="skillrow" key={i}>
            <input
              value={x}
              onChange={e => upd(['achievements', i], e.target.value)}
              placeholder="e.g. 1st Place in University Hackathon out of 100+ teams"
            />
            {d.achievements.length > 1 && (
              <button className="icon" onClick={() => del('achievements', i)}><Trash2 size={15} /></button>
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

          <button className="btn-chip highlight" onClick={runAtsScan}>
            <BarChart3 size={14} /> ATS Scanner
          </button>

          <button className="secondary" onClick={() => setPage('preview')}>Preview</button>
        </div>
      </header>

      {/* Home View */}
      {page === 'home' && (
        <main className="hero">
          <div className="pill"><Sparkles size={14} /> Powered by SmartResume AI & ATS Intelligence</div>
          <h1>Make your experience<br /><em>stand out.</em></h1>
          <p>Create a polished, recruiter-ready resume one simple step at a time. Backed by persistent storage, real-time ATS scoring, and AI assistance.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 25 }}>
            <button className="primary big" style={{ marginTop: 0 }} onClick={() => setPage('types')}>
              Build my resume <ArrowRight size={18} />
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
          <div className="typegrid">
            {types.map(t => (
              <button
                key={t}
                className={d.type === t ? 'type selected' : 'type'}
                onClick={() => upd(['type'], t)}
              >
                <FileText />
                <b>{t}</b>
                <small>
                  {t === 'ATS-Friendly' ? 'Simple and recruiter-readable'
                    : t === 'Fresher' ? 'Education, skills and academic projects'
                    : t === 'Targeted' ? 'Tailor content for one specific job'
                    : 'A format suited to your career trajectory'}
                </small>
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
              <h2><Sparkles size={18} /> AI Professional Summary Generator</h2>
              <button className="modal-close" onClick={() => setShowAiSummaryModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p style={{ margin: 0, fontSize: 12, color: '#627267' }}>
                Select a crafted summary tailored for your role and skillset:
              </p>
              {summaryLoading ? (
                <div style={{ padding: 30, textAlign: 'center', color: '#7e22ce' }}>Generating tailored summaries...</div>
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
                          showToast('✓ Summary applied to resume');
                        }}
                      >
                        Use this summary
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
    </div>
  );
}
