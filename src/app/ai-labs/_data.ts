import { Settings, Keyboard, BarChart3, Users } from "lucide-react";
import config from "@/app/config";

/* eslint-disable import/no-anonymous-default-export */
export default {
  hero: {
    title: "First Movers R&D AI Labs",
    heading: "Upskill Into a New Playing Field with First Movers R&D AI Labs",
    paragraph: "Launching Q1 2025, our First Movers R&D AI Labs is a fresh, powerful and vibrant way to learn AI skills. One simple monthly fee, access EVERYTHING in the Labs.",
    videosrc: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/6790dcf2c21e375952ac5283.mp4",
  },
  sectionA: {
    title: "WHY GRANTS STACK?",
    heading: "A streamlined solution customized to your ecosystem's needs.",
    cta: {
      label: "Book a Call",
      formId: config.bookings.discoveryCall.id,
      formUrl: config.bookings.discoveryCall.url,
    },
    features: [
      {
        icon: Settings,
        label: "FUNDING YOUR WAY",
        description: "Launch and manage a Direct Grants or Quadratic Funding round with ease"
      },
      {
        icon: Keyboard,
        label: "BUILD ONCHAIN REP", 
        description: "Empower grant applicants to mobilize their community while building onchain reputation"
      },
      {
        icon: BarChart3,
        label: "BOOST ENGAGEMENT",
        description: "Incentivize your community to vote or build to help grow your ecosystem"
      },
      {
        icon: Users,
        label: "DISTRIBUTE FUNDS",
        description: "Easily distribute funds directly to projects based on your chosen criteria"
      }
    ]
  },
  sectionF: {
    paragraphOne: "Our full-stack squad is always catching the latest tech waves, trading insights and ideas in an endless loop of awesomeness.",
    paragraphTwo: "We're a team of passionate developers, designers, and strategists who are dedicated to helping you build the next big thing. We're not just a team, we're a family, and we're here to help you succeed.",
    options: [
      {
        label: "Strategy",
        description: "Mapping the digital landscape and charting the course forward",
        color: "bg-coral text-coral-foreground"
      },
      {
        label: "Design",
        description: "Crafting intuitive and engaging user experiences",
        color: "bg-teal text-teal-foreground"
      },
      {
        label: "Development",
        description: "Building robust solutions with cutting-edge technologies",
        color: "bg-navy text-navy-foreground"
      },
      {
        label: "Development",
        description: "Building robust solutions with cutting-edge technologies",
        color: "bg-mustard text-mustard-foreground"
      }
    ]
  },
  sectionB: {
    title: "Choose the way that works for you",
    paragraph: "Grants Stack offers two powerful funding mechanisms to streamline grants",
    options: [
      {
        label: "Direct Grants",
        isNew: true,
        title: "Quickly fund specific projects for your community",
        points: [
          "Kickstart the development of a project or help reach a targeted milestone with a predetermined amount of funding",
          "Perfect for early-stage communities and ecosystems with clear project objectives", 
          "Return high short-term value to fill gaps or needs in your ecosystem"
        ]
      },
      {
        label: "Quadratic Funding",
        isNew: false,
        title: "Distribute funding based on community support",
        points: [
          "Distribute matching funds to projects that get the most support from the greatest number of people",
          "Automatically increase your impact by crowdfunding additional funds that further fuel ecosystem innovation",
          "Enable supporters to vote with their capital on the projects they care about most"
        ]
      },
      {
        label: "Quadratic Funding",
        isNew: false,
        title: "Distribute funding based on community support", 
        points: [
          "Distribute matching funds to projects that get the most support from the greatest number of people",
          "Automatically increase your impact by crowdfunding additional funds that further fuel ecosystem innovation",
          "Enable supporters to vote with their capital on the projects they care about most"
        ]
      }
    ],
    cta: {
      label: "Schedule a Demo",
      formId: config.bookings.discoveryCall.id,
      formUrl: config.bookings.discoveryCall.url,
    }
  },
  sectionD: {
    title: "Why First Movers R&D AI Labs?",
    heading: "In today’s rapidly changing AI landscape, early adopters become tomorrow’s market leaders. Don’t wait to react—equip yourself to define the industry’s direction.",
    cta: {
      label: "Claim Your Spot",
      formId: config.bookings.discoveryCall.id,
      formUrl: config.bookings.discoveryCall.url,
    },
    videosrc: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/6790dcf2c21e375952ac5283.mp4",
  },
  sectionE: {
    heading: "In today’s rapidly changing AI landscape, early adopters become tomorrow’s market leaders. Don’t wait to react—equip yourself to define the industry’s direction.",
  },
  sectionC: {
    faqs: [
      {
        id: "1",
        question: "What is the First Movers R&D AI Labs?",
        answer: "The First Movers R&D AI Labs is a new way to learn AI skills. It's a community of people who are passionate about AI and want to learn more about it."
      },
      {
        id: "2",
        question: "How do I participate in the AI Labs program?",
        answer: "You can join by applying through our website portal. Selected participants will receive onboarding materials and access to our collaborative learning platform."
      },
      {
        id: "3",
        question: "What prerequisites are required to join?",
        answer: "Basic programming knowledge and familiarity with machine learning concepts are recommended. We welcome enthusiasts from diverse backgrounds who are motivated to learn."
      },
      {
        id: "4",
        question: "What time commitment is expected?",
        answer: "The program is designed for working professionals, requiring approximately 10-15 hours per week for optimal progress through the curriculum and projects."
      },
      {
        id: "5",
        question: "Are there any costs involved?",
        answer: "The core program is free for selected participants. Optional premium features like cloud compute credits and expert mentoring sessions are available at additional cost."
      },
      {
        id: "6",
        question: "What outcomes can I expect?",
        answer: "Participants gain practical AI development skills, build portfolio projects, and join an alumni network of AI professionals. Top performers may receive career opportunities."
      }
    ]
  }
}
