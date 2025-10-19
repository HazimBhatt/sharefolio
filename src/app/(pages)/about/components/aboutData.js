import { Sparkles, Users, Rocket, MapPin, Check, Calendar } from "lucide-react";

export const sectionStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
};

export const statVariant = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 140, damping: 18 } },
};

export const journey = [
  {
    title: "Launch faster with templates",
    desc: "Pick a designer-made template and customize in minutes — no friction, just results.",
    eta: "Q4 2025",
    color: "from-[#7332a8] to-[#b266ff]",
    icon: <Sparkles className="w-4 h-4 text-white" />,
  },
  {
    title: "Collaborate in real time",
    desc: "Invite teammates, review changes, and ship together without version chaos.",
    eta: "Early 2026",
    color: "from-[#f59e0b] to-[#ffb86b]",
    icon: <Users className="w-4 h-4 text-white" />,
  },
  {
    title: "Speed & observability",
    desc: "Built-in analytics and performance optimizations so your site feels fast.",
    eta: "Rolling",
    color: "from-[#06b6d4] to-[#3dd5ff]",
    icon: <Rocket className="w-4 h-4 text-white" />,
  },
  {
    title: "Payments & domains",
    desc: "Connect payments, custom domains, and commerce features with a few clicks.",
    eta: "Mid 2026",
    color: "from-[#7b2fb0] to-[#ff80ff]",
    icon: <MapPin className="w-4 h-4 text-white" />,
  },
  {
    title: "Marketplace for creators",
    desc: "Showcase templates and services to reach more customers.",
    eta: "Late 2026",
    color: "from-[#22c55e] to-[#7ee787]",
    icon: <Check className="w-4 h-4 text-white" />,
  },
  {
    title: "Extend with integrations",
    desc: "Official connectors for analytics, CMSs, and essential tools.",
    eta: "Rolling",
    color: "from-[#06b6d4] to-[#60a5fa]",
    icon: <MapPin className="w-4 h-4 text-white" />,
  },
  {
    title: "A marketplace to grow",
    desc: "Curated bundles and creator-focused features to monetize your work.",
    eta: "2027",
    color: "from-[#7c3aed] to-[#ff80ff]",
    icon: <Sparkles className="w-4 h-4 text-white" />,
  },
];

// backward-compatible export for existing imports
export const timeline = journey;

export const CalendarIcon = Calendar;
