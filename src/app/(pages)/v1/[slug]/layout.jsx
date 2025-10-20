import { Poppins } from "next/font/google";


const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export async function generateMetadata({ params }) {
  const { slug } =await params;


  const formattedSlug = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedSlug} | ShareFolio`,
    description: `Portfolio of ${formattedSlug} — built with ShareFolio.`,
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
