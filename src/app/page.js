"use client";
import React from "react";
// import { logInfo } from "@/utils/logging";
import SignUpForm from "@/components/LoginFormTest/SignUpForm";

export default function Home() {
  return (
    <div className="flex w-[100%]" data-testid="home-container">
      <main className="flex flex-col gap-4 w-full" data-testid="main-heading">
        <SignUpForm />
      </main>
    </div>
  );
}
