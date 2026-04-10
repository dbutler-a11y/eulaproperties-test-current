export type Category =
  | "Real Assets"
  | "AI & Automation"
  | "Blockchain & Security"
  | "Healthcare & Robotics"
  | "Infrastructure & Protocol";

export type Status = "Active" | "Live" | "In Development" | "70% Complete";

export interface PortfolioItem {
  name: string;
  category: Category;
  status: Status;
  statusDetail: string;
  description: string;
  techStack: string[];
  icon: string; // lucide icon name
  href?: string;
  tokenSymbol?: string;
  value?: string;
}

export const categories: Category[] = [
  "Real Assets",
  "AI & Automation",
  "Blockchain & Security",
  "Healthcare & Robotics",
  "Infrastructure & Protocol",
];

export const portfolio: PortfolioItem[] = [
  // ── Real Assets ──────────────────────────────────────────
  {
    name: "Pembrook Compound",
    category: "Real Assets",
    status: "70% Complete",
    statusDetail: "3-unit campus, Houston TX 77016",
    description:
      "9132-9136 Pembrook St — 3 residential units, 7,392 sq ft total. Senior debt $550K (Center Street Lending), mezzanine $500K (private investors). Construction targeting Q1 2025 certificate of occupancy.",
    techStack: ["Real Estate", "Construction", "Appraisal"],
    icon: "Building2",
    href: "/pembrook",
    value: "$1.1M Appraised",
  },

  // ── AI & Automation ──────────────────────────────────────
  {
    name: "Institute of AI Innovation",
    category: "AI & Automation",
    status: "Active",
    statusDetail: "ETPL Workforce Training",
    description:
      "Texas ETPL-approved AI Capability Specialist Certificate program ($8,000, 24-hour). Workforce-approved training facility focused on practical AI skills development and industry-ready certification.",
    techStack: ["Next.js 16", "React 19", "SQLite", "Prisma"],
    icon: "Brain",
    href: "https://instituteforaiinnovation.org",
    tokenSymbol: "INST",
  },
  {
    name: "Butler AI Academy",
    category: "AI & Automation",
    status: "In Development",
    statusDetail: "AI Tutoring Platform",
    description:
      "Personalized AI tutoring platform delivering adaptive learning experiences. Curriculum aligned with workforce development goals and industry certifications.",
    techStack: ["Next.js", "React", "AI/ML"],
    icon: "GraduationCap",
    tokenSymbol: "ACAD",
  },
  {
    name: "BrandVoice Studio",
    category: "AI & Automation",
    status: "Active",
    statusDetail: "brandvoice.studio",
    description:
      "Done-for-you AI video spokesperson production for marketing and training. Script management, avatar library, video production dashboard, and client portal.",
    techStack: ["Next.js 14", "React 18", "Supabase", "PayPal"],
    icon: "Mic",
    href: "https://brandvoice.studio",
    tokenSymbol: "BVOX",
  },
  {
    name: "Spirit Clip",
    category: "AI & Automation",
    status: "Active",
    statusDetail: "YouTube-to-Cinematic Pipeline",
    description:
      "Automated pipeline converting YouTube links into cinematic AI prompts for Nano Banana Pro (image) and Google Veo 3 (video). Deployed as OpenClaw agent on Digital Ocean.",
    techStack: ["Python", "Whisper", "yt-dlp", "Discord.py"],
    icon: "Film",
    tokenSymbol: "SPRT",
  },
  {
    name: "FSBO Lead Engine",
    category: "AI & Automation",
    status: "Active",
    statusDetail: "AI Voice Lead Generation",
    description:
      "AI-powered lead generation for FSBO agents via automated voice calls. Extracts leads from Zillow at $0.004/lead vs $0.15 industry standard. VAPI AI voice qualification with TCPA compliance.",
    techStack: ["Next.js 16", "React 19", "PostgreSQL", "VAPI AI", "Apify"],
    icon: "Phone",
    tokenSymbol: "FSBO",
  },
  {
    name: "Credit Repair Bot",
    category: "AI & Automation",
    status: "Active",
    statusDetail: "CROA/FCRA Compliant",
    description:
      "AI-powered credit repair assistant with automated dispute letter generation. 121 playbook docs in knowledge base. Telegram bot + web dashboard with Stripe payments.",
    techStack: ["Python", "FastAPI", "Next.js 14", "Telegram", "Stripe"],
    icon: "CreditCard",
    tokenSymbol: "CREP",
  },
  {
    name: "NeuroChat iOS",
    category: "AI & Automation",
    status: "In Development",
    statusDetail: "Neurodivergent AI Companion",
    description:
      "iOS app with AI companions designed for neurodivergent users. Large avatar display, crisis detection, location-based mental health services, VoiceOver + Switch Control support.",
    techStack: ["SwiftUI", "iOS 15+", "Combine", "MVVM"],
    icon: "Sparkles",
    tokenSymbol: "NURO",
  },
  {
    name: "Clone Lab",
    category: "AI & Automation",
    status: "In Development",
    statusDetail: "Live2D Avatar Chat",
    description:
      "Enterprise-grade Live2D avatar chat system. Vue.js 3 frontend with PIXI.js rendering, custom avatar support, theme switching, and offline resource caching.",
    techStack: ["Vue.js 3", "TypeScript", "PIXI.js 6.5", "Vite 7"],
    icon: "User",
    tokenSymbol: "CLON",
  },
  {
    name: "Jetlag Recovery",
    category: "AI & Automation",
    status: "In Development",
    statusDetail: "Sleep Optimization Platform",
    description:
      "Jetlag recovery coaching and sleep optimization platform. Weekly intelligence reports, personalized intake forms, and guided welcome sequences.",
    techStack: ["Next.js", "React"],
    icon: "Moon",
    tokenSymbol: "JLAG",
  },

  // ── Blockchain & Security ────────────────────────────────
  {
    name: "NILE Security Intelligence",
    category: "Blockchain & Security",
    status: "Active",
    statusDetail: "EVM Smart Contract Profiling",
    description:
      "Smart contract security intelligence platform with 4-dimensional NILE profiling (Name, Image, Likeness, Essence). Each contract scored 0-100 across four dimensions. Integrates with EVMbench (OpenAI/Paradigm).",
    techStack: ["FastAPI", "Next.js 16", "Foundry", "Slither", "Claude API"],
    icon: "Shield",
    tokenSymbol: "NILE",
  },
  {
    name: "LaT-PFN Trading System",
    category: "Blockchain & Security",
    status: "Live",
    statusDetail: "56.7% WR, PF 1.61",
    description:
      "Automated futures trading using LaT-PFN zero-shot forecasting. Trading MYM, MNQ, MGC on Apex prop firm via PickMyTrade webhooks. Discord bot integration for signals.",
    techStack: ["Python", "PyTorch", "Discord.py", "Flask", "SQLite"],
    icon: "TrendingUp",
    tokenSymbol: "LPFN",
  },

  // ── Healthcare & Robotics ────────────────────────────────
  {
    name: "ARIA Project",
    category: "Healthcare & Robotics",
    status: "Active",
    statusDetail: "Open-Source Parkinson's Robotics",
    description:
      "Open-source AI companion robots for Parkinson's disease patients, buildable under $500. Four product family: Bloom (tabletop), Guide (walker), Frame (portrait), Rover (mobile). Raspberry Pi 5 platform.",
    techStack: ["Raspberry Pi 5", "Whisper.cpp", "Piper TTS", "Python"],
    icon: "Heart",
    tokenSymbol: "ARIA",
  },
  {
    name: "Parkinson's Therapy Platform",
    category: "Healthcare & Robotics",
    status: "In Development",
    statusDetail: "Therapeutic Intervention System",
    description:
      "Digital therapeutic intervention platform for Parkinson's disease management. Evidence-based therapy protocols with progress tracking.",
    techStack: ["Python", "FastAPI"],
    icon: "Activity",
    tokenSymbol: "PARK",
  },
  {
    name: "Shoulder Therapy Platform",
    category: "Healthcare & Robotics",
    status: "In Development",
    statusDetail: "Rehabilitation System",
    description:
      "Guided shoulder rehabilitation therapy platform with exercise tracking, progress monitoring, and personalized recovery protocols.",
    techStack: ["Python"],
    icon: "Dumbbell",
    tokenSymbol: "SHLD",
  },

  // ── Infrastructure & Protocol ────────────────────────────
  {
    name: "The Claw Protocol",
    category: "Infrastructure & Protocol",
    status: "Active",
    statusDetail: "Agent Metaverse",
    description:
      "Community-led, agent-native coordination framework. Members build AI agents that enter a shared metaverse, find work, collaborate, and earn contribution rewards. 5-tier scoring system where compute is king.",
    techStack: ["Node.js", "Discord.js", "SQLite"],
    icon: "Network",
    tokenSymbol: "CLAW",
  },
  {
    name: "OpenClaw Gateway",
    category: "Infrastructure & Protocol",
    status: "Active",
    statusDetail: "Agent Orchestration Portal",
    description:
      "Multi-agent orchestration gateway with portal adapter for external developers to connect and manage agents. Discord integration, workspace isolation, and agent binding system.",
    techStack: ["Node.js", "OpenClaw SDK", "Discord API"],
    icon: "Plug",
    tokenSymbol: "GATE",
  },
  {
    name: "Greenhawk Express",
    category: "Infrastructure & Protocol",
    status: "In Development",
    statusDetail: "Hemp/CBD Marketplace",
    description:
      "Texas-legal hemp/THCa/CBD delivery marketplace (DoorDash-style). Monorepo with NestJS backend, Next.js frontend. Age verification, COA requirements, Texas-only ZIP validation.",
    techStack: ["NestJS 10", "Next.js 14", "PostgreSQL 15", "Redis 7", "Clerk"],
    icon: "Leaf",
    tokenSymbol: "GHWK",
  },
  {
    name: "Hyperfy 3D World",
    category: "Infrastructure & Protocol",
    status: "Active",
    statusDetail: "Agent Visualization Metaverse",
    description:
      "Persistent 3D world where tokenized agents are visualized performing tasks, building, and collaborating. Custom character models, real-time environment with admin build tools.",
    techStack: ["Hyperfy", "WebGL", "Three.js", "GLB/VRM"],
    icon: "Globe",
    tokenSymbol: "HYPR",
  },
  {
    name: "EULA Labs",
    category: "Infrastructure & Protocol",
    status: "Active",
    statusDetail: "AI Integration Consultancy",
    description:
      "Modern AI integration consultancy landing page with 3D particle field background, scroll-triggered animations, and interactive pricing calculator.",
    techStack: ["Next.js 15", "React Three Fiber", "Framer Motion", "Three.js"],
    icon: "Beaker",
    tokenSymbol: "ELAB",
  },
  {
    name: "EULA Labs Ventures",
    category: "Infrastructure & Protocol",
    status: "Active",
    statusDetail: "$2M Capital Raise",
    description:
      "Raising $2M via SEC Reg CF/506(c) to purchase Pembrook compound and build community-owned AI research infrastructure. Three pillars: EULA Properties, ARIA Research, The Claw Protocol.",
    techStack: ["HTML5", "CSS", "EmailJS"],
    icon: "Landmark",
    tokenSymbol: "ELV",
  },
];
