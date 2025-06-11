"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/Button/Button";
import SEO from "@/components/SEO/SEO";

export default function NotFound() {
  const { translations } = useLanguage();

  return (
    <div className="custom-services-banner flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <SEO
        title={translations["notFound.seo.title"]}
        description={translations["notFound.seo.description"]}
        robots={false}
      />

      <h1 className="mb-4 text-headlineMedium text-tertiary1-darker md:text-headlineLarge">
        {translations["notFound.title"]}
      </h1>
      <p className="mb-8 max-w-md text-bodyMedium text-tertiary1-normal md:text-bodyLarge">
        {translations["notFound.message"]}
      </p>
      <div>
        <Button
          text={translations["common.button.backToHome"]}
          width="wide"
          linkUrl="/"
          aria-label={translations["common.button.backToHome"]}
        />
      </div>
    </div>
  );
}
