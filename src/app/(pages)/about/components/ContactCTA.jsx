"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ContactCTA() {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-[90%] mx-auto py-12">
      <div className="max-w-6xl mx-auto rounded-2xl p-10 bg-gradient-to-r from-[#7332a8]/6 to-[#ff80ff]/6 border border-border flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold"><span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">Ready to build your portfolio?</span></h3>
          <p className="text-muted-foreground mt-2">Start for free and upgrade when you're ready.</p>
        </div>
        <div className="mt-6 md:mt-0"><Link data-focusable className="border rounded-2xl bg-[#7332a8] dark:white p-4" href="/signup">Create your portfolio</Link></div>
      </div>
    </motion.section>
  );
}
