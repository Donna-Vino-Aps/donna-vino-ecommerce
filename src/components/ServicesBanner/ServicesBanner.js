import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const ServicesBanner = () => {
  const { translations } = useLanguage();
  return (
    <div className="flex flex-col gap-y-6 py-24 items-center justify-center w-full h-[20rem] bg-white">
      <h1 className="text-displaySmall text-normal text-tertiary1-darker font-roboto">
        {translations["services.heading"]}
      </h1>
      <section className="flex gap-y-4 gap-x-4 text-titleLarge">
        <article className="flex flex-row gap-x-2 gap-y-4 text-tertiary1-darker">
          <img
            src="/icons/services-icon1.svg"
            alt={translations["services.p1"]}
          ></img>
          <Link
            href=""
            data-testid="webshop-link"
            aria-label="Go to Webshop"
            className="text-left font-normal font-barlow"
          >
            {translations["services.p1"]}
          </Link>
        </article>
        <article className="flex flex-row gap-x-2 gap-y-4 text-tertiary1-darker">
          <img
            src="/icons/services-icon2.svg"
            alt={translations["services.p2"]}
          ></img>
          <Link
            href=""
            data-testid="webshop-link"
            aria-label="Go to Webshop"
            className="text-left font-normal font-barlow"
          >
            {translations["services.p1"]}
          </Link>
        </article>
        <article className="flex flex-row gap-x-2 gap-y-4 text-tertiary1-darker">
          <img
            src="/icons/services-icon3.svg"
            alt={translations["services.p3"]}
          ></img>
          <Link
            href=""
            data-testid="webshop-link"
            aria-label="Go to Webshop"
            className="text-left font-normal font-barlow"
          >
            {translations["services.p1"]}
          </Link>
        </article>
      </section>
    </div>
  );
};

export default ServicesBanner;
