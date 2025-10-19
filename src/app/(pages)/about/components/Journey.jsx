"use client";

import { motion } from "framer-motion";
import { timeline, cardVariants, CalendarIcon } from "./aboutData";
import { Button } from "@/components/ui/button";

export default function Journey() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-[90%] mx-auto py-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-3xl sm:text-4xl font-extrabold mx-auto">
            <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">
              Journey
            </span>
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-2">
            Where we're headed — prioritized features and product milestones.
          </p>
        </div>
        <div className="relative">
          {/* static road base */}
          <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-border/40 rounded" />

          {/* animated gradient slide over the road */}
          <motion.div
            animate={{ backgroundPositionY: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute left-6 top-6 bottom-6 w-[2px] rounded"
            style={{
              background:
                "linear-gradient(180deg, rgba(115,50,168,0.9), rgba(178,102,255,0.6), rgba(255,128,255,0.9))",
              backgroundSize: "100% 200%",
              opacity: 0.9,
            }}
          />

          <div className="space-y-8">
            {timeline.map((step, idx) => (
              <motion.div
                key={step.title}
                variants={cardVariants}
                className="relative pl-16"
              >
                {/* pulsing marker positioned against the road */}
                <div
                  className="absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ transform: "translateX(-6px)" }}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0.9 }}
                    animate={{ scale: [1, 1.15, 1], opacity: [1, 0.6, 1] }}
                    transition={{
                      duration: 2 + (idx % 3) * 0.25,
                      repeat: Infinity,
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr ${step.color} shadow-lg`}
                  >
                    {step.icon}
                  </motion.div>
                </div>

                <div className="p-5 bg-card/60 dark:bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transform-gpu transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.desc}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />{" "}
                      <span>{step.eta}</span>
                    </div>
                  </div>
                  {/* CTAs removed as requested */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
