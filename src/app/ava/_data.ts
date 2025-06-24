import config from "@/app/config";

export const avaContent = {
  hero: {
    title: "From hoteliers to hoteliers",
    heading: "Transform hospitality operations with AVA and See how AI can elevate your service today.",
    paragraph: "Let us show you how our Personalized Voice Agent can Simplify Hospitality Operations. Delight Your Guests with AVA, Your 24/7 AI Concierge, using the most advanced voice technology.",
    image: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67a531244325e175f15172af.jpeg",
    cta: {
      label: "Book a Call",
      formId: config.bookings.ava.id,
      formUrl: config.bookings.ava.url,
    }
  },
  introduction: {
    title: "Hoteliers for Hoteliers",
    heading: "AVA is an intelligent virtual assistant specifically designed for the hospitality industry.",
    paragraph: "In the dynamic world of hospitality, delivering exceptional guest experiences while managing daily operations can be challenging. Introducing AVA, your AI-powered virtual assistant designed to streamline your business, enhance guest satisfaction, and boost efficiency around the clock.",
    video: {
      src: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/678a891b671b4d807ced0b35.mp4",
      thumbnail: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/6790d9cd427b592eaf748291.webp",
      alt: "AVA introduction video"
    }
  },
  benefits: {
    title: "Benefits",
    heading: "Experience increased revenue, reduced costs, and enhanced guest satisfaction.",
    description: "Discover how AVA can transform your hospitality or dining business with AI-powered efficiency, 24/7 customer service, and streamlined operations.",
    items: [
      {
        label: "Personalized messaging",
        title: "Your hotel guests receive instant, personalized attention at any hour.",
        imgSrc: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67b2f45870fcfe78b12689a9.webp",
      },
      {
        label: "Timely Communication", 
        title: "Your restaurant never misses a booking call, even during the busiest rush",
        imgSrc: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67b2f4582aa0e927b9efde18.webp",
      },
      {
        label: "Internationalization",
        title: "Language barriers disappear, welcoming global travelers and diners",
        imgSrc: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67b2f4582de3ab21089d6a6f.webp",
      },
      {
        label: "Routing Automation",
        title: "Routine tasks are automated, freeing your staff to create memorable experiences",
        imgSrc: "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67b2f4582de3abde149d6a6e.webp",
      },
    ]
  },
  method: {
    title: "How It Works",
    heading: "Streamlined hotel management support",
    description: "AVA's implementation process combines technical expertise with hospitality industry knowledge",
    cta: {
      label: "Book a call",
      formId: config.bookings.ava.id,
      formUrl: config.bookings.ava.url,
    },
    items: [
      {
        label: "Seamless Integration",
        description: "AVA works with your existing tools and systems, from hotel management software to restaurant POS systems.",
        icon: "settings",
        className: "bg-[#233171] text-white",
      },
      {
        label: "Continuous Learning",
        description: "AVA improves over time, adapting to your unique business needs and guest preferences.",
        icon: "brain",
        className: "bg-[#46DDF4] text-slate-950",
      },
      {
        label: "Real-Time Assistance",
        description: "Handle live inquiries instantly, from room service requests to last-minute table bookings.",
        icon: "timer",
        className: "bg-[#E0E8EB] text-slate-950",
      },
      {
        label: "Easy Setup",
        description: "No coding required. Customize AVA to match your brand voice and service standards.",
        icon: "bolt",
        className: "bg-[#DC8100] text-white",
      },
    ]
  },
  feature: {
    title: "From Hoteliers to Hoteliers",
    heading: "Why choose AVA?",
    description: "Discover how AVA can transform your hospitality or dining business with AI-powered efficiency, 24/7 customer service, and streamlined operations.",
    items: [
      {
        label: "24/7 Support",
        description: "Never miss a booking or reservation. AVA operates around the clock, ensuring no opportunity is lost.",
      },
      {
        label: "Multilingual Capabilities",
        description: "Communicate effortlessly with guests in multiple languages, breaking down language barriers.",
      },
      {
        label: "Automated Operations",
        description: "Streamline check-ins, reservations, and customer service tasks with intelligent automation.",
      },
      {
        label: "System Integration",
        description: "Seamlessly integrate with your existing systems (PMS, CRM, POS) for unified operations.",
      },
      {
        label: "Smart Recommendations",
        description: "Offer tailored suggestions for rooms, dining options, and local activities based on guest preferences.",
      },
      {
        label: "Guest Memory",
        description: "Remember returning guests and their preferences to provide consistent, personalized service.",
      },
      {
        label: "Revenue Optimization",
        description: "Increase bookings with 24/7 availability and intelligent pricing strategies.",
      },
      {
        label: "Upselling Intelligence",
        description: "Strategically promote services and amenities to improve guest satisfaction and boost revenue.",
      },
    ]
  },
  testimonials: {
    title: "Testimonials",
    heading: "What Our Clients are saying...",
    items: [
      {
        quote: "Since implementing AVA, our guest satisfaction scores have increased by 35%. The 24/7 multilingual support has been particularly valuable for our international clientele.",
        name: "Isabella Martinez",
        title: "General Manager",
        company: "The Ritz-Carlton Barcelona",
        image: "/image/avatar/client-1.jpg",
      },
      {
        quote: "AVA has revolutionized our reservation system. We've reduced no-shows by 60% and increased our average table turnover. The automated reminders and confirmation system is a game-changer.",
        name: "David Chang",
        title: "Executive Chef & Owner",
        company: "Momofuku Group",
        image: "/image/avatar/client-2.jpg",
      },
      {
        quote: "The ROI with AVA has been remarkable. We've cut operational costs by 25% while improving our response time to guest requests from hours to minutes. It's transformed how we do business.",
        name: "Alexandra Dubois",
        title: "Operations Director",
        company: "Sofitel Paris Le Faubourg",
        image: "/image/avatar/client-3.jpg",
      },
    ]
  },
  faq: {
    title: "Frequently asked questions",
    heading: "Everything you need to know about the product and billing.",
    items: [
      {
        question: "What is AVA?",
        answer: "AVA is an AI-powered virtual assistant designed for the hospitality industry, handling tasks like reservations, customer inquiries, and basic operations to enhance guest experiences and streamline business processes.",
      },
      {
        question: "How does AVA integrate with my existing systems?",
        answer: "AVA seamlessly integrates with your current Property Management System (PMS), Customer Relationship Management (CRM), and Point of Sale (POS) systems, ensuring a smooth transition and unified operations.",
      },
      {
        question: "What languages does AVA support?",
        answer: "AVA currently supports 12 major languages including English, Spanish, French, German, Mandarin, and Arabic, with more being added regularly.",
      },
      {
        question: "How long does implementation take?",
        answer: "Most implementations are completed within 2-4 weeks, depending on the complexity of your existing systems and customization requirements.",
      },
    ]
  },
  // Add other sections similarly
}; 