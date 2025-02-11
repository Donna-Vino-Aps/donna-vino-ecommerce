"use client";
import React from "react";
import SignUpScreen from "../components/SignUpScreen/SignUpScreen";
import LoginScreen from "@/components/LogIn/LogInScreen";
import Breadcrumb from "@/components/BreadCrumb/BreadCrumb";

export default function Home() {
  return (
    <div className="flex w-[100%]" data-testid="home-container">
      <main
        className="flex flex-col gap-4 w-full bg-primary-light"
        data-testid="main-heading"
      >
        <Breadcrumb />
        <LoginScreen />
        <SignUpScreen />
      </main>
    </div>
  );
}
