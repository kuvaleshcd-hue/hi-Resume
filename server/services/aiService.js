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
    this.groqKey = process.env.GROQ_API_KEY || null;
    this.geminiKey = process.env.GEMINI_API_KEY || null;
    this.openaiKey = process.env.OPENAI_API_KEY || null;
  }

  isExternalAiConfigured() {
    return Boolean(this.groqKey || this.geminiKey || this.openaiKey);
  }

  getMode() {
    if (this.groqKey) return 'Groq LPU (LLaMA 3.3 70B)';
    if (this.geminiKey) return 'Gemini API Connected';
    if (this.openaiKey) return 'OpenAI API Connected';
    return 'Smart Built-in NLP Engine';
  }

  // --- External API Call (Groq LPU) ---
  async callGroq({ prompt, systemPrompt = '', responseFormat = 'json', apiKey = null, model = 'llama-3.3-70b-versatile' }) {
    const key = apiKey || this.groqKey;
    if (!key) return null;

    try {
      const messages = [];
      if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
      }
      messages.push({ role: 'user', content: prompt });

      const payload = {
        model: model || 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.3,
        max_tokens: 3500
      };

      if (responseFormat === 'json') {
        payload.response_format = { type: 'json_object' };
      }

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.warn('[AIService] Groq API error:', res.status, errorText);
        throw new Error(`Groq API error (${res.status}): ${errorText}`);
      }

      const data = await res.json();
      return data.choices?.[0]?.message?.content || null;
    } catch (err) {
      console.warn('[AIService] Failed to query Groq:', err.message);
      throw err;
    }
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

  // --- Fetch GitHub Profile Telemetry ---
  async fetchGitHubContext(usernameOrUrl) {
    if (!usernameOrUrl) return null;
    let username = usernameOrUrl.trim();
    if (username.includes('github.com/')) {
      const match = username.match(/github\.com\/([a-zA-Z0-9_\-]+)/);
      if (match) username = match[1];
    }
    username = username.replace(/^@/, '').replace(/\/$/, '');
    if (!username) return null;

    try {
      const headers = { 'User-Agent': 'SmartResume-AI' };
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, { headers }),
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`, { headers })
      ]);

      const user = userRes.ok ? await userRes.json() : null;
      const repos = reposRes.ok ? await reposRes.json() : [];

      if (!user && repos.length === 0) return null;

      return {
        username,
        name: user?.name || username,
        bio: user?.bio || '',
        location: user?.location || '',
        blog: user?.blog || '',
        publicReposCount: user?.public_repos || 0,
        repos: Array.isArray(repos) ? repos.map(r => ({
          name: r.name,
          description: r.description || '',
          language: r.language || '',
          stars: r.stargazers_count || 0,
          url: r.html_url || '',
          topics: r.topics || []
        })) : []
      };
    } catch (err) {
      console.warn('[AIService] Failed to fetch GitHub profile:', err.message);
      return null;
    }
  }

  // --- Full Resume Builder via Groq LLaMA 3.3 70B ---
  async buildResumeWithGroq({ prompt = '', githubUrl = '', apiKey = null, targetRole = 'Full Stack AI Developer', candidateName = '' }) {
    const key = apiKey || this.groqKey;
    if (!key) {
      throw new Error('Groq API Key is required. Please set GROQ_API_KEY in server/.env or enter your key in the Groq AI modal.');
    }

    let githubContext = null;
    if (githubUrl) {
      githubContext = await this.fetchGitHubContext(githubUrl);
    }

    const systemPrompt = `You are a world-class executive resume architect and ATS specialist.
Construct a complete, recruiter-ready, high-scoring ATS resume in JSON format.
Follow these rules strictly:
1. Target JSON Schema:
{
  "type": "ATS-Friendly",
  "title": "Candidate Name — Target Role",
  "personal": {
    "name": "FULL NAME IN UPPERCASE",
    "title": "Target Role Title",
    "email": "email@example.com",
    "phone": "+91 ...",
    "location": "City, State/Country",
    "github": "github username or full url",
    "portfolio": "https://...",
    "summary": "2-3 sentence high-impact career objective highlighting core capabilities, background, and goals."
  },
  "education": [
    {
      "degree": "e.g. B.E. Information Science",
      "institution": "College / University Name",
      "university": "",
      "location": "",
      "start": "2023",
      "end": "2027",
      "grade": ""
    }
  ],
  "projectsTitle": "RELEVANT PROJECTS — SPEECH, NLP & AI",
  "projects": [
    {
      "name": "Project Name | Short Tagline",
      "date": "2025 – 2026",
      "subtitle": "Hackathon / Competition / Recognition",
      "link": "https://github.com/...",
      "description": "• Accomplished [X] measured by [Y] doing [Z]...\n• Built advanced feature with [tech]...\n• Deployed on [platform] • GitHub"
    }
  ],
  "skillCategories": [
    { "category": "Speech & Audio (or relevant category)", "skills": "Tool1, Tool2, Tool3..." },
    { "category": "Languages", "skills": "Python, JavaScript, C, SQL, Bash..." },
    { "category": "Backend / APIs", "skills": "FastAPI, Flask, Node.js..." },
    { "category": "Frontend", "skills": "React, Streamlit, HTML/CSS..." },
    { "category": "Tools & Infra", "skills": "Git, GitHub, Docker, VS Code..." }
  ],
  "skills": ["Python", "FastAPI", "React", "Docker", "Git"],
  "experience": [
    {
      "role": "Role Title",
      "company": "Company Name, Location",
      "start": "2026",
      "end": "Present",
      "subtitle": "Short tagline or achievement",
      "details": "• Action verb + responsibility + measurable outcome\n• ..."
    }
  ],
  "achievementsTitle": "PUBLICATIONS & ACHIEVEMENTS",
  "achievements": [
    "Conference paper / Hackathon achievement 1...",
    "Incubation / Award / Competition achievement 2..."
  ]
}

2. Use Google's STAR formula ("Accomplished [X] measured by [Y] doing [Z]") for project and experience bullets.
3. Categorize technical skills cleanly into 4-6 categories for the 2-column table.
4. Output strictly valid JSON matching response_format json_object.`;

    let userPrompt = `Generate a complete ATS resume for role: "${targetRole}".\n`;
    if (candidateName) userPrompt += `Candidate Name: "${candidateName}".\n`;
    if (prompt) userPrompt += `Candidate Profile & Background:\n${prompt}\n\n`;

    if (githubContext) {
      userPrompt += `GitHub Profile Telemetry for ${githubContext.username}:\n`;
      userPrompt += `- Name: ${githubContext.name}\n- Bio: ${githubContext.bio}\n- Location: ${githubContext.location}\n- Website/Blog: ${githubContext.blog}\n`;
      userPrompt += `- Repositories:\n`;
      githubContext.repos.forEach(r => {
        userPrompt += `  * ${r.name} (${r.language || 'Code'}, ${r.stars} stars): ${r.description} [${r.url}]\n`;
      });
    }

    const aiResponse = await this.callGroq({
      prompt: userPrompt,
      systemPrompt,
      apiKey: key,
      model: 'llama-3.3-70b-versatile',
      responseFormat: 'json'
    });

    if (!aiResponse) {
      throw new Error('Groq did not return a response. Please check your API key and connection.');
    }

    const clean = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(clean);
    return parsed;
  }

  // --- Bullet Enhancement ---
  async enhanceBullet({ text, role = '', tech = '', apiKey = null }) {
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

    const groqKey = apiKey || this.groqKey;
    const prompt = `You are a world-class executive resume writer and ATS specialist.
Enhance the following bullet point or experience description into 3 distinct, punchy, high-impact resume bullet points following the Google "Accomplished [X] as measured by [Y], by doing [Z]" STAR framework.
Include strong action verbs, technical specifics, and quantifiable metrics/outcomes where appropriate.
Role: ${role || 'Software Engineer'}
Technologies: ${tech || 'Modern Web Stack'}
Input text: "${text}"

Output strictly as a valid JSON object with key "suggestions" containing an array of 3 strings:
{
  "suggestions": [
    "Accomplished...",
    "Engineered...",
    "Optimized..."
  ]
}`;

    // Try Groq first if key is present
    if (groqKey) {
      try {
        const aiResponse = await this.callGroq({
          prompt,
          apiKey: groqKey,
          model: 'llama-3.3-70b-versatile',
          responseFormat: 'json'
        });
        if (aiResponse) {
          const clean = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(clean);
          const list = parsed.suggestions || (Array.isArray(parsed) ? parsed : null);
          if (Array.isArray(list) && list.length > 0) {
            return {
              original: text,
              mode: 'Groq LPU (LLaMA 3.3 70B)',
              suggestions: list
            };
          }
        }
      } catch (err) {
        console.warn('[AIService] Groq enhance bullet fallback:', err.message);
      }
    }

    // Try Gemini if key is present
    if (this.geminiKey) {
      const aiResponse = await this.callGemini(prompt);
      if (aiResponse) {
        try {
          const clean = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(clean);
          const list = parsed.suggestions || (Array.isArray(parsed) ? parsed : null);
          if (Array.isArray(list) && list.length > 0) {
            return {
              original: text,
              mode: 'Gemini AI',
              suggestions: list
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

  // --- Objective / Summary Generation ---
  async generateSummary({ role = 'Software Developer', skills = [], experienceYears = '2+', name = '', apiKey = null }) {
    const skillsList = Array.isArray(skills) && skills.length > 0 ? skills.slice(0, 6).join(', ') : 'modern web technologies and cloud infrastructure';
    const groqKey = apiKey || this.groqKey;

    const prompt = `You are an elite career coach. Write 3 distinct, compelling, ATS-optimized career objectives for a ${role} with skills in ${skillsList}.
Style 1: Results & Metrics Driven (focus on business impact, high scale, and measurable engineering outcomes)
Style 2: Deep Technical & Architecture Focused (focus on clean code, systems design, APIs, and engineering excellence)
Style 3: Growth & Agility Oriented (collaborative, fast-learning, modern problem solver, ideal for high-growth tech firms or fresher graduates).
Candidate name: ${name || 'Professional'}.

Output strictly as a valid JSON object with key "options" containing an array of 3 objects with keys "title" and "summary":
{
  "options": [
    {"title": "Results & Metrics Driven", "summary": "..."},
    {"title": "Technical & Systems Focus", "summary": "..."},
    {"title": "Growth & Modern Agility", "summary": "..."}
  ]
}`;

    // Try Groq first if key is present
    if (groqKey) {
      try {
        const aiResponse = await this.callGroq({
          prompt,
          apiKey: groqKey,
          model: 'llama-3.3-70b-versatile',
          responseFormat: 'json'
        });
        if (aiResponse) {
          const clean = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(clean);
          const opts = parsed.options || (Array.isArray(parsed) ? parsed : null);
          if (Array.isArray(opts) && opts.length > 0) {
            return { mode: 'Groq LPU (LLaMA 3.3 70B)', options: opts };
          }
        }
      } catch (err) {
        console.warn('[AIService] Groq generate summary fallback:', err.message);
      }
    }

    if (this.geminiKey) {
      const aiResponse = await this.callGemini(prompt);
      if (aiResponse) {
        try {
          const clean = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(clean);
          const opts = parsed.options || (Array.isArray(parsed) ? parsed : null);
          if (Array.isArray(opts) && opts.length > 0) {
            return { mode: 'Gemini AI', options: opts };
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
