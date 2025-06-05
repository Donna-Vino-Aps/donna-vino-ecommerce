"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import FaqSection from "@/components/FAQ/FaqSection";
// import Image from "next/image";

const FrequentlyAskedQuestions = () => {
  const { translations } = useLanguage();

  return (
    <div className="space-y-8">
      <section className="z-[1] flex flex-row bg-primary-light">
        <div className="mb-4 flex flex-col justify-center gap-6 px-8 text-center sm:mb-0 sm:w-[45%] md:text-start lg:w-[40%]">
          <h1 className="mt-8 text-displayMedium sm:mt-4 sm:max-w-full sm:text-displaySmall md:mt-0 lg:text-displayMedium">
            {translations["faq.h1"]}
          </h1>
          <p className="mb-4 text-bodyLarge sm:mb-0">{translations["faq.p"]}</p>
        </div>
        <figure className="hidden overflow-hidden object-right sm:flex sm:min-w-[55%] lg:min-w-[60%]">
          <img
            src="/images/events-header-unsplash.jpg"
            className="min-h-[22.5rem] w-full object-cover sm:max-h-[25.313rem] sm:min-w-[54.375rem] sm:rounded-tl-[11.531rem] md:max-h-[29.313rem]"
            alt="Hands pouring a glass of wine at a wine tasting"
          />
        </figure>
      </section>
      <div className="">
        <FaqSection />
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
