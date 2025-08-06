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

// Industry-specific solutions for AI-Agency dropdown
export const industries = [
  {
    name: "Agriculture & Farming",
    list: [
      {
        name: "Smart Crop Management",
        href: "/ai-agency/agriculture/crop-management",
        icon: "leaf",
        description: "AI-powered crop monitoring and yield optimization.",
        badge: "Popular"
      },
      {
        name: "Livestock Intelligence",
        href: "/ai-agency/agriculture/livestock",
        icon: "cow",
        description: "Automated livestock health and behavior tracking.",
        badge: "New"
      },
      {
        name: "Precision Agriculture",
        href: "/ai-agency/agriculture/precision",
        icon: "target",
        description: "Data-driven farming with IoT and AI integration.",
        badge: "Enterprise"
      }
    ]
  },
  {
    name: "Private Practices",
    list: [
      {
        name: "Medical AI Assistant",
        href: "/ai-agency/medical/assistant",
        icon: "stethoscope",
        description: "AI-powered diagnostic support and patient management.",
        badge: "Healthcare"
      },
      {
        name: "Legal Document AI",
        href: "/ai-agency/legal/documents",
        icon: "scale",
        description: "Automated legal document analysis and generation.",
        badge: "Professional"
      },
      {
        name: "Financial Advisory AI",
        href: "/ai-agency/finance/advisory",
        icon: "calculator",
        description: "Intelligent financial planning and risk assessment.",
        badge: "Finance"
      }
    ]
  },
  {
    name: "Solopreneurs",
    list: [
      {
        name: "AI Content Creator",
        href: "/ai-agency/solo/content",
        icon: "pen-tool",
        description: "Automated content generation and social media management.",
        badge: "Creator"
      },
      {
        name: "Business Intelligence",
        href: "/ai-agency/solo/intelligence",
        icon: "brain",
        description: "AI-driven market analysis and business insights.",
        badge: "Analytics"
      },
      {
        name: "Customer Service Bot",
        href: "/ai-agency/solo/customer-service",
        icon: "message-circle",
        description: "24/7 AI customer support and engagement.",
        badge: "Support"
      }
    ]
  },
  {
    name: "Hospitality",
    list: [
      {
        name: "Guest Experience AI",
        href: "/ai-agency/hospitality/guest-experience",
        icon: "hotel",
        description: "Personalized guest services and experience optimization.",
        badge: "Experience"
      },
      {
        name: "Revenue Management",
        href: "/ai-agency/hospitality/revenue",
        icon: "trending-up",
        description: "Dynamic pricing and occupancy optimization.",
        badge: "Revenue"
      },
      {
        name: "Smart Concierge",
        href: "/ai-agency/hospitality/concierge",
        icon: "bell",
        description: "AI-powered concierge and recommendation system.",
        badge: "Service"
      }
    ]
  },
  {
    name: "Manufacturing",
    list: [
      {
        name: "Predictive Maintenance",
        href: "/ai-agency/manufacturing/maintenance",
        icon: "wrench",
        description: "AI-driven equipment monitoring and maintenance scheduling.",
        badge: "Industrial"
      },
      {
        name: "Quality Control AI",
        href: "/ai-agency/manufacturing/quality",
        icon: "check-circle",
        description: "Automated quality inspection and defect detection.",
        badge: "Quality"
      },
      {
        name: "Supply Chain Optimization",
        href: "/ai-agency/manufacturing/supply-chain",
        icon: "truck",
        description: "Intelligent supply chain management and logistics.",
        badge: "Logistics"
      }
    ]
  },
  {
    name: "Retail & E-commerce",
    list: [
      {
        name: "Personalization Engine",
        href: "/ai-agency/retail/personalization",
        icon: "user-check",
        description: "AI-powered product recommendations and personalization.",
        badge: "Retail"
      },
      {
        name: "Inventory Intelligence",
        href: "/ai-agency/retail/inventory",
        icon: "package",
        description: "Smart inventory management and demand forecasting.",
        badge: "Inventory"
      },
      {
        name: "Price Optimization",
        href: "/ai-agency/retail/pricing",
        icon: "dollar-sign",
        description: "Dynamic pricing strategies and competitor analysis.",
        badge: "Pricing"
      }
    ]
  }
];

export const aiAgencyProducts = [
  {
    name: "Core AI Solutions",
    list: [
      {
        name: "Enterprise AI Suite",
        href: "/ai-agency/products/enterprise-suite",
        icon: "building",
        description: "Complete AI transformation toolkit for large organizations.",
        badge: "Enterprise"
      },
      {
        name: "AI Workflow Automation",
        href: "/ai-agency/products/workflow-automation",
        icon: "workflow",
        description: "Streamline business processes with intelligent automation.",
        badge: "Automation"
      },
      {
        name: "Custom AI Development",
        href: "/ai-agency/products/custom-development",
        icon: "code",
        description: "Bespoke AI solutions tailored to your specific needs.",
        badge: "Custom"
      }
    ]
  },
  {
    name: "AI Analytics & Intelligence",
    list: [
      {
        name: "Predictive Analytics Platform",
        href: "/ai-agency/products/predictive-analytics",
        icon: "trending-up",
        description: "Advanced forecasting and trend analysis capabilities.",
        badge: "Analytics"
      },
      {
        name: "Business Intelligence AI",
        href: "/ai-agency/products/business-intelligence",
        icon: "bar-chart",
        description: "Transform data into actionable business insights.",
        badge: "Intelligence"
      },
      {
        name: "Real-time Decision Engine",
        href: "/ai-agency/products/decision-engine",
        icon: "zap",
        description: "Instant AI-powered decision making and recommendations.",
        badge: "Real-time"
      }
    ]
  },
  {
    name: "AI Communication & Support",
    list: [
      {
        name: "Conversational AI Platform",
        href: "/ai-agency/products/conversational-ai",
        icon: "message-square",
        description: "Advanced chatbots and virtual assistants.",
        badge: "Communication"
      },
      {
        name: "Voice AI Solutions",
        href: "/ai-agency/products/voice-ai",
        icon: "mic",
        description: "Speech recognition and voice-enabled applications.",
        badge: "Voice"
      },
      {
        name: "Multilingual AI Support",
        href: "/ai-agency/products/multilingual-support",
        icon: "globe",
        description: "AI solutions supporting multiple languages and regions.",
        badge: "Global"
      }
    ]
  }
];

// Hackwire news system for real-time news and AI-powered content
export const hackwireMenu = [
  {
    name: "Newswire",
    description: "Real-time news feed with AI-powered insights",
    href: "/hackwire/newswire",
    icon: "newspaper",
    color: "cyan",
    badge: "Live",
    features: [
      { name: "Real-time News Feed", description: "Latest headlines from trusted sources" },
      { name: "AI Content Analysis", description: "Intelligent categorization and insights" },
      { name: "Breaking News Alerts", description: "Instant notifications for major events" }
    ]
  },
  {
    name: "Control Panel",
    description: "Advanced news stream management and AI monologue generation",
    href: "/hackwire/control-panel",
    icon: "settings",
    color: "purple",
    badge: "Pro",
    features: [
      { name: "Stream Configuration", description: "Customize news feeds and overlays" },
      { name: "AI Monologue Generator", description: "Create engaging commentary with OpenAI" },
      { name: "Custom Headlines", description: "Manage and curate your own news content" }
    ]
  },
  {
    name: "Live",
    description: "Live streaming overlay and broadcast tools",
    href: "/hackwire/live",
    icon: "radio",
    color: "red",
    badge: "Streaming",
    features: [
      { name: "OBS Integration", description: "Browser source overlay for streaming" },
      { name: "Real-time Ticker", description: "Scrolling news ticker for broadcasts" },
      { name: "Breaking News Overlay", description: "Dynamic alerts for live streams" }
    ]
  }
];

// Education paths for AI-Education dropdown
export const educationPaths = [
  {
    name: "AI-Architect",
    description: "Master the art of AI system design and strategy",
    href: "/ai-education/architect",
    icon: "brain",
    color: "teal",
    difficulty: "Strategist",
    modules: [
      { name: "AI System Architecture", progress: 0 },
      { name: "Strategic AI Planning", progress: 0 },
      { name: "AI Ethics & Governance", progress: 0 }
    ]
  },
  {
    name: "AI-Engineer", 
    description: "Build and implement cutting-edge AI solutions",
    href: "/ai-education/engineer",
    icon: "code",
    color: "blue",
    difficulty: "Builder",
    modules: [
      { name: "Machine Learning Engineering", progress: 0 },
      { name: "AI Model Development", progress: 0 },
      { name: "Production AI Systems", progress: 0 }
    ]
  },
  {
    name: "AI-DevSecOps",
    description: "Secure and protect AI infrastructures",
    href: "/ai-education/devsecops", 
    icon: "shield",
    color: "purple",
    difficulty: "Guardian",
    modules: [
      { name: "AI Security Fundamentals", progress: 0 },
      { name: "Secure AI Deployment", progress: 0 },
      { name: "AI Risk Management", progress: 0 }
    ]
  }
];

// Updated navigation structure
export const navLinks = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "AI-Agency",
    menu: {
      industries: industries,
      products: aiAgencyProducts
    }
  },
  {
    name: "AI-Education",
    menu: educationPaths
  },
  {
    name: "AI-Products",
    href: "/ai-products"
  },
  {
    name: "Hackwire",
    menu: hackwireMenu
  },
  {
    name: "Latest News",
    href: "/latest-news"
  },
  {
    name: "About Us",
    href: "/about"
  }
];

export type NavLink = (typeof navLinks)[number];
export type IndustryPanel = typeof industries;
export type ProductPanel = typeof aiAgencyProducts;
export type EducationPath = typeof educationPaths;
export type HackwireMenu = typeof hackwireMenu;
