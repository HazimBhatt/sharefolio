"use client";

import { motion } from "framer-motion";
import { cardVariants } from "./aboutData";
import { Sparkles, Users, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Pick a template",
      desc: "Start with designer-made templates and field-specific layouts.",
      icon: <Sparkles className="w-6 h-6 text-white" />,
    },
    {
      title: "Customize",
      desc: "Tweak colors, layouts, and copy with the visual editor — no code needed.",
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      title: "Publish",
      desc: "Publish instantly with custom domains and built-in analytics.",
      icon: <Rocket className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-[90%] mx-auto py-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-3xl sm:text-4xl font-extrabold mx-auto">
            <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">
              How it works
            </span>
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-2">
            A few simple steps to get your site live.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((s) => (
            <motion.div
              key={s.title}
              variants={cardVariants}
              className="p-6 bg-card/60 dark:bg-card rounded-2xl border border-border flex flex-col gap-4 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-[#7332a8] to-[#ff80ff] flex items-center justify-center">
                {s.icon}
              </div>
              <h4 className="font-semibold text-lg">{s.title}</h4>
              <p className="text-sm text-muted-foreground flex-1">{s.desc}</p>
              <div className="mt-2">
                <a
                  data-focusable
                  href="#"
                  className="text-sm font-medium text-[#6b46ff] hover:underline"
                >
                  Learn more
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
