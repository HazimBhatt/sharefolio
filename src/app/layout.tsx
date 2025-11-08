import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper"
import { ThemeProvider } from "@/components/theme-provider";

import { AuthProvider } from "@/contexts/AuthContext";
const poppins = Poppins({
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
      <body className={`${poppins.className} font-sans antialiased`} suppressHydrationWarning>
       <AuthProvider>
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
      </AuthProvider>
      </body>
    </html>
  );
}
