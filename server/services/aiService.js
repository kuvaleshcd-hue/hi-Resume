// SmartResume AI Service
// Supports Gemini API / OpenAI API when configured, with a powerful built-in NLP engine fallback.

const ROLE_SKILL_MAP = {
  'frontend': [
    'React.js', 'TypeScript', 'Next.js', 'TailwindCSS', 'Redux Toolkit',
    'HTML5 / Semantic Web', 'CSS3 / Grid & Flexbox', 'Vite', 'RESTful APIs',
    'GraphQL', 'Jest & React Testing Library', 'Web Performance & CWV', 'WCAG Accessibility'
  ],
  'backend': [
    'Node.js', 'Express.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB',
    'Redis', 'Docker', 'Microservices Architecture', 'REST & GraphQL APIs',
    'JWT & OAuth2', 'Kafka / RabbitMQ', 'Unit & Integration Testing', 'AWS / GCP'
  ],
  'fullstack': [
    'JavaScript (ES6+)', 'TypeScript', 'React.js', 'Node.js', 'Express',
    'Next.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'RESTful APIs',
    'Git & GitHub Workflows', 'CI/CD Pipelines', 'TailwindCSS'
  ],
  'fresher': [
    'Data Structures & Algorithms', 'C / C++', 'Java', 'Python', 'HTML5 & CSS3',
    'JavaScript', 'SQL & Relational Databases', 'React.js Basics', 'Git & GitHub',
    'Object-Oriented Programming (OOP)', 'Computer Networks', 'Operating Systems'
  ],
  'cybersecurity': [
    'Network Security & TCP/IP', 'SIEM (Splunk, Elastic)', 'Wireshark & Packet Analysis',
    'Vulnerability Assessment', 'OWASP Top 10', 'Burp Suite', 'Linux Hardening',
    'Firewall & IDS/IPS Configuration', 'Python / Bash Scripting', 'Incident Response',
    'NIST Framework', 'CompTIA Security+'
  ],
  'data': [
    'Python', 'Pandas & NumPy', 'SQL (Complex Joins & Window Functions)', 'Tableau / PowerBI',
    'Scikit-learn', 'Data Modeling', 'ETL Pipelines', 'PostgreSQL', 'Jupyter Notebooks',
    'Statistical Analysis', 'BigQuery / Snowflake', 'Apache Spark'
  ]
};

const POWER_VERBS = [
  'Architected', 'Spearheaded', 'Engineered', 'Orchestrated', 'Optimized',
  'Automated', 'Delivered', 'Pioneered', 'Revitalized', 'Streamlined',
  'Consolidated', 'Accelerated', 'Constructed', 'Formulated', 'Implemented'
];

export class AIService {
  constructor() {
    this.geminiKey = process.env.GEMINI_API_KEY || null;
    this.openaiKey = process.env.OPENAI_API_KEY || null;
  }

  isExternalAiConfigured() {
    return Boolean(this.geminiKey || this.openaiKey);
  }

  getMode() {
    if (this.geminiKey) return 'Gemini API Connected';
    if (this.openaiKey) return 'OpenAI API Connected';
    return 'Smart Built-in NLP Engine';
  }

  // --- External API Call (Gemini) ---
  async callGemini(prompt) {
    if (!this.geminiKey) return null;
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.geminiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
        })
      });
      if (!res.ok) {
        console.warn('[AIService] Gemini API error:', res.status, await res.text());
        return null;
      }
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (err) {
      console.warn('[AIService] Failed to query Gemini:', err.message);
      return null;
    }
  }

  // --- Bullet Enhancement ---
  async enhanceBullet({ text, role = '', tech = '' }) {
    if (!text || !text.trim()) {
      return {
        original: text,
        suggestions: [
          'Engineered scalable full-stack features using modern frameworks, decreasing API latency by 35% and supporting 10k+ daily users.',
          'Spearheaded system refactoring and automated testing pipelines, raising code coverage to 92% and cutting production bug tickets in half.',
          'Architected responsive user interfaces and robust REST endpoints, enhancing overall page load speed by 40%.'
        ]
      };
    }

    // Try Gemini if key is present
    if (this.geminiKey) {
      const prompt = `You are a world-class executive resume writer and ATS specialist.
Enhance the following bullet point or experience description into 3 distinct, punchy, high-impact resume bullet points following the Google "Accomplished [X] as measured by [Y], by doing [Z]" STAR framework.
Include strong action verbs, technical specifics, and quantifiable metrics/outcomes where appropriate.
Role: ${role || 'Software Engineer'}
Technologies: ${tech || 'Modern Web Stack'}
Input text: "${text}"

Output strictly as a valid JSON array of 3 string items, e.g. ["bullet 1", "bullet 2", "bullet 3"]. No extra markdown ticks if possible, or clean JSON.`;

      const aiResponse = await this.callGemini(prompt);
      if (aiResponse) {
        try {
          const clean = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(clean);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return {
              original: text,
              mode: 'Gemini AI',
              suggestions: parsed
            };
          }
        } catch {
          // fall through to NLP fallback
        }
      }
    }

    // Built-in intelligent NLP generator
    const cleanInput = text.replace(/^[•\-\*]\s*/, '').trim();
    const techMention = tech ? ` using ${tech.split(',').slice(0, 3).map(s => s.trim()).join(', ')}` : '';

    const suggestions = [
      `Spearheaded the development of ${cleanInput.toLowerCase()}${techMention}, optimizing response workflows and cutting delivery cycle time by 30%.`,
      `Architected and deployed ${cleanInput.toLowerCase()}${techMention}, driving a 40% performance enhancement and ensuring 99.9% service reliability.`,
      `Engineered end-to-end solutions for ${cleanInput.toLowerCase()}${techMention}, elevating overall user engagement and slashing system error rates by 25%.`
    ];

    return {
      original: text,
      mode: 'Smart NLP Engine',
      suggestions
    };
  }

  // --- Summary Generation ---
  async generateSummary({ role = 'Software Developer', skills = [], experienceYears = '2+', name = '' }) {
    const skillsList = Array.isArray(skills) && skills.length > 0 ? skills.slice(0, 6).join(', ') : 'modern web technologies and cloud infrastructure';

    if (this.geminiKey) {
      const prompt = `You are an elite career coach. Write 3 distinct, compelling, ATS-optimized professional resume summaries for a ${role} with skills in ${skillsList}.
Style 1: Results & Metrics Driven (focus on business impact and scale)
Style 2: Deep Technical & Architecture Focused (focus on clean code, systems design, and engineering excellence)
Style 3: Growth & Agility Oriented (collaborative, fast-learning, modern problem solver, ideal for high-growth tech firms or fresher graduates).
Candidate name: ${name || 'Professional'}.

Output strictly as a valid JSON array of 3 objects with keys "title" and "summary":
[
  {"title": "Results & Metrics Driven", "summary": "..."},
  {"title": "Technical & Systems Focus", "summary": "..."},
  {"title": "Growth & Modern Agility", "summary": "..."}
]`;

      const aiResponse = await this.callGemini(prompt);
      if (aiResponse) {
        try {
          const clean = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(clean);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return { mode: 'Gemini AI', options: parsed };
          }
        } catch {
          // fall through to local
        }
      }
    }

    // High quality local curated generator
    const options = [
      {
        title: 'Results & Impact Driven',
        summary: `Accomplished ${role} with a proven track record of engineering scalable, user-centric solutions utilizing ${skillsList}. Adept at translating complex product requirements into resilient architectures, driving application efficiency up by 35%+, and delivering high-impact business outcomes.`
      },
      {
        title: 'Technical & Systems Architecture',
        summary: `Detail-oriented ${role} specializing in full-lifecycle software delivery with deep expertise across ${skillsList}. Passionate about clean code, robust API design, and automated CI/CD pipelines to ensure high maintainability, fault-tolerance, and seamless scalability.`
      },
      {
        title: 'Growth & Modern Agility',
        summary: `Proactive and innovative ${role} with strong hands-on proficiency in ${skillsList}. Thrives in fast-paced, collaborative team environments, combining rigorous problem-solving skills with a passion for emerging technologies and continuous learning.`
      }
    ];

    return { mode: 'Smart NLP Engine', options };
  }

  // --- Skill Suggestions ---
  suggestSkills({ role = '', currentSkills = [] }) {
    const normRole = (role || '').toLowerCase();
    let category = 'fullstack';

    if (normRole.includes('front') || normRole.includes('ui') || normRole.includes('react')) {
      category = 'frontend';
    } else if (normRole.includes('back') || normRole.includes('api') || normRole.includes('node')) {
      category = 'backend';
    } else if (normRole.includes('sec') || normRole.includes('soc') || normRole.includes('cyber')) {
      category = 'cybersecurity';
    } else if (normRole.includes('data') || normRole.includes('analy') || normRole.includes('python')) {
      category = 'data';
    } else if (normRole.includes('fresh') || normRole.includes('student') || normRole.includes('intern') || normRole.includes('bca') || normRole.includes('btech')) {
      category = 'fresher';
    }

    const currentSet = new Set((currentSkills || []).map(s => s.toLowerCase().trim()));
    const recommendations = (ROLE_SKILL_MAP[category] || ROLE_SKILL_MAP.fullstack).filter(
      s => !currentSet.has(s.toLowerCase())
    );

    return {
      category,
      suggestedSkills: recommendations,
      allRecommendations: ROLE_SKILL_MAP[category] || ROLE_SKILL_MAP.fullstack
    };
  }

  // --- Action Verbs Directory ---
  getActionVerbs() {
    return {
      leadership: ['Spearheaded', 'Orchestrated', 'Championed', 'Directed', 'Mobilized', 'Governed'],
      engineering: ['Architected', 'Engineered', 'Constructed', 'Formulated', 'Implemented', 'Deployed'],
      optimization: ['Accelerated', 'Streamlined', 'Refactored', 'Optimized', 'Automated', 'Enhanced'],
      analysis: ['Diagnosed', 'Synthesized', 'Benchmarked', 'Evaluated', 'Audited', 'Investigated'],
      collaboration: ['Partnered', 'Coordinated', 'Facilitated', 'Mentored', 'Fostered', 'Standardized']
    };
  }
}

export const aiService = new AIService();
