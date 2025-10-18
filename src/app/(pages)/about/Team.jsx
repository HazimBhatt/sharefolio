"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cardVariants } from "./components/aboutData";

export default function Team() {
  const members = [
    { name: "Hazim", role: "ipsum" },
    { name: "Faisal", role: "ipsum" },
    { name: "Suhail", role: "ipsum" },
    { name: "Muzamil", role: "ipsum" },
  "use client";

  import { motion } from "framer-motion";
  import { Button } from "@/components/ui/button";
  import { sectionStagger, cardVariants } from "./aboutData";

  export default function Team() {
    const members = [
      { name: "Hazim", role: "Founder", color: "from-[#7332a8] to-[#b266ff]" },
      { name: "Faisal", role: "Product", color: "from-[#f59e0b] to-[#ffb86b]" },
      { name: "Suhail", role: "Engineering", color: "from-[#06b6d4] to-[#3dd5ff]" },
      { name: "Muzamil", role: "Design", color: "from-[#7b2fb0] to-[#ff80ff]" },
    ];

    return (
      <motion.section variants={sectionStagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-[90%] mx-auto py-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6">
            <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">Our Team</span>
          </h3>

          {/* Mobile: stacked column with overlap */}
          <div className="md:hidden max-w-lg mx-auto flex flex-col items-center">
            {members.map((m, i) => (
              <motion.div key={m.name} variants={cardVariants} className={`w-full p-5 bg-card rounded-2xl border border-border shadow-sm ${i !== 0 ? '-mt-6' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-tr ${m.color}`}>{m.name[0]}</div>
                  <div>
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-sm text-muted-foreground">{m.role}</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-3 justify-end">
                  <Button data-focusable variant="outline" size="sm">Contact</Button>
                  <Button data-focusable variant="primary" size="sm">Follow</Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: centered overlapping stack with varied styles */}
          <div className="hidden md:block max-w-4xl mx-auto relative h-[220px]">
            {members.map((m, i) => (
              <motion.div key={m.name} variants={cardVariants} className={`absolute left-1/2 -translate-x-1/2 w-96 p-6 rounded-2xl border border-border transform-gpu transition-all ${i === 0 ? 'top-6 z-40 shadow-2xl' : i === 1 ? 'top-12 z-30 shadow-xl opacity-95 scale-[0.98]' : i === 2 ? 'top-18 z-20 shadow-md scale-[0.96]' : 'top-24 z-10 shadow-sm scale-[0.94]'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-bold bg-gradient-to-tr ${m.color}`}>{m.name[0]}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{m.name}</h4>
                    <div className="text-sm text-muted-foreground">{m.role}</div>
                    <div className="mt-3 flex gap-3">
                      <Button data-focusable variant="outline" size="sm">Contact</Button>
                      <Button data-focusable variant="primary" size="sm">Follow</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* subtle vertical decorative connector */}
            <div className="absolute left-1/2 -translate-x-1/2 top-10 h-36 w-[2px] bg-border/40 rounded" aria-hidden />
          </div>
        </div>
      </motion.section>
    );
  }
