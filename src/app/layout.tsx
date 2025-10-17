import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import FocusCursor from '@/components/FocusCursor';
import Footer from "@/components/Footer"
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"], 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShareFolio",
  description: "Your Portfolio Ready With Some Prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModeToggle />
          <FocusCursor />
          <Navbar />

          {children}
      <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
