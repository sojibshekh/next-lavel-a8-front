import AboutSection from "@/components/HomePage/AboutSection";

import CTASection from "@/components/HomePage/CTASection";
import FaqHomePage from "@/components/HomePage/FaqHomePage";
import Hero from "@/components/HomePage/Hero";
import HomeTravelSection from "@/components/HomePage/HomeTravelSection";



export default async function Home() {



  return (
   
    <div className="flex flex-col">
      <Hero />
      <AboutSection />
   
      <HomeTravelSection />

      <FaqHomePage />
     
      <CTASection />
    </div>
  );
}
