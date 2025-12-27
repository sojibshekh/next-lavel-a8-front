import AboutSection from "@/components/HomePage/AboutSection";

import CTASection from "@/components/HomePage/CTASection";
import FaqHomePage from "@/components/HomePage/FaqHomePage";
import Hero from "@/components/HomePage/Hero";
import HomeTravelSection from "@/components/HomePage/HomeTravelSection";
import HowItWorksSection from "@/components/HomePage/HowItWorksSection";
import PricingSection from "@/components/HomePage/PricingSection";
import StatsSection from "@/components/HomePage/StatsSection";
import TopDestinationsSection from "@/components/HomePage/TopDestinationsSection";
import TravelCategoriesSection from "@/components/HomePage/TravelCategoriesSection";
import WhyChooseUsSection from "@/components/HomePage/WhyChooseUs";



export default async function Home() {



  return (
   
    <div className="flex flex-col">
      <Hero />
      <StatsSection />
      <AboutSection />

      <HowItWorksSection />
   
      <HomeTravelSection />

      <TopDestinationsSection />
      <TravelCategoriesSection />

      <WhyChooseUsSection />
      <PricingSection />

      <FaqHomePage />
     
      <CTASection />
    </div>
  );
}
