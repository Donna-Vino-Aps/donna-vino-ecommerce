"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import useIsMobile from "@/hooks/useIsMobile";
import FaqSection from "@/components/FAQ/FaqSection";
import Image from "next/image";

const FrequentlyAskedQuestions = () => {
  const { translations } = useLanguage();
  const isMobile = useIsMobile(768);

  return (
    <div className={`mb-20 ${isMobile ? "space-y-12" : "space-y-20"}`}>
      <section className="z-[1] flex flex-row bg-primary-light">
        <div>
          <img
            src={
              isMobile
                ? "/design-elements/dotted-shape-3x4.svg"
                : "/design-elements/dotted-shape-bottom.svg"
            }
            alt="Dotted shape"
            className="absolute -left-2 top-[15.25rem] h-[55px] w-[55px] sm:top-[28.75rem] md:top-[40.4rem] md:w-[60px]"
          />
          <img
            src={
              isMobile
                ? "/design-elements/dotted-shape-4x3.svg"
                : "/design-elements/dotted-shape-top.svg"
            }
            alt="Dotted shape"
            className="absolute right-1 top-[6.65rem] h-[55px] w-[55px] sm:left-[55%] sm:top-[6.75rem] md:left-[42.5%] md:top-[14.25rem] md:w-[60px]"
          />
        </div>
        <div className="mb-4 flex w-full flex-col justify-center gap-6 px-8 text-center sm:mb-0 md:w-[45%] md:text-start lg:w-[40%] lg:px-12">
          <h1 className="mt-8 text-center text-displaySmall sm:mt-4 sm:max-w-full md:mt-0 md:text-start lg:text-displayMedium">
            {isMobile ? translations["faq.h1-mobile"] : translations["faq.h1"]}
          </h1>
          <p className="mb-4 text-bodySmall sm:mb-0 md:text-bodyLarge">
            {translations["faq.p"]}
          </p>
        </div>
        <figure className="hidden overflow-hidden object-right sm:flex sm:min-w-[55%] lg:min-w-[60%]">
          <Image
            src="/images/kelsey-knight-unsplash.jpg"
            priority
            width={870}
            height={469}
            className="min-h-[22.5rem] w-full object-cover sm:max-h-[25.313rem] sm:min-w-[54.375rem] sm:rounded-tl-[11.531rem] md:max-h-[29.313rem]"
            alt="Hands toasting their wine glasses at a wine tasting"
          />
        </figure>
      </section>
      <FaqSection />
    </div>
  );
};

export default FrequentlyAskedQuestions;
