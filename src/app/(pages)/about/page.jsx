"use client";

import Hero from "./components/Hero";
import Values from "./components/Values";
// import Stats from "./components/Stats";
import Team from "./components/Team";
import Roadmap from "./components/Journey";
import HowItWorks from "./components/HowItWorks";
import CaseStudies from "./components/CaseStudies";
import Integrations from "./components/Integrations";
import ContactCTA from "./components/ContactCTA";

export default function AboutPage() {
  return (
    <main className="w-full poppins-regular">
      <Hero />
      <Values />
      {/* <Stats /> for now we don't need it, we'll update this later */}
      <Roadmap />
      <Team />
      <ContactCTA />
      <HowItWorks />
      <CaseStudies />
      <Integrations />
    </main>
  );
}

