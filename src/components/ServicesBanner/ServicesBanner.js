import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ServicesBanner = () => {
  const router = useRouter();
  const { translations } = useLanguage();
  return (
    <div className="flex flex-col gap-y-8 py-24 items-center justify-center w-full h-[20rem] bg-white">
      <h1 className="md:text-titleLarge lg:text-headlineMedium xl:text-displaySmall text-normal text-tertiary1-darker font-roboto">
        {translations["services.heading"]}
      </h1>
      <section className="flex flex-row justify-around w-full text-titleLarge md:text-titleMedium lg:text-titleLarge">
        <article className="flex flex-row items-center gap-x-2 xl:gap-x-4 gap-y-4 text-tertiary1-darker relative md:ml-4 md:left-2 lg:left-1 lg:ml-5 xl:left-6">
          <img
            src="/icons/services-icon1.svg"
            alt={translations["services.p1"]}
            className="cursor-pointer h-[4.25rem] lg:h-[5rem]"
            onClick={() => router.push("/signup")}
          ></img>
          <Link
            href=""
            data-testid="webshop-link"
            aria-label="Go to Webshop"
            className="text-left font-normal font-barlow md:max-w-[9rem] lg:max-w-[13rem]"
          >
            {translations["services.p1"]}
          </Link>
        </article>
        <article className="flex flex-row items-center gap-x-4 gap-y-4 text-tertiary1-darker">
          <img
            src="/icons/services-icon2.svg"
            alt={translations["services.p2"]}
            className="cursor-pointer h-[4.25rem] lg:h-[5rem]"
            onClick={() => router.push("/signup")}
          ></img>
          <Link
            href=""
            data-testid="delivery-link"
            aria-label="Go to delivery"
            className="text-left font-normal font-barlow md:max-w-[9rem] lg:max-w-[13rem]"
          >
            {translations["services.p2"]}
          </Link>
        </article>
        <article className="flex flex-row items-center gap-x-4 gap-y-4 text-tertiary1-darker relative md:mr-4 md:right-2 lg:right-1 lg:mr-5 xl:right-6">
          <img
            src="/icons/services-icon3.svg"
            alt={translations["services.p3"]}
            className="cursor-pointer h-[4.25rem] lg:h-[5rem]"
            onClick={() => router.push("/signup")}
          ></img>
          <Link
            href=""
            data-testid="events-link"
            aria-label="Go to Events"
            className="text-left font-normal font-barlow md:max-w-[9rem] lg:max-w-[13rem]"
          >
            {translations["services.p3"]}
          </Link>
        </article>
      </section>
    </div>
  );
};

export default ServicesBanner;
