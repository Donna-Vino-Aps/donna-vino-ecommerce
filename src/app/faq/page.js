"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import FAQ from "@/components/FAQ/Faq";
import Image from "next/image";

const FrequentlyAskedQuestions = () => {
  const { translations } = useLanguage();

  return (
    <div>
      <section className="flex h-[7.75rem] w-full flex-row md:h-[29.313rem]">
        <div>
          <h1>Customer FAQs</h1>
          <p>Here you can find the most searched questions by our clients.</p>
        </div>
        <figure className="relative h-[29.313rem] w-[650px]">
          <Image
            className="object-cover object-right "
            alt="Pouring a glass of wine at a wine tasting"
            src="/images/faq-image.png"
            fill
          />
        </figure>
      </section>
      <FAQ />
    </div>
  );
};

export default FrequentlyAskedQuestions;
