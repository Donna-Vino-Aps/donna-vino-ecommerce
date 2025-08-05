"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const TopWinesHeader = () => {
  const { translations } = useLanguage();

  return (
    <div className="flex flex-col items-center px-4 text-center">
      <h3 className="mt-2 text-headlineSmall sm:mt-0 sm:text-titleMedium sm:font-semibold">
        {translations["topwineSection.title"]}
      </h3>
      <h2 className="mt-2 pb-3 pt-6 text-displayMedium font-regular text-tertiary1-dark sm:mt-0 sm:py-6 sm:text-displayLarge">
        {translations["topwineSection.headline"]}
      </h2>
      <p className="text-bodyLarge font-regular text-tertiary1-dark sm:mb-6">
        {translations["topwineSection.description"]}
      </p>
    </div>
  );
};

export default TopWinesHeader;
