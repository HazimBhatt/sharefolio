"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="w-[90%] mx-auto pt-20 pb-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 poppins-regular">
          <h1 className="text-4xl sm:text-5xl font-semibold leading-snug">
            Your Dream <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">Portfolio.</span>
            <br /> Ready in Minutes
          </h1>

          <p className="text-muted-foreground max-w-xl">
            ShareFolio helps creators and professionals build beautiful, high-converting portfolios in minutes.
          </p>

          <div className="flex gap-4">
            <Link href="/signup">
              <Button data-focusable variant="primary" size="lg">Get Started</Button>
            </Link>
            <Link href="/templates">
              <Button data-focusable variant="secondary" size="lg">Explore Templates</Button>
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-lg" style={{ perspective: 1200 }}>
          <div className="relative rounded-xl overflow-hidden transform-gpu transition-all duration-700 hover:scale-105 hover:-translate-y-2 will-change-transform">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80" alt="portfolio preview" className="w-full h-72 object-cover rounded-xl shadow-2xl" draggable={false} />
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="absolute -bottom-8 left-6 w-72 h-40 bg-gradient-to-r from-[#7b2fb0]/20 to-[#ff80ff]/10 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
