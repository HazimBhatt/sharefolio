"use client";

import { motion } from "framer-motion";
import { timeline, cardVariants, CalendarIcon } from "./aboutData";
import { Button } from "@/components/ui/button";

export default function Journey() {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-[90%] mx-auto py-12">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6"><span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">Roadmap</span></h3>
        <div className="relative">
          <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-border/60 dark:bg-border/40 ml-0 rounded" />
          <div className="space-y-8">
            {timeline.map((step) => (
              <motion.div key={step.title} variants={cardVariants} className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md" style={{ transform: "translateX(-6px)" }}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr ${step.color}`}>{step.icon}</div>
                </div>

                <div className="p-5 bg-card/60 dark:bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transform-gpu transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> <span>{step.eta}</span></div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <Button  variant="outline" size="lg">Learn more</Button>
                    <Button  variant="primary" size="lg">Join waitlist</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
