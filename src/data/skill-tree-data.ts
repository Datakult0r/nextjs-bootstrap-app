import { SkillNode } from '@/types/skill-tree';

export const aiSkillTreeData: SkillNode[] = [
  // Level 0 - Foundation
  {
    id: 'ai-basics',
    title: 'AI Fundamentals',
    description: 'Learn the core concepts of artificial intelligence and machine learning',
    level: 0,
    progress: 100,
    isActive: false,
    isLocked: false,
    skills: ['AI Concepts', 'Machine Learning', 'Data Science', 'Python Basics'],
    category: 'foundation',
    xp: 100,
    duration: '2 weeks',
    difficulty: 'Beginner',
    completionCriteria: {
      type: 'quiz',
      threshold: 80,
      total: 100
    }
  },
  {
    id: 'programming-basics',
    title: 'Programming Foundations',
    description: 'Master programming fundamentals required for AI development',
    level: 0,
    progress: 85,
    isActive: true,
    isLocked: false,
    skills: ['Python', 'Data Structures', 'Algorithms', 'Git'],
    category: 'foundation',
    xp: 120,
    duration: '3 weeks',
    difficulty: 'Beginner'
  },

  // Level 1 - Core Skills
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    description: 'Learn to analyze and visualize data using modern tools',
    level: 1,
    progress: 60,
    isActive: false,
    isLocked: false,
    prerequisites: ['ai-basics', 'programming-basics'],
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Statistical Analysis'],
    category: 'data-science',
    xp: 150,
    duration: '4 weeks',
    difficulty: 'Intermediate'
  },
  {
    id: 'ml-algorithms',
    title: 'ML Algorithms',
    description: 'Understand and implement core machine learning algorithms',
    level: 1,
    progress: 40,
    isActive: false,
    isLocked: false,
    prerequisites: ['ai-basics', 'programming-basics'],
    skills: ['Supervised Learning', 'Unsupervised Learning', 'Scikit-learn', 'Model Evaluation'],
    category: 'machine-learning',
    xp: 180,
    duration: '5 weeks',
    difficulty: 'Intermediate'
  },

  // Level 2 - Advanced Topics
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    description: 'Master neural networks and deep learning architectures',
    level: 2,
    progress: 20,
    isActive: false,
    isLocked: false,
    prerequisites: ['data-analysis', 'ml-algorithms'],
    skills: ['Neural Networks', 'TensorFlow', 'PyTorch', 'CNN', 'RNN'],
    category: 'deep-learning',
    xp: 250,
    duration: '8 weeks',
    difficulty: 'Advanced'
  },
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    description: 'Process and understand human language with AI',
    level: 2,
    progress: 0,
    isActive: false,
    isLocked: false,
    prerequisites: ['ml-algorithms'],
    skills: ['Text Processing', 'Sentiment Analysis', 'Language Models', 'BERT', 'GPT'],
    category: 'nlp',
    xp: 220,
    duration: '6 weeks',
    difficulty: 'Advanced'
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    description: 'Enable machines to see and interpret visual information',
    level: 2,
    progress: 0,
    isActive: false,
    isLocked: false,
    prerequisites: ['deep-learning'],
    skills: ['Image Processing', 'Object Detection', 'OpenCV', 'YOLO', 'Image Classification'],
    category: 'computer-vision',
    xp: 240,
    duration: '7 weeks',
    difficulty: 'Advanced'
  },

  // Level 3 - Specialization
  {
    id: 'ai-ethics',
    title: 'AI Ethics & Governance',
    description: 'Understand responsible AI development and deployment',
    level: 3,
    progress: 0,
    isActive: false,
    isLocked: true,
    prerequisites: ['deep-learning', 'nlp'],
    skills: ['Bias Detection', 'Fairness', 'Explainable AI', 'Privacy', 'Governance'],
    category: 'ethics',
    xp: 180,
    duration: '4 weeks',
    difficulty: 'Advanced'
  },
  {
    id: 'mlops',
    title: 'MLOps & Deployment',
    description: 'Deploy and maintain AI systems in production',
    level: 3,
    progress: 0,
    isActive: false,
    isLocked: true,
    prerequisites: ['deep-learning'],
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Model Monitoring', 'Cloud Platforms'],
    category: 'deployment',
    xp: 300,
    duration: '6 weeks',
    difficulty: 'Advanced'
  },
  {
    id: 'ai-research',
    title: 'AI Research & Innovation',
    description: 'Contribute to cutting-edge AI research and development',
    level: 3,
    progress: 0,
    isActive: false,
    isLocked: true,
    prerequisites: ['computer-vision', 'nlp', 'ai-ethics'],
    skills: ['Research Methods', 'Paper Writing', 'Experimentation', 'Innovation', 'Collaboration'],
    category: 'research',
    xp: 400,
    duration: '12 weeks',
    difficulty: 'Advanced'
  }
];

export const cybersecuritySkillTreeData: SkillNode[] = [
  // Level 0 - Foundation
  {
    id: 'security-basics',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn the core principles of cybersecurity and threat landscape',
    level: 0,
    progress: 90,
    isActive: false,
    isLocked: false,
    skills: ['Security Principles', 'Threat Modeling', 'Risk Assessment', 'Compliance'],
    category: 'foundation',
    xp: 100,
    duration: '3 weeks',
    difficulty: 'Beginner'
  },
  {
    id: 'networking-basics',
    title: 'Network Security',
    description: 'Understand network protocols and security mechanisms',
    level: 0,
    progress: 75,
    isActive: true,
    isLocked: false,
    skills: ['TCP/IP', 'Firewalls', 'VPN', 'Network Monitoring'],
    category: 'networking',
    xp: 120,
    duration: '4 weeks',
    difficulty: 'Beginner'
  },

  // Level 1 - Core Skills
  {
    id: 'ethical-hacking',
    title: 'Ethical Hacking',
    description: 'Learn penetration testing and vulnerability assessment',
    level: 1,
    progress: 45,
    isActive: false,
    isLocked: false,
    prerequisites: ['security-basics', 'networking-basics'],
    skills: ['Penetration Testing', 'Vulnerability Assessment', 'Metasploit', 'Nmap'],
    category: 'offensive',
    xp: 200,
    duration: '6 weeks',
    difficulty: 'Intermediate'
  },
  {
    id: 'incident-response',
    title: 'Incident Response',
    description: 'Handle and investigate security incidents effectively',
    level: 1,
    progress: 30,
    isActive: false,
    isLocked: false,
    prerequisites: ['security-basics'],
    skills: ['Forensics', 'Incident Handling', 'Malware Analysis', 'SIEM'],
    category: 'defensive',
    xp: 180,
    duration: '5 weeks',
    difficulty: 'Intermediate'
  },

  // Level 2 - Advanced
  {
    id: 'advanced-threats',
    title: 'Advanced Persistent Threats',
    description: 'Detect and counter sophisticated cyber attacks',
    level: 2,
    progress: 0,
    isActive: false,
    isLocked: false,
    prerequisites: ['ethical-hacking', 'incident-response'],
    skills: ['APT Detection', 'Threat Hunting', 'Advanced Analytics', 'Behavioral Analysis'],
    category: 'threat-intelligence',
    xp: 300,
    duration: '8 weeks',
    difficulty: 'Advanced'
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security',
    description: 'Secure cloud infrastructure and services',
    level: 2,
    progress: 0,
    isActive: false,
    isLocked: true,
    prerequisites: ['networking-basics', 'incident-response'],
    skills: ['AWS Security', 'Azure Security', 'Container Security', 'DevSecOps'],
    category: 'cloud',
    xp: 250,
    duration: '7 weeks',
    difficulty: 'Advanced'
  }
];

export const skillCategories = {
  foundation: { name: 'Foundation', color: '#3B82F6', description: 'Core fundamentals' },
  'data-science': { name: 'Data Science', color: '#10B981', description: 'Data analysis and visualization' },
  'machine-learning': { name: 'Machine Learning', color: '#F59E0B', description: 'ML algorithms and models' },
  'deep-learning': { name: 'Deep Learning', color: '#8B5CF6', description: 'Neural networks and deep learning' },
  nlp: { name: 'NLP', color: '#EF4444', description: 'Natural language processing' },
  'computer-vision': { name: 'Computer Vision', color: '#06B6D4', description: 'Image and video analysis' },
  ethics: { name: 'AI Ethics', color: '#84CC16', description: 'Responsible AI development' },
  deployment: { name: 'MLOps', color: '#F97316', description: 'Production deployment' },
  research: { name: 'Research', color: '#EC4899', description: 'Cutting-edge research' },
  networking: { name: 'Networking', color: '#6366F1', description: 'Network security' },
  offensive: { name: 'Offensive Security', color: '#DC2626', description: 'Ethical hacking' },
  defensive: { name: 'Defensive Security', color: '#059669', description: 'Incident response' },
  'threat-intelligence': { name: 'Threat Intelligence', color: '#7C3AED', description: 'Advanced threats' },
  cloud: { name: 'Cloud Security', color: '#0891B2', description: 'Cloud infrastructure security' }
};
