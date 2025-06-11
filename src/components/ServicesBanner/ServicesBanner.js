import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const services = [
  {
    icon: "/icons/services-icon1.svg",
    altKey: "services.p1",
    linkTestId: "webshop-link",
  },
  {
    icon: "/icons/services-icon2.svg",
    altKey: "services.p2",
    linkTestId: "delivery-link",
  },
  {
    icon: "/icons/services-icon3.svg",
    altKey: "services.p3",
    linkTestId: "events-link",
  },
];

const ServicesBanner = () => {
  const router = useRouter();
  const { translations } = useLanguage();
  return (
    <div className="custom-services-banner flex w-full flex-col items-center justify-center gap-y-8 py-24 md:h-[20rem]">
      <h1 className="mx-24 text-center font-roboto text-headlineLarge text-tertiary1-darker sm:mx-16 md:mx-0 md:text-start md:text-titleLarge lg:text-headlineMedium xl:text-displaySmall">
        {translations["services.heading"]}
      </h1>
      <section className="flex w-full flex-col justify-around space-y-4 text-titleLarge md:flex-row md:text-titleMedium lg:text-titleLarge">
        {services.map((service, index) => (
          <article
            key={index}
            className="relative flex flex-col items-center justify-center gap-x-4 gap-y-4 text-tertiary1-darker md:flex-row"
          >
            <img
              src={service.icon}
              alt={translations["services.p3"]}
              className="h-[5rem] cursor-pointer md:h-[4.25rem] lg:h-[5rem]"
              onClick={() => router.push("/")}
            ></img>
            <Link
              href=""
              data-testid={service.linkTestId}
              aria-label={translations[service.altKey]}
              className="max-w-[15rem] text-center font-barlow font-normal md:max-w-[9rem] md:text-left lg:max-w-[13rem]"
            >
              {translations[service.altKey]}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default ServicesBanner;
