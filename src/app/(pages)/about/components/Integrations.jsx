"use client";

import { motion } from "framer-motion";

export default function Integrations() {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-[90%] mx-auto py-12">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6"><span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">Integrations</span></h3>
        <div className="flex items-center gap-6 flex-wrap">{["Google Analytics", "Netlify", "Vercel", "Stripe"].map((name) => (<div key={name} className="px-4 py-2 bg-card rounded-md border border-border text-sm">{name}</div>))}</div>
      </div>
    </motion.section>
  );
}
