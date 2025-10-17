"use client";

import { motion } from "framer-motion";
import { cardVariants } from "./aboutData";
import { Sparkles, Users, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { title: 'Pick a template', desc: 'Start with designer-made templates and field-specific layouts.', icon: <Sparkles className="w-5 h-5 text-white" /> },
    { title: 'Customize', desc: 'Tweak colors, layouts, and copy with the visual editor — no code needed.', icon: <Users className="w-5 h-5 text-white" /> },
    { title: 'Publish', desc: 'Publish instantly with custom domains and built-in analytics.', icon: <Rocket className="w-5 h-5 text-white" /> },
  ];

  return (
    <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-[90%] mx-auto py-12">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6"><span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">How it works</span></h3>
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((s) => (
            <motion.div key={s.title} variants={cardVariants} className="p-6 bg-card/60 dark:bg-card rounded-2xl border border-border flex flex-col gap-3 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-[#7332a8] to-[#ff80ff] flex items-center justify-center">{s.icon}</div>
              <h4 className="font-semibold">{s.title}</h4>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
