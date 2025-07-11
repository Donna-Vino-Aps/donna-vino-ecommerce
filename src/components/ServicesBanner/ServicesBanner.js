"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const services = [
  {
    icon: "/icons/services-icon1.svg",
    altKey: "services.p1",
    linkTestId: "/wines/pre-sale",
  },
  {
    icon: "/icons/services-icon2.svg",
    altKey: "services.p2",
    linkTestId: "/sales-policy#shipping",
  },
  {
    icon: "/icons/services-icon3.svg",
    altKey: "services.p3",
    linkTestId: "/events",
  },
];

const ServicesBanner = () => {
  const { translations } = useLanguage();

  return (
    <div className="flex w-full flex-col items-center justify-center bg-primary-light px-6 py-8 md:min-h-[20rem] md:px-12 md:py-20 lg:px-20">
      <h1 className="text-center text-headlineLarge text-tertiary1-darker md:text-displaySmall">
        {translations["services.heading"]}
      </h1>
      <section className="mt-16 flex w-full max-w-7xl flex-col justify-between gap-16 text-titleLarge md:mt-8 md:flex-row md:text-titleMedium lg:gap-8 lg:text-titleLarge">
        {services.map((service, index) => (
          <Link
            key={index}
            className="flex flex-col items-center gap-x-4 gap-y-4 text-tertiary1-darker md:flex-row"
            aria-label={translations[service.altKey]}
            data-testid={service.linkTestId}
            href={service.linkTestId}
          >
            <img
              src={service.icon}
              alt={translations["services.p3"]}
              className="h-[5rem] cursor-pointer md:h-[4.25rem] lg:h-[5rem]"
            />
            <span className="max-w-[15rem] text-center font-barlow font-normal md:max-w-[9rem] md:text-left lg:max-w-[13rem]">
              {translations[service.altKey]}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default ServicesBanner;
