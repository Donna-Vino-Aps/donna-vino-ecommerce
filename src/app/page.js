"use client";
import React from "react";
import SignUpScreen from "../components/SignUpScreen/SignUpScreen";
import LoginScreen from "@/components/LogIn/LogInScreen";
import WineCard from "@/components/Card/WineCard";

export default function Home() {
  return (
    <div className="flex w-[100%]" data-testid="home-container">
      <main
        className="flex flex-col gap-4 w-full bg-primary-light"
        data-testid="main-heading"
      >
        <WineCard
          title="Primitivo Susumani"
          imageUrl="/images/primitivo-susmani.jpg"
          price="39.00"
          reviewsCount="14"
        />
        <LoginScreen />

        <SignUpScreen />
      </main>
    </div>
  );
}
