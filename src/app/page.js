"use client";
import React from "react";
import TastingSession from "@/components/HeroSlider/HeroSlider";
import ServicesBanner from "@/components/ServicesBanner/ServicesBanner";
import SalesCards from "@/components/SalesCards/SalesCards";
import TopWinesSection from "@/components/Slider/TopWinesSection";
export default function Home() {
  return (
    <div className="flex w-[100%]" data-testid="home-container">
      <main
        className="flex w-full flex-col gap-4 bg-white"
        data-testid="main-heading"
      >
        <TastingSession />
        <ServicesBanner />
        <TopWinesSection />
        <SalesCards />
      </main>
    </div>
  );
}
