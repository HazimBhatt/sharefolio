"use client";

import Hero from "./Hero";
import Values from "./Values";
import Stats from "./Stats";
import Team from "./Team";
import Roadmap from "./Roadmap";
import HowItWorks from "./HowItWorks";
import CaseStudies from "./CaseStudies";
import Integrations from "./Integrations";
import FAQ from "./FAQ";
import ContactCTA from "./ContactCTA";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen">
      <Hero />
      <Values />
      <Stats />
      <Team />
      <Roadmap />
      <FAQ />
      <ContactCTA />
      <HowItWorks />
      <CaseStudies />
      <Integrations />
    </main>
  );
}

