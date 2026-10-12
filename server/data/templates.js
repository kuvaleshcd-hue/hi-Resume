export const sampleTemplates = [
  {
    id: 'tpl-fullstack-dev',
    title: 'Full-Stack Software Engineer',
    type: 'ATS-Friendly',
    personal: {
      name: 'Alex Rivera',
      title: 'Full-Stack Software Engineer',
      email: 'alex.rivera@example.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      linkedin: 'https://linkedin.com/in/alex-rivera-dev',
      github: 'https://github.com/alexrivera-dev',
      portfolio: 'https://alexrivera.dev',
      summary: 'Results-driven Full-Stack Engineer with 3+ years of experience architecting performant web applications using React, Node.js, and TypeScript. Proven track record of boosting application throughput by 40% and designing resilient microservices handling 200k+ daily requests.'
    },
    education: [
      {
        degree: 'B.S. in Computer Science',
        institution: 'University of California, Berkeley',
        university: 'UC Berkeley',
        location: 'Berkeley, CA',
        start: '2020',
        end: '2024',
        grade: '3.85 GPA / Magna Cum Laude'
      }
    ],
    skills: [
      'JavaScript (ES6+)',
      'TypeScript',
      'React.js',
      'Next.js',
      'Node.js',
      'Express',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'AWS (S3, EC2, Lambda)',
      'GraphQL',
      'Jest',
      'CI/CD Pipelines'
    ],
    projects: [
      {
        name: 'CloudPulse — Distributed Metrics Monitor',
        tech: 'React, Node.js, WebSockets, TimescaleDB, TailwindCSS',
        link: 'https://github.com/alexrivera-dev/cloudpulse',
        description: '• Architected a real-time system monitoring dashboard rendering 50k+ server telemetry metrics/sec with sub-50ms latency.\n• Engineered modular WebSocket microservices with backpressure handling, reducing CPU overhead by 28%.\n• Integrated role-based authentication and automated alert webhooks via PagerDuty and Slack APIs.'
      },
      {
        name: 'OmniCart — Headless E-Commerce Platform',
        tech: 'Next.js 14, TypeScript, Stripe API, PostgreSQL, Redis',
        link: 'https://omnicart-demo.dev',
        description: '• Developed high-converting headless checkout engine supporting localized currencies and Stripe webhooks with 99.98% reliability.\n• Implemented multi-tier caching with Redis and ISR, accelerating Largest Contentful Paint (LCP) by 62%.'
      }
    ],
    experience: [
      {
        role: 'Software Engineer II',
        company: 'Vanguard Systems',
        start: 'Aug 2024',
        end: 'Present',
        details: '• Spearheaded frontend performance refactor across 12 core customer journeys, reducing page bundle sizes by 44% and increasing retention by 18%.\n• Designed and shipped 15+ RESTful and GraphQL endpoints consumed by 120,000+ monthly active enterprise users.\n• Automated unit and integration testing pipelines with GitHub Actions, raising test coverage from 68% to 92%.'
      },
      {
        role: 'Full-Stack Developer Intern',
        company: 'Apex Innovations',
        start: 'Jun 2023',
        end: 'May 2024',
        details: '• Built reusable React component libraries and design tokens adopting strict WCAG 2.1 AA accessibility guidelines.\n• Optimized complex PostgreSQL queries and index schemas, slashing average API response times from 420ms to 95ms.'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        date: '2024'
      },
      {
        name: 'Meta Front-End Developer Professional Certificate',
        issuer: 'Coursera / Meta',
        date: '2023'
      }
    ],
    achievements: [
      '1st Place Winner at CalHacks 10.0 (over 2,000 international participants).',
      'Authored popular open-source React hook library with 3,500+ GitHub stars.',
      'Recipient of Dean’s Honor List for 6 consecutive academic quarters.'
    ]
  },
  {
    id: 'tpl-cs-fresher',
    title: 'Computer Science Fresher / Graduate',
    type: 'Fresher',
    personal: {
      name: 'Niranjan N.S',
      title: 'Aspiring Software Developer | III BCA',
      email: 'niranjan.dev@example.com',
      phone: '+91 98765 43210',
      location: 'Mandya, Karnataka, India',
      linkedin: 'https://linkedin.com/in/niranjan-ns',
      github: 'https://github.com/niranjan-ns',
      portfolio: 'https://niranjan-ns.github.io/portfolio/',
      summary: 'Motivated Bachelor of Computer Applications (BCA) candidate with solid foundations in Data Structures, Full-Stack Web Development, and Computer Vision. Passionate about engineering clean, user-centric web applications and IoT automation systems. Eager to contribute technical skills to a dynamic engineering team.'
    },
    education: [
      {
        degree: 'Bachelor of Computer Applications (BCA)',
        institution: 'STG First Grade College, Chinakurali',
        university: 'University of Mysore',
        location: 'Mandya, India',
        start: '2024',
        end: '2027',
        grade: '8.8 CGPA'
      },
      {
        degree: 'Pre-University Course (PCMB)',
        institution: 'Govt Pre-University College',
        university: 'Karnataka PU Board',
        location: 'Mandya, India',
        start: '2022',
        end: '2024',
        grade: '85%'
      }
    ],
    skills: [
      'HTML5',
      'CSS3 / TailwindCSS',
      'JavaScript (ES6+)',
      'React.js',
      'Node.js',
      'Python',
      'Flask',
      'SQL / MySQL',
      'MongoDB',
      'OpenCV',
      'YOLOv8',
      'Arduino / IoT',
      'Git & GitHub'
    ],
    projects: [
      {
        name: 'Classroom Automation System with Computer Vision',
        tech: 'Python, OpenCV, YOLO, Arduino, Serial Communication',
        link: 'https://github.com/niranjan-ns/classroom-automation',
        description: '• Developed smart energy conservation system using YOLO real-time object detection to detect human presence in classrooms.\n• Programmed Arduino relay modules via serial communication to automate lighting and fan controls, cutting unnecessary power draw by ~35%.\n• Designed low-latency video processing loop maintaining 30 FPS inference on standard edge hardware.'
      },
      {
        name: 'ReUseMarket — Campus Second-Hand Marketplace',
        tech: 'Python, Flask, SQLite, HTML5, CSS3, JavaScript',
        link: 'https://github.com/niranjan-ns/reuse-market',
        description: '• Engineered a community marketplace for college students to buy and resell textbooks and electronics securely.\n• Implemented secure user authentication, product categorization, image uploads, and search filters.\n• Tested with 150+ student users, facilitating over 80 verified campus exchanges in the initial pilot.'
      },
      {
        name: 'Personal Responsive Portfolio Website',
        tech: 'HTML5, CSS3, Modern JavaScript, GitHub Pages',
        link: 'https://niranjan-ns.github.io/portfolio/',
        description: '• Designed and deployed a fast, fully responsive portfolio showcasing technical projects, credentials, and interactive contact form.\n• Integrated dark/light theme switching and smooth scroll animations achieving 98+ Google Lighthouse performance score.'
      }
    ],
    experience: [
      {
        role: 'Web Development Trainee / Intern',
        company: 'STG Tech Lab',
        start: 'May 2025',
        end: 'Aug 2025',
        details: '• Built responsive landing pages and internal dashboard components using React and REST APIs.\n• Collaborated in team code reviews, adhering to Git branching workflows and standard coding conventions.\n• Resolved 20+ frontend bug tickets, boosting cross-browser compatibility across Safari and Chrome.'
      }
    ],
    certifications: [
      {
        name: 'Web Development Fundamentals',
        issuer: 'Infosys Springboard',
        date: '2025'
      },
      {
        name: 'Cybersecurity Awareness & Defense',
        issuer: 'Cyberverse Foundation',
        date: '2025'
      },
      {
        name: 'Viksit Bharat Young Leaders Delegate',
        issuer: 'Viksit Bharat Dialogue',
        date: '2026'
      }
    ],
    achievements: [
      'Top Rank holder in BCA Department for Academic Excellence in Database & Web Technologies.',
      'Represented college at State Level Tech Symposium with Classroom Automation project demonstration.',
      'Active contributor to open-source student study portal and coding workshop organizer.'
    ]
  },
  {
    id: 'tpl-cybersecurity',
    title: 'Cybersecurity & SOC Analyst',
    type: 'Cybersecurity',
    personal: {
      name: 'Jordan Chen',
      title: 'Information Security & SOC Analyst',
      email: 'jordan.chen@securitypro.io',
      phone: '+1 (555) 901-2345',
      location: 'Austin, TX',
      linkedin: 'https://linkedin.com/in/jordan-chen-sec',
      github: 'https://github.com/jordanchen-sec',
      portfolio: 'https://jordanchen.security',
      summary: 'Security Analyst with deep expertise in threat detection, vulnerability management, and incident response. Proficient in SIEM tooling (Splunk, Elastic), Wireshark packet inspection, and NIST/ISO security frameworks. Passionate about hardening cloud infrastructure and automating security telemetry.'
    },
    education: [
      {
        degree: 'B.S. in Cybersecurity & Information Assurance',
        institution: 'University of Texas at Austin',
        university: 'UT Austin',
        location: 'Austin, TX',
        start: '2019',
        end: '2023',
        grade: '3.78 GPA'
      }
    ],
    skills: [
      'Splunk & ELK SIEM',
      'Wireshark & Tcpdump',
      'Burp Suite & OWASP ZAP',
      'Snort & Suricata IDS',
      'Python Scripting (Scapy, Requests)',
      'Bash Automation',
      'Linux Hardening (SELinux, IPTables)',
      'NIST Cybersecurity Framework',
      'AWS Security Hub & IAM Policies',
      'Incident Response & Forensics'
    ],
    projects: [
      {
        name: 'HoneyNet — Distributed Honeypot Telemetry System',
        tech: 'Python, Docker, Cowrie Honeypot, ELK Stack, AWS EC2',
        link: 'https://github.com/jordanchen-sec/honeynet-telemetry',
        description: '• Deployed 4 worldwide Cowrie SSH honeypots to capture live brute-force attack vectors and malicious payloads.\n• Built automated log aggregation pipeline with ElasticSearch & Kibana parsing 45,000+ unauthorized connection attempts weekly.\n• Created IP threat intelligence feed published automatically to firewall blacklist tables.'
      },
      {
        name: 'Vulnerability Scanner & Remediation Tracker',
        tech: 'Python, Nmap Scripting Engine, SQLite, Flask',
        link: 'https://github.com/jordanchen-sec/vuln-tracker',
        description: '• Developed internal network scanner detecting unpatched CVEs and insecure open ports across 200+ local subnets.\n• Automated generation of executive summary reports and Jira remediation tickets.'
      }
    ],
    experience: [
      {
        role: 'SOC Analyst II',
        company: 'Sentinel CyberDefense',
        start: 'Jul 2023',
        end: 'Present',
        details: '• Monitored, investigated, and triaged 150+ security alerts daily across enterprise endpoints and cloud workloads using Splunk.\n• Led containment and eradication of 12 critical phishing and credential-stuffing incidents, preventing lateral movement.\n• Authored 8 automated SOAR playbooks in Python, decreasing mean time to detect (MTTD) by 32% and triage time by 45%.'
      }
    ],
    certifications: [
      {
        name: 'CompTIA Security+ (SY0-701)',
        issuer: 'CompTIA',
        date: '2023'
      },
      {
        name: 'Certified Ethical Hacker (CEH v12)',
        issuer: 'EC-Council',
        date: '2024'
      }
    ],
    achievements: [
      'Detected zero-day reconnaissance vulnerability in client perimeter before public disclosure.',
      'Ranked Top 5% in National Cyber League (NCL) Individual Capture the Flag competition.',
      'Speaker at Texas Cyber Summit 2025 on automated SIEM log enrichment.'
    ]
  }
];
