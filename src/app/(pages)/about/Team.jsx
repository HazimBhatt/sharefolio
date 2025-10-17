"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cardVariants } from "./aboutData";

export default function Team() {
  const members = [
    { name: "Hazim", role: "Gunda 1" },
    { name: "Faisal", role: "Badmash 1" },
    { name: "Suhail", role: "Gunda 2" },
    { name: "Muzamil", role: "Badmash 2" },
  ];

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-[90%] mx-auto py-12">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6"><span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">Our Team</span></h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m) => (
            <motion.div key={m.name} variants={cardVariants} className="bg-card p-4 rounded-2xl border border-border text-center hover:shadow-lg transition-transform transform-gpu hover:-translate-y-1">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#7332a8] to-[#ff80ff] flex items-center justify-center text-white text-xl font-bold">{m.name[0]}</div>
              <h4 className="mt-3 font-semibold">{m.name}</h4>
              <p className="text-sm text-muted-foreground">{m.role}</p>
              <div className="mt-3 flex items-center justify-center gap-3">
                <Button data-focusable variant="outline" size="sm">Contact</Button>
                <Button data-focusable variant="primary" size="sm">Follow</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
