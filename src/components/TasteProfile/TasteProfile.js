"use client";

import React from "react";
import TasteProfilePercentage from "@/components/TasteProfile/TasteProfilePercentage";
import TasteProfileDescription from "@/components/TasteProfile/TasteProfileDescription";

export default function TasteProfile() {
  return (
    <section className="my-8 flex h-[26.5625rem] items-center justify-between px-28 py-6">
      <TasteProfilePercentage />
      <TasteProfileDescription />
    </section>
  );
}
