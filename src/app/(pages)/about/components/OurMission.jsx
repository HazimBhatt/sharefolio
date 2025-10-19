"use client";

import { motion } from "framer-motion";

export default function OurMission() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-[90%] mx-auto py-16"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-3xl sm:text-4xl font-semibold mb-4">
          <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">Our mission</span>
        </h3>
        <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
          We build beautiful, high-converting templates and tools that let creators and small teams launch faster.
          Design-first, accessible, and performance-minded — our goal is to remove the friction between an idea and a live product.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="/contact"
            data-focusable
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#7332a8] to-[#ff80ff] text-white font-medium shadow-md hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a76bff]"
          >
            Get in touch
          </a>
          <a
            href="#"
            data-focusable
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm hover:bg-muted/40 transition"
          >
            Learn more
          </a>
        </div>
      </div>
    </motion.section>
  );
}
