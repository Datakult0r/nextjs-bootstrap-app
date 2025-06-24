export default {
  name: "Clinic of AI",
  description: "Customize AI for your needs",
  url: "https://www.clinicofai.com",
  ogImage: "https://www.clinicofai.com/og-image.jpg",
  address: "Kreuzstrasse 24, 8008 Zürich, Switzerland",
  phoneNumber: "+41 79 960 84 77",
  socials: {
    github: "https://github.com/coai",
    linkedin: "https://www.linkedin.com/company/clinic-of-ai",
    twitch: "https://www.twitch.tv/clinicofai",
    youtube: "https://www.youtube.com/channel/UCQI0R5JZ2O94yOFvAe6M8uw",
    x: "https://twitter.com/ClinicofAI",
    reddit: "https://www.reddit.com/user/plasticmindcast/",
    tiktok: "https://www.tiktok.com/@clinic_of_ai",
    instagram: "https://www.instagram.com/clinicofai.communication/",
    facebook: "https://www.facebook.com/profile.php?id=61559432771170",
  },
  email: "communication@clinicofai.com",
  chatbot: {
    ghl: {
      widgetId: "6747394e29fc591edbcaccce",
      loaderUrl: "https://widgets.leadconnectorhq.com/loader.js",
      chatWidgetUrl: "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
    },
  },
  whatsapp: {
    link: "https://wa.link/g7avv0",
  },
  bookings: {
    ava: {
      id: "T4GNZOQZ8OscdQXtBhOs_1732720366789",
      url: "https://api.leadconnectorhq.com/widget/booking/T4GNZOQZ8OscdQXtBhOs"
    },
    discoveryCall: {
      id: "Nx1uj9hpUtMgXrp6FcgY_1732720304666",
      url: "https://api.leadconnectorhq.com/widget/booking/Nx1uj9hpUtMgXrp6FcgY"
    }
  },
  turnstile: {
    siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA", // Public key for client-side
    // Do not expose secret key here - it must only be accessed from server components/API routes
  }
} as const;
