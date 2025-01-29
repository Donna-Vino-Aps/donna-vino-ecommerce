"use client";
import React from "react";
// import { logInfo } from "@/utils/logging";
import LoginForm from "../components/LoginFormTest/LoginFormTest";

export default function Home() {
  return (
    <div className="flex w-[100%]" data-testid="home-container">
      <main className="flex flex-col gap-4 w-full" data-testid="main-heading">
        <LoginForm />
      </main>
    </div>
  );
}
