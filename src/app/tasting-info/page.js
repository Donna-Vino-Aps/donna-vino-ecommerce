"use client";
import React from "react";
import SEO from "@/components/SEO/SEO";
import HeroSection from "@/components/TastingInfo/HeroSection";
import CardsSection from "@/components/TastingInfo/CardsSection";


const TastingInfo = () => {
	
  return (
    <div className="bg-primary-light">
      <SEO />
			<HeroSection/>
			<CardsSection/>
    </div>
  );
};

export default TastingInfo;
