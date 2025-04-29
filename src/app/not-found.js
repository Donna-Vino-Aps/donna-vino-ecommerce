"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Button from "@/components/Button/Button";

export default function NotFound() {
  const { translations } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h1 className="text-headlineLarge text-tertiary1-dark mb-4">
        {translations["notFound.title"]}
      </h1>
      <p className="text-bodyLarge text-tertiary1-normal mb-8 max-w-md">
        {translations["notFound.message"]}
      </p>
      <Link href="/" passHref>
        <Button
          text={translations["notFound.button"]}
          variant="redFullText"
          aria-label={translations["notFound.button"]}
        />
      </Link>
    </div>
  );
}
