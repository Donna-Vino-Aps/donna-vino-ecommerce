"use client";
import React from "react";
import TastingSession from "@/components/HeroSlider/HeroSlider";
import ServicesBanner from "@/components/ServicesBanner/ServicesBanner";
import SalesCards from "@/components/SalesCards/SalesCards";
import MetaTags from "@/components/SEO/MetaTags";
export default function Home() {
  return (
    <div className="flex w-[100%]" data-testid="home-container">
      <MetaTags
        title="Home Page"
        description="Home Page for Donna Vino Ecommerce"
      />
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
