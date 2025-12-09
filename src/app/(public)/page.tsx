import AboutSection from "@/components/HomePage/AboutSection";

import CTASection from "@/components/HomePage/CTASection";
import Hero from "@/components/HomePage/Hero";



export default async function Home() {



  return (
   
    <div className="flex flex-col">
      <Hero />
      <AboutSection />
   
     
     
      <CTASection />
    </div>
  );
}
