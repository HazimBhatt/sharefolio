import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper"
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import FocusCursor from '@/components/FocusCursor';
import { AuthProvider } from "@/contexts/AuthContext";
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
       <AuthProvider>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutWrapper>
          {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
      </AuthProvider>
    </html>
  );
}
