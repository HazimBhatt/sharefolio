"use client";

import { motion } from "framer-motion";
import { cardVariants } from "./aboutData";
import { Button } from "@/components/ui/button";

export default function CaseStudies() {
  const cases = [
    { title: 'Design Portfolio Boost', desc: 'A designer increased client inquiries by 3x using our templates and SEO defaults.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
    { title: 'Startup Landing', desc: 'A small startup launched landing pages faster and tracked conversions without dev time.', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
  ];

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
              Case studies
            </span>
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-2">
            Real results from creators and teams using our templates.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <motion.article
              key={c.title}
              variants={cardVariants}
              className="p-0 bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative h-44 w-full">
                <img
                  src={`${c.img}?auto=format&fit=crop&w=1200&q=60`}
                  alt={c.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-6">
                <h4 className="font-semibold">{c.title}</h4>
                <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
                <div className="mt-4">
                  <Button data-focusable variant="secondary" size="sm">
                    Read story
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
