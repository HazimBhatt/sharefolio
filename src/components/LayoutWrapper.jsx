'use client';

import { usePathname } from 'next/navigation';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ModeToggle } from "./ModeToggle";
// import FocusCursor from "./FocusCursor";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname() || '';
  // Hide chrome on portfolio view routes: /v1|v2|v3|pro/[slug]
  // but keep chrome on create pages like /v1/create, /v2/create, /pro/create
  const isPortfolioView = /^\/(v[1-3]|pro)\/((?!create(\/|$)).+)/.test(pathname);

  return (
    <>
      {!isPortfolioView && <ModeToggle />}
      {!isPortfolioView && <Navbar />}
      {isPortfolioView && <ModeToggle />}

      {children}
      {!isPortfolioView && <Footer />}
    </>
  );
}