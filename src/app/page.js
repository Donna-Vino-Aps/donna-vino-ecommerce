"use client";
import React from "react";
import LoginScreen from "@/components/LogIn/LogInScreen";
import TastingSession from "@/components/HeroSlider/HeroSlider";
import TopWinesSection from "@/components/Slider/TopWinesSection";
import ServicesBanner from "@/components/ServicesBanner/ServicesBanner";
export default function Home() {
  return (
    <div className="flex w-[100%]" data-testid="home-container">
      <main
        className="flex flex-col gap-4 w-full bg-white"
        data-testid="main-heading"
      >
        <TastingSession />
        <ServicesBanner />
        <TopWinesSection />
        <LoginScreen />
      </main>
    </div>
  );
}
