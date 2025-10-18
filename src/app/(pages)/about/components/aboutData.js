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

export const timeline = [
  {
    title: "Editor improvements",
    desc: "Visual building blocks and layout controls for faster editing.",
    eta: "Q4 2025",
    color: "from-[#7332a8] to-[#b266ff]",
    icon: <Sparkles className="w-4 h-4 text-white" />,
  },
  {
    title: "Team collaboration",
    desc: "Invite collaborators, comments, and private previews.",
    eta: "Early 2026",
    color: "from-[#f59e0b] to-[#ffb86b]",
    icon: <Users className="w-4 h-4 text-white" />,
  },
  {
    title: "Performance & analytics",
    desc: "Image caching, analytics, and JS trimming for speed.",
    eta: "Rolling",
    color: "from-[#06b6d4] to-[#3dd5ff]",
    icon: <Rocket className="w-4 h-4 text-white" />,
  },
  {
    title: "Custom domains & commerce",
    desc: "Domain mgmt and commerce integrations out-of-the-box.",
    eta: "Mid 2026",
    color: "from-[#7b2fb0] to-[#ff80ff]",
    icon: <MapPin className="w-4 h-4 text-white" />,
  },
  {
    title: "Creator marketplace",
    desc: "A marketplace to showcase and sell templates and services.",
    eta: "Late 2026",
    color: "from-[#22c55e] to-[#7ee787]",
    icon: <Check className="w-4 h-4 text-white" />,
  },
];

export const CalendarIcon = Calendar;
