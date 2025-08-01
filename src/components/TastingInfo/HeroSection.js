"use client";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import React from "react";

const events = [
  { title: "tastingClassHeader", description: "tastingClassBody" },
  { title: "sommelierTableHeader", description: "sommelierTableBody" },
  { title: "privateTableHeader", description: "privateTableBody" },
];

export default function HeroSection() {
  const { translations } = useLanguage();

  return (
    <section className="flex w-full items-center justify-center pb-4 pt-10">
      <div className="flex max-w-7xl flex-col-reverse items-center gap-8 lg:flex-row  xl:gap-16">
        <div className="m-5 max-w-[80%] lg:max-w-[40rem] xl:max-w-[45rem]">
          <h1
            className={`text-center font-roboto text-displaySmall text-tertiary1-dark sm:text-start md:text-displayLarge`}
          >
            {translations["tasting-info.heroHeader"]}
          </h1>
          <p
            className={`mt-2 text-center text-bodySmall text-tertiary1-dark sm:text-start md:text-bodyLarge`}
            dangerouslySetInnerHTML={{
              __html: translations["tasting-info.heroBody"],
            }}
          ></p>
          {events.map((event) => (
            <div key={event.title} className="mt-5 flex flex-row items-start">
              <h2 className="me-2 flex-shrink-0 text-bodyMedium font-bold text-primary-normal sm:text-bodyLarge">
                {translations["tasting-info." + event.title]}:
              </h2>
              <p
                className={`text-bodyLarge sm:text-bodySmall ${event.title == "tastingClassHeader" && "text-primary-normal"}`}
                dangerouslySetInnerHTML={{
                  __html: translations["tasting-info." + event.description],
                }}
              ></p>
            </div>
          ))}
        </div>
        <div className="relative my-6 flex w-[200px] items-center justify-center sm:w-[300px] lg:my-0 xl:w-[440px]">
          <Image
            src="/images/image-bg-shapes.svg"
            width={440}
            height={440}
            alt="image-background"
            className="absolute h-52 w-52 sm:h-72 sm:w-72 xl:h-[440px] xl:w-[440px]"
          />
          <Image
            src={"/images/hero-tasting-info.jpg"}
            width={265}
            height={318}
            className="absolute h-36 w-32 rounded-lg sm:h-48 sm:w-40 xl:h-[318px] xl:w-[265px]"
            alt="wines"
          />

          <Image
            src={"/images/ellipse-tasting-info.png"}
            width={280}
            height={370}
            alt="glow"
            className="h-36 w-28 sm:h-48 sm:w-36 xl:h-80 xl:w-64"
            style={{ mixBlendMode: "overlay" }}
          />
        </div>
      </div>
    </section>
  );
}
