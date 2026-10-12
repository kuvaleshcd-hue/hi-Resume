// SmartResume ATS Scanner & Parser Service

const ACTION_VERBS = new Set([
  'engineered', 'architected', 'spearheaded', 'developed', 'built', 'created',
  'implemented', 'deployed', 'automated', 'optimized', 'designed', 'orchestrated',
  'streamlined', 'accelerated', 'refactored', 'pioneered', 'integrated', 'delivered',
  'formulated', 'analyzed', 'configured', 'administered', 'collaborated', 'managed',
  'launched', 'established', 'resolved', 'enhanced', 'maintained', 'directed'
]);

const WEAK_PHRASES = [
  'responsible for', 'worked on', 'helped with', 'assisted in',
  'duties included', 'was part of', 'tried to', 'handled stuff'
];

const STOP_WORDS = new Set([
  'and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
  'from', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has',
  'had', 'do', 'does', 'did', 'but', 'if', 'then', 'else', 'when', 'up', 'down',
  'in', 'out', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there',
  'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
  'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can',
  'will', 'just', 'should', 'now', 'we', 'our', 'you', 'your', 'they', 'their'
]);

export class ATSService {
  analyze(resume, jobDescription = '') {
    const feedback = [];
    const strengths = [];
    let score = 0;

    const p = resume.personal || {};
    const edu = Array.isArray(resume.education) ? resume.education : [];
    const skills = Array.isArray(resume.skills) ? resume.skills : [];
    const projects = Array.isArray(resume.projects) ? resume.projects : [];
    const exp = Array.isArray(resume.experience) ? resume.experience : [];
    const certs = Array.isArray(resume.certifications) ? resume.certifications : [];

    // --- 1. Contact & Identity (Max 15 pts) ---
    let contactScore = 0;
    if (p.name && p.name.trim().length > 2) contactScore += 3;
    else feedback.push({ section: 'Contact', text: 'Add your full name clearly at the top.', impact: 'high' });

    if (p.title && p.title.trim().length > 2) contactScore += 3;
    else feedback.push({ section: 'Contact', text: 'Specify a professional title (e.g. Full-Stack Developer).', impact: 'medium' });

    if (p.email && /\S+@\S+\.\S+/.test(p.email)) contactScore += 3;
    else feedback.push({ section: 'Contact', text: 'Provide a valid, professional email address.', impact: 'high' });

    if (p.phone && p.phone.trim().length > 5) contactScore += 2;
    else feedback.push({ section: 'Contact', text: 'Add a contact phone number.', impact: 'medium' });

    if (p.location && p.location.trim().length > 2) contactScore += 2;
    else feedback.push({ section: 'Contact', text: 'Specify your city/location (recruiters filter by locality).', impact: 'low' });

    if (p.linkedin || p.github || p.portfolio) {
      contactScore += 2;
      strengths.push('Professional portfolio/profiles (LinkedIn/GitHub) included.');
    } else {
      feedback.push({ section: 'Contact', text: 'Add your LinkedIn or GitHub profile link for recruiter credibility.', impact: 'high' });
    }
    score += contactScore;

    // --- 2. Structural Completeness (Max 20 pts) ---
    let sectionScore = 0;
    if (p.summary && p.summary.trim().split(/\s+/).length >= 20) {
      sectionScore += 5;
      strengths.push('Comprehensive professional summary present.');
    } else if (p.summary && p.summary.trim().length > 0) {
      sectionScore += 2;
      feedback.push({ section: 'Summary', text: 'Expand your professional summary to 2-3 sentences (30-60 words).', impact: 'medium' });
    } else {
      feedback.push({ section: 'Summary', text: 'Missing professional summary statement.', impact: 'high' });
    }

    if (edu.some(e => e.degree && e.institution)) {
      sectionScore += 5;
      strengths.push('Education background clearly listed.');
    } else {
      feedback.push({ section: 'Education', text: 'Include at least one degree and institution.', impact: 'high' });
    }

    if (skills.length >= 8) {
      sectionScore += 5;
      strengths.push(`Rich technical skills footprint (${skills.length} skills listed).`);
    } else if (skills.length >= 4) {
      sectionScore += 3;
      feedback.push({ section: 'Skills', text: 'Add more relevant technologies/skills (target at least 8-12 skills).', impact: 'medium' });
    } else {
      feedback.push({ section: 'Skills', text: 'Very few skills listed. ATS filters screen heavily on keyword density.', impact: 'high' });
    }

    if (projects.length > 0 || exp.length > 0) {
      sectionScore += 5;
      strengths.push('Practical experience or technical projects present.');
    } else {
      feedback.push({ section: 'Experience', text: 'Add at least one technical project or work experience.', impact: 'critical' });
    }
    score += sectionScore;

    // --- 3. Action Verb Density (Max 20 pts) ---
    const allBodyText = [
      ...projects.map(pr => `${pr.name || ''} ${pr.description || ''}`),
      ...exp.map(ex => `${ex.role || ''} ${ex.details || ''}`)
    ].join('\n');

    const lines = allBodyText
      .split(/[\n\.\•\*\-]/)
      .map(s => s.trim())
      .filter(s => s.length > 10);

    let actionVerbCount = 0;
    let weakPhraseCount = 0;

    lines.forEach(line => {
      const firstWord = line.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
      if (ACTION_VERBS.has(firstWord)) {
        actionVerbCount++;
      }
      WEAK_PHRASES.forEach(weak => {
        if (line.toLowerCase().includes(weak)) weakPhraseCount++;
      });
    });

    let actionVerbScore = 0;
    if (lines.length > 0) {
      const verbRatio = actionVerbCount / Math.max(lines.length, 1);
      if (verbRatio >= 0.4 || actionVerbCount >= 5) {
        actionVerbScore = 20;
        strengths.push(`Strong action verbs usage (${actionVerbCount} high-impact action verbs detected).`);
      } else if (actionVerbCount >= 2) {
        actionVerbScore = 12;
        feedback.push({ section: 'Action Verbs', text: 'Start more bullet points with strong action verbs (e.g. Engineered, Spearheaded, Optimized).', impact: 'medium' });
      } else {
        actionVerbScore = 5;
        feedback.push({ section: 'Action Verbs', text: 'Avoid passive voice. Start bullets with assertive verbs rather than "Worked on" or "Helped with".', impact: 'high' });
      }
    }
    score += actionVerbScore;

    if (weakPhraseCount > 0) {
      feedback.push({ section: 'Tone', text: `Found ${weakPhraseCount} passive phrases like "worked on" or "responsible for". Use AI Polish to rewrite them.`, impact: 'medium' });
    }

    // --- 4. Quantifiable Metrics & Numbers (Max 20 pts) ---
    const metricMatches = allBodyText.match(/(\b\d+[\.,]?\d*[%kKmMBb]?\b|\$\d+|\b\d+\+\b|\b\d+x\b)/g) || [];
    let metricScore = 0;

    if (metricMatches.length >= 4) {
      metricScore = 20;
      strengths.push(`Great quantification! Found ${metricMatches.length} measurable metrics and percentages.`);
    } else if (metricMatches.length >= 2) {
      metricScore = 12;
      feedback.push({ section: 'Impact Metrics', text: 'Good start on metrics, but add 2 more quantifiable results (e.g. "improved load time by 35%", "served 200+ users").', impact: 'medium' });
    } else {
      metricScore = 4;
      feedback.push({ section: 'Impact Metrics', text: 'Missing quantifiable metrics. Recruiters and ATS heavily favor measurable achievements (%, numbers, scale).', impact: 'high' });
    }
    score += metricScore;

    // --- 5. Skills Coverage & Tech Stack (Max 15 pts) ---
    let skillsScore = Math.min(15, Math.floor(skills.length * 1.5));
    score += skillsScore;

    // --- 6. Job Description Match (Max 10 pts) ---
    let jobMatch = null;
    if (jobDescription && jobDescription.trim().length > 20) {
      jobMatch = this.matchAgainstJobDescription(resume, jobDescription);
      const matchBonus = Math.round((jobMatch.matchPercentage / 100) * 10);
      score += matchBonus;

      if (jobMatch.matchPercentage >= 70) {
        strengths.push(`High keyword alignment (${jobMatch.matchPercentage}%) with target job description.`);
      } else {
        feedback.push({
          section: 'Job Alignment',
          text: `Missing key skills mentioned in job posting: ${jobMatch.missingKeywords.slice(0, 4).join(', ')}.`,
          impact: 'high'
        });
      }
    } else {
      // Default formatting bonus if no JD
      score += certs.length > 0 ? 10 : 6;
      if (certs.length > 0) {
        strengths.push('Industry certifications included.');
      }
    }

    // Normalize final score between 0 and 100
    const finalScore = Math.min(100, Math.max(10, Math.round(score)));

    let grade = 'Needs Work';
    if (finalScore >= 88) grade = 'Exceptional';
    else if (finalScore >= 75) grade = 'Competitive';
    else if (finalScore >= 60) grade = 'Average';

    return {
      score: finalScore,
      grade,
      breakdown: {
        contact: { score: contactScore, max: 15 },
        sections: { score: sectionScore, max: 20 },
        actionVerbs: { score: actionVerbScore, max: 20 },
        metrics: { score: metricScore, max: 20 },
        skills: { score: skillsScore, max: 15 },
        jobMatch: jobMatch ? { score: Math.round((jobMatch.matchPercentage / 100) * 10), max: 10 } : null
      },
      stats: {
        skillsCount: skills.length,
        actionVerbCount,
        metricCount: metricMatches.length,
        linesAnalyzed: lines.length
      },
      strengths,
      improvements: feedback,
      jobMatch
    };
  }

  matchAgainstJobDescription(resume, jobDescription) {
    // Extract keywords from job description
    const words = jobDescription
      .toLowerCase()
      .replace(/[^a-z0-9\+\#\.\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length >= 3 && !STOP_WORDS.has(w));

    // Frequency analysis of JD keywords
    const freq = new Map();
    words.forEach(w => freq.set(w, (freq.get(w) || 0) + 1));

    // Extract top relevant keywords
    const topKeywords = Array.from(freq.entries())
      .filter(([w, count]) => count >= 2 || w.length > 5)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 25)
      .map(([word]) => word);

    // Build resume searchable string
    const resumeCorpus = [
      resume.personal?.title || '',
      resume.personal?.summary || '',
      ...(resume.skills || []),
      ...(resume.projects || []).map(p => `${p.name} ${p.tech} ${p.description}`),
      ...(resume.experience || []).map(e => `${e.role} ${e.company} ${e.details}`)
    ].join(' ').toLowerCase();

    const matched = [];
    const missing = [];

    topKeywords.forEach(kw => {
      if (resumeCorpus.includes(kw)) {
        matched.push(kw);
      } else {
        missing.push(kw);
      }
    });

    const matchPercentage = topKeywords.length > 0
      ? Math.round((matched.length / topKeywords.length) * 100)
      : 100;

    return {
      matchPercentage,
      matchedKeywords: matched.slice(0, 10),
      missingKeywords: missing.slice(0, 10),
      totalKeywordsChecked: topKeywords.length
    };
  }
}

export const atsService = new ATSService();
