import Hero from "@/components/Hero"
import Templates from "@/components/Templates";
import Working from "@/components/Working";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import TestimonialsAndFaq from "@/components/TestimonialsColumn";
export default function Home() {
  return (
    <div className="poppins-regular">
    <Hero/>
    <Templates/>
    <Working/>
    <Features/>
    <TestimonialsAndFaq/>
    <Footer/>
    </div>
  );
}
