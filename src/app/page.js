"use client";
import React from "react";
import TastingSession from "@/components/HeroSlider/HeroSlider";
import ServicesBanner from "@/components/ServicesBanner/ServicesBanner";
import SalesCards from "@/components/SalesCards/SalesCards";
export default function Home() {
  return (
    <div className="flex w-[100%]" data-testid="home-container">
      <main
        className="flex flex-col gap-4 w-full bg-white"
        data-testid="main-heading"
      >
        <TastingSession />
        <ServicesBanner />
        <SalesCards />
      </main>
    </div>
  );
}
