"use client";
import React from "react";
import LoginScreen from "@/components/LogIn/LogInScreen";
import TastingSession from "@/components/TastingSession/TastingSession";
import WineCard from "@/components/Card/WineCard";
import TopWinesSection from "@/components/Slider/TopWinesSection";
import SignUpScreen from "@/components/SignUpScreen/SignUpScreen";
export default function Home() {
  return (
    <div className="flex w-[100%]" data-testid="home-container">
      <main
        className="flex flex-col gap-4 w-full bg-primary-light"
        data-testid="main-heading"
      >
        <LoginScreen />
        <TastingSession />

        <WineCard
          title="Primitivo Susumani"
          imageUrl="/images/primitivo-susmani.jpg"
          price={39.0}
          reviewsCount={14}
        />
        <LoginScreen />
        <SignUpScreen />
        <TopWinesSection />
      </main>
    </div>
  );
}
