"use client";

import { motion } from "framer-motion";

export default function FAQ() {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-[90%] mx-auto py-12">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6"><span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">Frequently asked</span></h3>
        <div className="space-y-3">
          <details className="p-4 bg-card rounded-xl border border-border"><summary className="font-medium cursor-pointer">Can I use my own domain?</summary><p className="text-sm text-muted-foreground mt-2">Yes — Pro users can connect custom domains in settings.</p></details>
          <details className="p-4 bg-card rounded-xl border border-border"><summary className="font-medium cursor-pointer">Is there a free tier?</summary><p className="text-sm text-muted-foreground mt-2">Yes — the Free tier includes public templates.</p></details>
        </div>
      </div>
    </motion.section>
  );
}
