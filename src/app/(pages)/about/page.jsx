"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen">
      <section className="w-[90%] mx-auto pt-20 pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 poppins-regular">
            <h1 className="text-4xl sm:text-5xl font-semibold leading-snug">
              Your Dream {" "}
              <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/40 dark:after:from-white/40 after:to-transparent after:skew-x-12 after:animate-pulse ">
                Portfolio.
              </span>
              <br />
              Ready in Minutes
            </h1>

            <p className="text-muted-foreground max-w-xl">
              ShareFolio helps creators and professionals build beautiful,
              high-converting portfolios in minutes. Thoughtful templates, an intuitive editor, and performance-first defaults — so you can focus on your craft.
            </p>

            <div className="flex gap-4">
              <Link href="/signup">
                <Button data-focusable variant="primary" className="px-6 py-3">
                  Get Started
                </Button>
              </Link>
              <Link href="/templates">
                <Button data-focusable variant="secondary" className="px-5 py-3">
                  Explore Templates
                </Button>
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-lg" style={{perspective:1200}}>
            <div className="relative rounded-xl overflow-hidden transform-gpu transition-all duration-700 hover:scale-105 hover:-translate-y-2 will-change-transform">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                alt="portfolio preview"
                className="w-full h-72 object-cover rounded-xl shadow-2xl"
                draggable={false}
              />
              <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute -bottom-8 left-6 w-72 h-40 bg-gradient-to-r from-[#7b2fb0]/20 to-[#ff80ff]/10 blur-3xl rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Wobble cards built with Tailwind only */}
      <section className="w-[90%] mx-auto py-12">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">Why creators choose us</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article data-focusable className="group bg-card dark:bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-transform duration-500 transform hover:-translate-y-3 hover:scale-[1.02]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{background:'#7332a8'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6"/><path d="M9 14h6"/><path d="M12 4v4"/><path d="M9 8h6"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  <span className="text-foreground">Design-first</span> templates
                </h3>
                <p className="text-sm text-muted-foreground mt-2">Beautiful, accessible templates built to convert — ready out of the box and easy to customize.</p>
              </div>
            </div>
          </article>

          <article data-focusable className="group bg-card dark:bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-transform duration-500 transform hover:-translate-y-3 hover:scale-[1.02]" style={{transitionDelay:'80ms'}}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{background:'#f59e0b'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="M12 3v18"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold"><span className="text-foreground">Performance</span> focused</h3>
                <p className="text-sm text-muted-foreground mt-2">Optimized for speed: minimal JS, performant images, and sensible defaults so your portfolio loads fast.</p>
              </div>
            </div>
          </article>

          <article data-focusable className="group bg-card dark:bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-transform duration-500 transform hover:-translate-y-3 hover:scale-[1.02]" style={{transitionDelay:'160ms'}}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{background:'#06b6d4'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold"><span className="text-foreground">Reliable</span> support</h3>
                <p className="text-sm text-muted-foreground mt-2">We're here when you need us — helpful docs and responsive support to get you unstuck.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

    </main>
  );
}
