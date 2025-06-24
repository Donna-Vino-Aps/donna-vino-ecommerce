"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import useIsMobile from "@/hooks/useIsMobile";
import FaqSection from "@/components/FAQ/FaqSection";
import Image from "next/image";
// import Image from "next/image";

const FrequentlyAskedQuestions = () => {
  const { translations } = useLanguage();
  const isMobile = useIsMobile(768);

  return (
    <div className={`${isMobile ? "mb-12 space-y-12" : "mb-14 space-y-14"}`}>
      <section className="z-[1] flex flex-row bg-primary-light">
        <div>
          <Image
            src="/design-elements/dotted-shape.svg"
            width="50"
            height="50"
            className="absolute left-0 top-[16.3rem] md:top-[41rem]"
          />
          <Image
            src="/design-elements/dotted-shape.svg"
            width="50"
            height="50"
            className="absolute right-0 top-[7.3rem] md:top-60"
          />
        </div>
        <div className="mb-4 flex flex-col justify-center gap-6 px-8 text-center sm:mb-0 sm:w-[45%] md:text-start lg:w-[40%]">
          <h1 className="mt-8 text-displayMedium sm:mt-4 sm:max-w-full sm:text-displaySmall md:mt-0 lg:text-displayMedium">
            {isMobile ? translations["faq.h1-mobile"] : translations["faq.h1"]}
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
      <div className="flex items-center justify-center">
        <FaqSection />
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
