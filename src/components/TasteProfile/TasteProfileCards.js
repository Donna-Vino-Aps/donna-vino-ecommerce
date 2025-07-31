"use client";
import React from "react";
import TasteCard from "@/components/TasteCard/TasteCard";
import { useLanguage } from "@/context/LanguageContext";
export default function TasteProfileCards() {
  const { translations } = useLanguage();
  return (
    <section className="flex w-full items-center justify-center">
      <div className="grid w-full max-w-[1440px] auto-rows-min grid-cols-1 justify-items-center gap-x-10 gap-y-12 pt-8 sm:grid-cols-2 sm:gap-x-14 sm:px-20 lg:grid-cols-3 lg:pt-0">
        <TasteCard
          icon="/icons/tasteCard/grape.svg"
          title={translations["tasteProfile.tasteCard.fruitsTitle"]}
          bgColor="bg-primary-darker"
          description="Exotic fruits: Pineapple, mango, passion fruit"
        />
        <TasteCard
          icon="/icons/tasteCard/ph_plant.svg"
          title={translations["tasteProfile.tasteCard.spicesTitle"]}
          bgColor="bg-others-oliveGold"
          description="Spicy spices: Black pepper, cloves"
        />
        <TasteCard
          icon="/icons/tasteCard/streamline_log.svg"
          title={translations["tasteProfile.tasteCard.balsamicEarthTitle"]}
          bgColor="bg-secondary-dark"
          description="Earthy: Truffles, undergrowth, mushrooms"
        />
      </div>
    </section>
  );
}
