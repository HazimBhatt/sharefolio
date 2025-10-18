"use client";

import Hero from "./components/Hero";
import Values from "./components/Values";
import OurMission from "./components/OurMission";
// import Stats from "./components/Stats";
import Team from "./components/Team";
import Journey from "./components/Journey";
import HowItWorks from "./components/HowItWorks";
import CaseStudies from "./components/CaseStudies";
import Integrations from "./components/Integrations";
import ContactCTA from "./components/ContactCTA";

export default function AboutPage() {
  return (
    <main className="w-full poppins-regular">
      <Hero />
      <Values />
      <OurMission />
      {/* <Stats /> for now we don't need it, we'll update this later */}
      <Team />
      <Journey />
      <HowItWorks />
      <CaseStudies />
      <Integrations />
      <ContactCTA />
    </main>
  );
}

