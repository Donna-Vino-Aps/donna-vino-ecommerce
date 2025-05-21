"use client";
import React, { useEffect } from "react";
import TastingSession from "@/components/HeroSlider/HeroSlider";
import ServicesBanner from "@/components/ServicesBanner/ServicesBanner";
import SalesCards from "@/components/SalesCards/SalesCards";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.websiteId = "2a60d0b9-2baa-48f9-88df-67e44d159e85";
    script.src = "https://cloud.umami.is/script.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up on unmount
    };
  }, []);

  return (
    <div className="flex w-[100%]" data-testid="home-container">
      <main
        className="flex w-full flex-col gap-4 bg-white"
        data-testid="main-heading"
      >
        <TastingSession />
        <ServicesBanner />
        <SalesCards />
      </main>
    </div>
  );
}
