"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/Button/Button";

export default function NotFound() {
  const { translations } = useLanguage();

  return (
    <div className="custom-services-banner flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-headlineMedium text-tertiary1-darker md:text-headlineLarge">
        {translations["notFound.title"]}
      </h1>
      <p className="mb-8 max-w-md text-bodyMedium text-tertiary1-normal md:text-bodyLarge">
        {translations["notFound.message"]}
      </p>
      <div>
        <Button
          text={translations["notFound.button"]}
          size={{ md: "large" }}
          linkUrl="/"
          aria-label={translations["notFound.button"]}
        />
      </div>
    </div>
  );
}
