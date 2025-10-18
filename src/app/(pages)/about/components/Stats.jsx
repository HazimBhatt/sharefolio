"use client";

import { motion } from "framer-motion";
import { statVariant } from "./aboutData";

export default function Stats() {
  return (
    <motion.section variants={statVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-[90%] mx-auto py-12">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold"><span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">Quick stats</span></h2>
        <p className="text-muted-foreground mt-2">Real numbers from creators using ShareFolio.</p>
      </div>

      <div className="md:hidden max-w-xl mx-auto flex flex-col items-center">
        {[{ value: '1.2k', label: 'Active portfolios', z: 'z-30' }, { value: '98%', label: 'Customer satisfaction', z: 'z-20' }, { value: '24h', label: 'Average support response', z: 'z-10' }].map((s, i) => (
          <motion.div key={s.label} variants={statVariant} className={`${s.z} w-full p-5 bg-card rounded-2xl border border-border shadow-sm ${i !== 0 ? '-mt-6' : ''}`}>
            <div className="text-2xl md:text-3xl font-extrabold">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="hidden md:block max-w-4xl mx-auto relative h-[200px]">
        <motion.div variants={statVariant} className="absolute left-1/2 -translate-x-1/2 w-96 top-6 z-30">
          <div className="p-6 bg-card rounded-2xl border border-border shadow-2xl">
            <div className="text-3xl font-extrabold">1.2k</div>
            <div className="text-sm text-muted-foreground mt-1">Active portfolios</div>
          </div>
        </motion.div>

        <motion.div variants={statVariant} className="absolute left-1/2 -translate-x-1/2 w-96 top-12 z-20">
          <div className="p-6 bg-card rounded-2xl border border-border shadow-xl opacity-95">
            <div className="text-3xl font-extrabold">98%</div>
            <div className="text-sm text-muted-foreground mt-1">Customer satisfaction</div>
          </div>
        </motion.div>

        <motion.div variants={statVariant} className="absolute left-1/2 -translate-x-1/2 w-96 top-20 z-10">
          <div className="p-6 bg-card rounded-2xl border border-border shadow-md">
            <div className="text-3xl font-extrabold">24h</div>
            <div className="text-sm text-muted-foreground mt-1">Average support response</div>
          </div>
        </motion.div>

        <div className="absolute left-1/2 -translate-x-1/2 top-8 h-28 w-[2px] bg-gradient-to-b from-transparent via-border/60 to-transparent rounded" aria-hidden />
      </div>
    </motion.section>
  );
}
