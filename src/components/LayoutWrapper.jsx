'use client';

import { usePathname } from 'next/navigation';
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isCreatePage = pathname?.startsWith('/v1/');

  return (
    <>
      {!isCreatePage && <Navbar />}
      {children}
      {!isCreatePage && <Footer />}
    </>
  );
}