"use client";
import React from "react";
import dynamic from "next/dynamic";
const TastingSession = dynamic(
  () => import("@/components/HeroSlider/HeroSlider"),
  {
    ssr: true,
    loading: () => <div>Loading...</div>,
  },
);
const ServicesBanner = dynamic(
  () => import("@/components/ServicesBanner/ServicesBanner"),
);
const SalesCards = dynamic(() => import("@/components/SalesCards/SalesCards"));

export default function Home() {
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
