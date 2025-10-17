"use client";

import { motion } from "framer-motion";

export default function Values() {
  return (
    <section className="w-[90%] mx-auto py-12">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold"><span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">Why creators choose us</span></h2>
        <p className="text-muted-foreground mt-3">Tools and templates that help you present work, tell a story, and win clients.</p>
      </div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.article data-focusable whileHover={{ translateY: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="group bg-card dark:bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: "#7332a8" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6"/><path d="M9 14h6"/><path d="M12 4v4"/><path d="M9 8h6"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold"><span className="text-foreground">Design-first</span> templates</h3>
              <p className="text-sm text-muted-foreground mt-2">Beautiful, accessible templates built to convert — ready out of the box and easy to customize.</p>
            </div>
          </div>
        </motion.article>

        <motion.article data-focusable whileHover={{ translateY: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.08 }} className="group bg-card dark:bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: "#f59e0b" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="M12 3v18"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold"><span className="text-foreground">Performance</span> focused</h3>
              <p className="text-sm text-muted-foreground mt-2">Optimized for speed: minimal JS, performant images, and sensible defaults so your portfolio loads fast.</p>
            </div>
          </div>
        </motion.article>

        <motion.article data-focusable whileHover={{ translateY: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.16 }} className="group bg-card dark:bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: "#06b6d4" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold"><span className="text-foreground">Reliable</span> support</h3>
              <p className="text-sm text-muted-foreground mt-2">We're here when you need us — helpful docs and responsive support to get you unstuck.</p>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
