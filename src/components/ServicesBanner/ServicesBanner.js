import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ServicesBanner = () => {
  const router = useRouter();
  const { translations } = useLanguage();
  return (
    <div className="custom-services-banner flex w-full flex-col items-center justify-center gap-y-8 py-24 md:h-[20rem]">
      <h1 className="mx-24 text-center font-roboto text-headlineLarge text-tertiary1-darker sm:mx-16 md:mx-0 md:text-start md:text-titleLarge lg:text-headlineMedium xl:text-displaySmall">
        {translations["services.heading"]}
      </h1>
      <section className="flex w-full flex-col justify-around space-y-4 text-titleLarge md:flex-row md:text-titleMedium lg:text-titleLarge">
        <article className="relative flex flex-col items-center justify-center gap-x-2 gap-y-4 text-tertiary1-darker md:left-2 md:ml-4 md:flex-row lg:left-1 lg:ml-5 xl:left-6 xl:gap-x-4">
          <img
            src="/icons/services-icon1.svg"
            alt={translations["services.p1"]}
            className="h-[5rem] cursor-pointer md:h-[4.25rem] lg:h-[5rem]"
            onClick={() => router.push("/")}
          ></img>
          <Link
            href=""
            data-testid="webshop-link"
            aria-label="Go to Webshop"
            className="max-w-[15rem] text-center font-barlow font-normal md:max-w-[9rem] md:text-left lg:max-w-[13rem]"
          >
            {translations["services.p1"]}
          </Link>
        </article>
        <article className="flex flex-col items-center justify-center gap-x-4 gap-y-4 text-tertiary1-darker md:flex-row">
          <img
            src="/icons/services-icon2.svg"
            alt={translations["services.p2"]}
            className="h-[5rem] cursor-pointer md:h-[4.25rem] lg:h-[5rem]"
            onClick={() => router.push("/")}
          ></img>
          <Link
            href=""
            data-testid="delivery-link"
            aria-label="Go to delivery"
            className="max-w-[15rem] text-center font-barlow font-normal md:max-w-[9rem] md:text-left lg:max-w-[13rem]"
          >
            {translations["services.p2"]}
          </Link>
        </article>
        <article className="relative flex flex-col items-center justify-center gap-x-4 gap-y-4 text-tertiary1-darker md:right-2 md:mr-4 md:flex-row lg:right-1 lg:mr-5 xl:right-6">
          <img
            src="/icons/services-icon3.svg"
            alt={translations["services.p3"]}
            className="h-[5rem] cursor-pointer md:h-[4.25rem] lg:h-[5rem]"
            onClick={() => router.push("/")}
          ></img>
          <Link
            href=""
            data-testid="events-link"
            aria-label="Go to Events"
            className="max-w-[15rem] text-center font-barlow font-normal md:max-w-[9rem] md:text-left lg:max-w-[13rem]"
          >
            {translations["services.p3"]}
          </Link>
        </article>
      </section>
    </div>
  );
};

export default ServicesBanner;
