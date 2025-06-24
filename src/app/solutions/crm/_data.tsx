/* eslint-disable import/no-anonymous-default-export */

import { 
  PenLine,
  Brain, 
  Zap, 
  Shield,
  Settings,
  BarChart2, 
  Smartphone,
  FileCheck
} from "lucide-react";

export interface Feature {
  icon: typeof PenLine;
  title: string;
  paragraph: string;
  iconBgColor: string;
  iconColor: string;
}

export default {
  hero: {
    title: "Nexus AI CRM Platform",
    heading: "AI-Powered CRM That Transforms Customer Relationships",
    paragraph: "Experience the future of customer relationship management with Nexus AI CRM - where artificial intelligence meets enterprise-grade relationship building to drive unprecedented growth and efficiency.",
    cta: {
      label: "Schedule Demo",
    }
  },
  solutionOverview: {
    title: "Why Nexus?",
    heading: "Beyond Traditional CRM - Your AI-Powered Growth Engine",
    paragraph: "Nexus combines cutting-edge AI with enterprise CRM capabilities to deliver unprecedented results:",
    features: [
      {
        icon: PenLine,
        heading: "AI Deal Intelligence",
        paragraph: "Predictive analytics and smart opportunity scoring",
        iconBgColor: "bg-navy-subtle border border-navy-subtle-foreground",
        iconColor: "text-navy-subtle-foreground"
      },
      {
        icon: Brain,
        heading: "Smart Assistant",
        paragraph: "Context-aware recommendations and automated tasks",
        iconBgColor: "bg-mustard-subtle border border-mustard",
        iconColor: "text-mustard-subtle-foreground"
      },
      {
        icon: Zap,
        heading: "Real-time Insights",
        paragraph: "Live customer behavior tracking and analysis",
        iconBgColor: "bg-coral-subtle border border-coral",
        iconColor: "text-coral-subtle-foreground"
      },
      {
        icon: Shield,
        heading: "Enterprise Security",
        paragraph: "Military-grade encryption and compliance",
        iconBgColor: "bg-teal-subtle border border-teal",
        iconColor: "text-teal-subtle-foreground"
      }
    ]
  },
  benefits: {
    title: "Impact",
    heading: "Proven Results Within First Month",
    paragraph: "Our customers consistently report these transformative outcomes:",
    benefits: [
      { title: "5.2x ROI on platform investment" },
      { title: "72% faster deal velocity" },
      { title: "22hr/month saved per employee" },
      { title: "95% user adoption rate" },
      { title: "Real-time customer insights" },
      { title: "15min average response time" }
    ]
  },
  howItWorks: {
    title: "Implementation",
    heading: "Your Journey to AI-Powered CRM",
    paragraph: "A streamlined four-step process to transform your customer relationships.",
    process: [
      {
        number: "01",
        heading: "Smart Onboarding",
        description: "AI-driven data migration and setup",
        image: {
          src: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67a5483ccb87a7687c53807e.jpeg",
          alt: "AI onboarding process"
        }
      },
      {
        number: "02",
        heading: "AI Configuration",
        description: "Intelligent workflow customization",
        image: {
          src: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67a54962a25bdd44eeac6068.jpeg",
          alt: "AI configuration"
        }
      },
      {
        number: "03",
        heading: "Integration",
        description: "Seamless tech stack synchronization",
        image: {
          src: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67a549cd100f290269f64660.jpeg",
          alt: "System integration"
        }
      },
      {
        number: "04",
        heading: "Optimization",
        description: "Continuous AI learning and adaptation",
        image: {
          src: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67a54aaa3553cd13f0a77b6f.jpeg",
          alt: "AI optimization"
        }
      }
    ]
  },
  features: {
    title: "Key Features",
    heading: "AI-Powered Features That Drive Results",
    items: [
      {
        icon: Settings,
        heading: "Intelligent Automation",
        paragraph: "Self-optimizing workflows and processes"
      },
      {
        icon: BarChart2,
        heading: "Predictive Analytics",
        paragraph: "AI-driven forecasting and insights"
      },
      {
        icon: Smartphone,
        heading: "Smart Mobile CRM",
        paragraph: "AI-enhanced mobile experience"
      },
      {
        icon: FileCheck,
        heading: "Compliance AI",
        paragraph: "Automated regulatory compliance"
      }
    ]
  },
  testimonials: {
    quotes: [
      {
        id: 1,
        quote: "The AI-powered insights have revolutionized how we understand and serve our customers. Revenue is up 45% since implementation.",
        author: {
          name: "Emma Wilson",
          title: "VP Sales, TechScale",
          avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/679716e664e3cc38eaf1cee9.jpeg"
        }
      },
      {
        id: 2,
        quote: "The predictive lead scoring has transformed our sales approach. We're seeing a 35% higher conversion rate.",
        author: {
          name: "Diego Martinez",
          title: "Growth Lead, SaaS.co",
          avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/679716ef64e3cc28e9f1ceec.webp"
        }
      },
      {
        id: 3,
        quote: "AI automation has eliminated 80% of our manual data entry. Our team can finally focus on strategic activities.",
        author: {
          name: "Sarah Chen",
          title: "Sales Director, CloudTech",
          avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/679716f864e3ccf551f1cf04.webp"
        }
      },
      {
        id: 4,
        quote: "The AI assistant's meeting summaries and follow-up suggestions are incredibly accurate. It's like having a digital sales coach.",
        author: {
          name: "Michael Brown",
          title: "Operations Manager, GrowthCo",
          avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/679717086a58c4133e20b375.webp"
        }
      },
      {
        id: 5,
        quote: "Real-time AI insights during customer calls have boosted our upsell success rate by 40%.",
        author: {
          name: "Lisa Rodriguez",
          title: "Field Sales Lead, Enterprise Solutions",
          avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67971716c21e3785eabb9cb5.webp"
        }
      },
      {
        id: 6,
        quote: "The AI-driven pipeline analysis caught deals we would have missed. It's like having a second brain for sales.",
        author: {
          name: "James Kim",
          title: "Marketing Director, B2B Solutions",
          avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/6797171f6a58c46a9820b382.jpeg"
        }
      },
      {
        id: 7,
        quote: "Predictive analytics have made our forecasting 90% more accurate. Board meetings are much easier now.",
        author: {
          name: "Rachel Thompson",
          title: "Revenue Officer, SalesPro",
          avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/679717286a58c4045e20b386.jpeg"
        }
      },
      {
        id: 8,
        quote: "The AI learning curve is surprisingly gentle. New hires are productive within days, not weeks.",
        author: {
          name: "David Patel",
          title: "Training Manager, ScaleUp Inc",
          avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67971730c21e3746ffbb9cc5.jpeg"
        }
      },
      {
        id: 9,
        quote: "AI-powered compliance checks have reduced our risk exposure while saving countless hours.",
        author: {
          name: "Sophie Anderson",
          title: "Compliance Head, DataSec",
          avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/6797174ec21e37ccf0bb9ccf.jpeg"
        }
      },
      {
        id: 10,
        quote: "The AI insights have helped us reduce churn by 50%. Customer retention has never been stronger.",
        author: {
          name: "Alex Foster",
          title: "CEO, GrowthMetrics",
          avatar: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67971780c21e375bbdbb9ce5.jpeg"
        }
      }
    ]
  },
  outro: {
    title: "Transform Your Customer Relationships",
    description: "Join 3,000+ companies leveraging AI to drive growth:",
    contactButton: "Start Free Trial",
    images: [
      { src: "/nexus-mobile-ai.jpg", alt: "AI Mobile Experience", width: 800, height: 600 },
      { src: "/nexus-insights.jpg", alt: "Predictive Dashboard", width: 800, height: 600 },
      { src: "/nexus-automation.jpg", alt: "AI Workflow Engine", width: 800, height: 600 }
    ],
    stats: [
      { number: "99.99%", label: "AI Uptime" },
      { number: "4.9/5", label: "User Rating" },
      { number: "30s", label: "AI Response Time" }
    ]
  },
  cta: {
    title: "Experience AI CRM",
    heading: "See how AI can transform your customer relationships",
    paragraph: "Schedule a personalized demo to discover how our AI-powered CRM can drive growth for your business.",
    button: {
      label: "Book Demo"
    },
    image: {
      src: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67971a3c4f0aeb52025cbb54.webp",
      alt: "AI CRM Demo"
    }
  }
};
