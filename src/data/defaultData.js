export const DEFAULT_PORTFOLIO_DATA = {
  hero: {
    greeting: "Hello, I'm",
    name: "Ganindu Pabasara",
    title_1: "Full Stack",
    title_2: "Developer",
    statusBadge: "Ready to Innovate",
    description: "Designing Responsive, Innovative, and User-Centric Websites with Seamless Full Stack & IoT Solutions. Transforming complex problems into elegant digital experiences.",
    avatar: "/images/developer.png",
    resumeUrl: "/Ganindu Wickramasinghe_CV.pdf.pdf",
    resumeFileName: "Ganindu_Wickramasinghe_Resume.pdf",
    tech_stack: ["React", "Javascript", "Node.js", "Tailwind", "Python", "Framer", "Three.js", "MongoDB"],
    socials: [
      { id: "github", label: "GitHub", url: "https://github.com/Ganindu-ui" },
      { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/ganindu-wickramasinghe/" },
      { id: "instagram", label: "Instagram", url: "https://www.instagram.com/ganindu_wickramasinghe/" }
    ]
  },
  about: {
    subtitle: "Who I Am",
    title: "Passionate About Technology & Innovation",
    image: "/images/me.jpg",
    caption: "Working on the Next Big Thing 🚀",
    desc_1: "I’m Ganindu Pabasara, a tech enthusiast from Sri Lanka with a deep love for creating digital solutions that matter. My journey began with breaking apart electronic toys to see how they worked, which naturally evolved into a career in Full Stack Development and IoT Engineering.",
    desc_2: "I believe that code is more than just syntax; it's a tool to solve real-world problems. Whether I'm optimizing a database query or soldering a sensor to a microcontroller, I bring the same level of dedication and curiosity to every task.",
    stats: [
      { id: "stat_1", label: "Years Experience", number: "02+" },
      { id: "stat_2", label: "Projects Completed", number: "8+" },
      { id: "stat_3", label: "Happy Clients", number: "3+" }
    ]
  },
  skills: [
    {
      id: "skill_1",
      title: "Frontend Architecture",
      desc: "Building complex SPAs with React, Redux, and modern CSS frameworks like Tailwind and Bootstrap.",
      level: "90%",
      category: "Frontend",
      icon: "code"
    },
    {
      id: "skill_2",
      title: "Backend Engineering",
      desc: "Designing RESTful APIs using Python (Flask/Django) and Node.js. Database management with SQL & NoSQL.",
      level: "85%",
      category: "Backend",
      icon: "server"
    },
    {
      id: "skill_3",
      title: "IoT Integration",
      desc: "Bridging the gap between hardware and software using Arduino, Raspberry Pi, and MQTT protocols.",
      level: "80%",
      category: "IoT",
      icon: "microchip"
    },
    {
      id: "skill_4",
      title: "Algorithmic Logic",
      desc: "Advanced problem-solving capabilities, data structure optimization, and performance analysis.",
      level: "95%",
      category: "CS Logic",
      icon: "brain"
    },
    {
      id: "skill_5",
      title: "Database Management",
      desc: "Architecting efficient schemas in PostgreSQL, MySQL, and MongoDB for scalable applications.",
      level: "80%",
      category: "Database",
      icon: "database"
    },
    {
      id: "skill_6",
      title: "Cloud & DevOps",
      desc: "Deploying scalable applications using Docker, AWS, and CI/CD pipelines for automated testing.",
      level: "70%",
      category: "Cloud",
      icon: "cloud"
    }
  ],
  projects: [
    {
      id: "proj_1",
      title: "Smart Inventory System",
      date: "Feb 2026",
      images: ["/images/SmartStock.png", "/images/SmartStock2.png"],
      desc: "A full-stack inventory management system for tracking stock, managing products, and monitoring real-time inventory updates with an intuitive dashboard.",
      tags: ["React", "Python", "Supabase", "PostgreSQL"],
      link: "#",
      repo: "https://github.com/Ganindu-ui/SmartInventory.git",
      status: "completed",
      isPinned: true,
      order: 1
    },
    {
      id: "proj_2",
      title: "Liwexa",
      date: "March 2026",
      images: ["/images/liwexa_1.png", "/images/liwexa_2.png"],
      desc: "Liwexa is a collaborative full-stack legal-tech platform for managing and previewing laws and court judgments. I contributed to the frontend development, implementing dynamic search, categorized filtering, and an interactive judgment preview system, while working as part of a team following structured development practices.",
      tags: ["React", "Python", "Supabase", "PostgreSQL", "Tailwind"],
      link: "https://liwexa.com",
      repo: "",
      status: "ongoing",
      isPinned: true,
      order: 2
    },
    {
      id: "proj_13",
      title: "Hotel Management System - Nuwara Eliya",
      date: "Oct 2026",
      images: [],
      desc: "A complete hotel management platform built as an eSupport group project, covering rooms and cottages, reservations with online booking, food ordering, housekeeping, laundry, maintenance, employee attendance and payroll, and an accounting automation engine that syncs ledger entries in real time (trial balance, balance sheet, income statement, cash flow). I owned the user management system end to end: account CRUD, role management across six roles (admin, manager, reception, kitchen, staff, user), area-scoped permissions, and profile/password flows.",
      tags: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind"],
      link: "#",
      repo: "https://github.com/eSupportTechnology/Hotel-Nuwaraeliya.git",
      status: "completed",
      isPinned: false,
      order: 3
    },
    {
      id: "proj_9",
      title: "NexaBot",
      date: "Oct 2026",
      images: [],
      desc: "A multi-tenant AI chatbot SaaS with an integrated RAG system. Businesses create bots and attach knowledge bases fed by manual FAQ entries and uploaded documents; an ingestion pipeline (extract → clean → chunk → embed → store) indexes them into PostgreSQL pgvector, and tenant-safe retrieval with a confidence gate and conversation memory grounds every answer. A NestJS/Fastify API on PostgreSQL 16 + Redis with strict tenant isolation (signed tenant scope + RLS), a provider abstraction letting Gemini or Anthropic power chat without the AI key ever leaving the server, and origin-bound public chat auth for embeddable widgets. Core chat + RAG runtime is live; admin panel, billing and the embeddable widget bundle are next.",
      tags: ["TypeScript", "Node.js", "NestJS", "PostgreSQL", "pgvector", "Redis", "RAG", "Gemini", "Anthropic"],
      link: "#",
      repo: "https://github.com/Ganindu-ui/NexaBot.git",
      status: "ongoing",
      isPinned: false,
      order: 4
    },
    {
      id: "proj_11",
      title: "Sunworth Solar E-Commerce",
      date: "Oct 2026",
      images: [],
      desc: "A mobile-responsive full-stack e-commerce web application and certified solar hardware store for Sunworth Solar Engineering (client: Mr. Janaka Madawa Thilakarathne). Includes a modular landing page, shop with touch-friendly cart drawer and mobile checkout, project showcase, and lead-capture contact flow, backed by an admin CMS for products, projects, leads, content and media uploads. React 19 + Tailwind v4 frontend with a Node/Express + SQLite API secured by JWT auth. UI approved by the client — development and feature build-out ongoing.",
      tags: ["React", "TypeScript", "Vite", "Tailwind", "Framer Motion", "Node.js", "Express", "SQLite", "JWT"],
      link: "#",
      repo: "https://github.com/Ganindu-ui/solar-system-website.git",
      status: "ongoing",
      isPinned: false,
      order: 5
    },
    {
      id: "proj_12",
      title: "Sapphire Story - Team Build",
      date: "Oct 2026",
      images: [],
      desc: "A group build of The Sapphire Story platform for a Sri Lankan gemstone business — the luxury Next.js storefront and a staff-only React/Redux admin panel for inventory, sales and operations, backed by a Laravel 12 REST API with MySQL. Contributed key UI parts of the storefront and built out admin panel screens, working as part of the eSupport team, shipped through the org repo's GitHub Actions CI/CD deploy pipeline to cPanel.",
      tags: ["Next.js", "Laravel", "React", "Redux Toolkit", "Tailwind", "GitHub Actions"],
      link: "#",
      repo: "https://github.com/eSupportTechnology/Sapphire_Retail.git",
      status: "completed",
      isPinned: false,
      order: 6
    },
    {
      id: "proj_10",
      title: "eSupport Digital Marketing Portfolio",
      date: "Sept 2026",
      images: [],
      desc: "A completed corporate portfolio website for eSupport Technologies, a Colombo-based full-service digital marketing and web development agency. Presents the agency's services (web development, SEO, ERP systems, digital marketing), key stats (150+ projects, 45+ brands, 300+ campaigns), its working approach, team and brand models, plus a call-to-action flow. Built as a polished marketing site with animated sections and interactive stat visuals.",
      tags: ["React", "TypeScript", "Vite", "Tailwind", "Framer Motion", "Recharts"],
      link: "#",
      repo: "https://github.com/Ganindu-ui/eSupport-Portfolio.git",
      status: "completed",
      isPinned: false,
      order: 7
    },
    {
      id: "proj_6",
      title: "Success Club Booking System",
      date: "Sept 2026",
      images: ["/images/booking_system_1.png", "/images/booking_system_2.png"],
      desc: "A production-grade consultation booking platform built for Dr. Malalasekera (Success Club), embedded into the clinic's WordPress website. Guides clients through a 5-step flow — service selection, real-time availability, intake details, PayHere payment and confirmation — with automated Email/WhatsApp/SMS notifications, two-way Google Calendar sync, and a secure admin dashboard for managing services, availability, bookings and payments.",
      tags: ["React", "Node.js", "TypeScript", "Express", "Prisma", "MySQL", "PayHere", "Google Calendar API", "Twilio", "Tailwind"],
      link: "#",
      repo: "https://github.com/Ganindu-ui/Dr.-Malalasekera-Bokking-System.git",
      status: "completed",
      isPinned: true,
      order: 8
    },
    {
      id: "proj_7",
      title: "The Sapphire Story",
      date: "Sept 2026",
      images: ["/images/ceyblu_web.png", "/images/ceyblu_gems.png"],
      desc: "A complete e-commerce platform for a Sri Lankan sapphire and gemstone business, built in two weeks with client-approved UI. Next.js luxury storefront (catalog with filtering, cart & checkout, custom gem inquiries, wishlist, order tracking) backed by a Laravel 12 REST API with Sanctum auth and MySQL, plus a staff-only React/Redux ERP covering inventory, sales, HR, finance and reports with QR/barcode scanning, PDF invoicing and Excel exports — all shipped through GitHub Actions CI/CD to cPanel.",
      tags: ["Next.js", "Laravel", "React", "TypeScript", "MySQL", "Redux Toolkit", "Tailwind", "Sanctum", "GitHub Actions"],
      link: "https://thesapphirestory.com",
      repo: "https://github.com/Ganindu-ui/CeyBlu-Gem-Site.git",
      status: "completed",
      isPinned: false,
      order: 9
    },
    {
      id: "proj_8",
      title: "Vehicle Transfer Booking System",
      date: "Oct 2026",
      images: [],
      desc: "A custom standalone vehicle transfer booking system for geethlanka.com — a 10-step customer booking wizard covering route selection, live fleet availability and distance-based pricing, backed by a full operations back office (fleet, pricing, multi-currency exchange rates, payment gateways, bookings, CRM and reports). Built on Laravel 12 with Blade + vanilla JS, OpenStreetMap/OSRM routing with offline fallback, Stripe/PayPal/Bank-transfer payments behind a single driver interface, queued email notifications and a test suite covering pricing maths, booking lifecycle and security (tampering, CSRF, XSS). Embedded into the client's existing site with a direct \"Book a ride\" entry point.",
      tags: ["Laravel", "PHP", "MySQL", "Blade", "Vite", "OpenStreetMap", "Stripe", "PayPal"],
      link: "https://geethlanka.com/booking",
      repo: "https://github.com/Ganindu-ui/Geethlanka-Booking-System.git",
      status: "completed",
      isPinned: false,
      order: 10
    },
    {
      id: "proj_3",
      title: "Portfolio 2026",
      date: "Jan 2026",
      images: ["/images/image.png", "/images/portfolio_2.png"],
      desc: "This advanced React Single Page Application featuring Framer Motion animations and complex state management.",
      tags: ["React", "Vite", "Motion", "CSS Modules"],
      link: "https://ganindu-portfolio.vercel.app/",
      repo: "https://github.com/Ganindu-ui/ganindu-portfolio.git",
      status: "completed",
      isPinned: false,
      order: 11
    },
    {
      id: "proj_4",
      title: "Traffic Data Visualizer",
      date: "Nov 2023",
      images: ["/images/traffic data analyser.png"],
      desc: "A Python-based traffic analysis tool using Tkinter. Reads daily survey data and displays vehicle frequency histograms.",
      tags: ["Python", "Tkinter", "Pandas", "Matplotlib"],
      link: "#",
      repo: "https://github.com/Ganindu-ui/Python-based-traffic-data-analysis-system.git",
      status: "completed",
      isPinned: false,
      order: 12
    },
    {
      id: "proj_5",
      title: "Life Below Water",
      date: "Sept 2024",
      images: ["/images/Life Below Water.png"],
      desc: "A web project inspired by UN Goal 14. Raises awareness about protecting oceans through interactive visuals.",
      tags: ["HTML5", "CSS3", "JS", "GreenSock"],
      link: "#",
      repo: "#",
      status: "completed",
      isPinned: false,
      order: 13
    }
  ],
  certificates: [
    {
      id: "cert_1",
      title: "Python for Beginners",
      issuer: "University of Moratuwa",
      date: "April 2025",
      credentialUrl: "https://open.uom.lk/verify",
      badge: "/logo/University_of_Moratuwa_logo.png",
      color: "#a855f7",
      order: 1
    },
    {
      id: "cert_2",
      title: "CodeBreak 2.0 – Advanced Tier",
      issuer: "IEEE Computer Society, IIT",
      date: "2024",
      credentialUrl: "#",
      badge: "/logo/iit_logo.png",
      color: "#ec4899",
      order: 2
    },
    {
      id: "cert_3",
      title: "Ethical Hacking Workshop",
      issuer: "EXTRAORDINARY THINKERS (PVT) LTD",
      date: "2023",
      credentialUrl: "#",
      badge: "/logo/Hacker_logo.jpg",
      color: "#06b6d4",
      order: 3
    }
  ],
  contact: {
    heading: "Let's Start a Conversation",
    subheading: "Have a project in mind or just want to say hi? My inbox is always open.",
    email: "ganindu.contact@example.com",
    emailjs: {
      serviceId: "service_beniihq",
      templateId: "template_ndkel7c",
      publicKey: "tD1XU03PmDdGKFaHO"
    }
  },
  adminSettings: {
    pin: "1234",
    allowAutoLogin: false
  }
};
