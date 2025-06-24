export const solutions = [
  {
    name: "Industry Products",
    list: [
      {
        name: "Enterprise AI Suite",
        href: "/solutions/enterprise",
        icon: "building",
        description: "Complete AI transformation toolkit for large enterprises.",
        badge: "Enterprise"
      },
      {
        name: "Growth AI Platform",
        href: "/solutions/growth",
        icon: "trending-up",
        description: "AI-powered growth acceleration for mid-sized companies.",
        badge: "Business"
      },
      {
        name: "Solo AI Toolkit",
        href: "/solutions/solo",
        icon: "user",
        description: "Essential AI tools for solo entrepreneurs and startups.",
        badge: "Starter"
      }
    ]
  },
  {
    name: "Core Products",
    list: [
      {
        name: "AI-powered CRM",
        href: "/solutions/crm",
        icon: "users",
        description: "Intelligent customer relationship management system.",
        badge: "Popular"
      },
      {
        name: "AVA Voice Assistant",
        href: "/ava",
        icon: "mic",
        description: "Advanced AI voice assistant for customer service.",
        badge: "Featured"
      },
      {
        name: "AI Workflow Engine",
        href: "/solutions/workflow",
        icon: "workflow",
        description: "Automated business process optimization.",
        badge: "New"
      }
    ]
  },
  {
    name: "Specialized Solutions",
    list: [
      {
        name: "Supply Chain AI",
        href: "/solutions/supply-chain",
        icon: "truck",
        description: "AI-powered supply chain optimization and management.",
        badge: "Enterprise"
      },
      {
        name: "Marketing AI Suite",
        href: "/solutions/marketing",
        icon: "target",
        description: "Comprehensive AI marketing automation platform.",
        badge: "Business"
      },
      {
        name: "Financial AI Advisor",
        href: "/solutions/finance",
        icon: "wallet",
        description: "Intelligent financial planning and analytics.",
        badge: "Popular"
      }
    ]
  }
];

interface LearningPathItem {
  name: string;
  href: string;
  difficulty: string;
  progress: number;
}

interface ResearchItem {
  name: string;
  href: string;
  type: string;
}

interface LabSection {
  name: string;
  description: string;
  list: (LearningPathItem | ResearchItem)[];
}

export const lab: LabSection[] = [
  {
    name: "AI Classes",
    description: "Choose your specialized AI career path",
    list: [
      {
        name: "AI Architect",
        href: "/lab/architect",
        difficulty: "Strategist",
        progress: 0
      } as LearningPathItem,
      {
        name: "AI Developer",
        href: "/lab/developer",
        difficulty: "Builder",
        progress: 0
      } as LearningPathItem,
      {
        name: "AI DevSecOps",
        href: "/lab/devsecops",
        difficulty: "Guardian",
        progress: 0
      } as LearningPathItem
    ]
  },
  {
    name: "Skill Tracks",
    description: "Gamified learning paths with BNS verification",
    list: [
      {
        name: "AI Systems Design",
        href: "/lab/systems-design",
        difficulty: "Advanced",
        progress: 0
      } as LearningPathItem,
      {
        name: "AI Development",
        href: "/lab/development",
        difficulty: "Intermediate",
        progress: 0
      } as LearningPathItem,
      {
        name: "AI Security",
        href: "/lab/security",
        difficulty: "Advanced",
        progress: 0
      } as LearningPathItem
    ]
  },
  {
    name: "Virtual Labs",
    description: "Immersive AI experimentation environment",
    list: [
      {
        name: "BNS Credentials",
        href: "/lab/credentials",
        type: "Certification"
      } as ResearchItem,
      {
        name: "Practice Arena",
        href: "/lab/arena",
        type: "Training"
      } as ResearchItem,
      {
        name: "AI Sandbox",
        href: "/lab/sandbox",
        type: "Experimental"
      } as ResearchItem
    ]
  }
];

export type SolutionPanel = typeof solutions;
export type LabPanel = typeof lab;
export type LabItem = LearningPathItem | ResearchItem;

export const navLinks = [
  { name: "The Clinic", href: "/" },
  { name: "Solutions", menu: solutions },
  { name: "Europa.exe", menu: lab },
  { name: "Classes", href: "/classes" },
  { name: "Investors", href: "/coming-soon" },
  { name: "Talent", href: "/coming-soon" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
  { name: "Video Platform", href: "/video-platform" }
];

export type NavLink = (typeof navLinks)[number];
