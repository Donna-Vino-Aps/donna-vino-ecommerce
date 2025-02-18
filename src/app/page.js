"use client";
import React from "react";
import LogInScreen from "@/components/LogIn/LogInScreen";
import TastingSession from "@/components/TastingSession/TastingSession";
import WineCardSmall from "@/components/Card/WineCardSmall";
import WineCard from "@/components/Card/WineCard";
import ServicesBanner from "@/components/ServicesBanner/ServicesBanner";

export default function Home() {
  return (
    <div className="flex w-[100%]" data-testid="home-container">
      <main
        className="flex flex-col gap-4 w-full bg-primary-light"
        data-testid="main-heading"
      >
        <TastingSession />
        <ServicesBanner />
        <LogInScreen />
        <WineCard
          title="Primitivo Susumani"
          imageUrl="/images/primitivo-susmani.jpg"
          price={39.0}
          reviewsCount={14}
        />
        <WineCardSmall />
      </main>
    </div>
  );
}
