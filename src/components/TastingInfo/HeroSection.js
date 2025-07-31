"use client";
import { useLanguage } from "@/context/LanguageContext";
import useIsMobile from "@/hooks/useIsMobile";
import Image from "next/image";
import React from "react";

const events = [
  { title: "tastingClassHeader", description: "tastingClassBody" },
  { title: "sommelierTableHeader", description: "sommelierTableBody" },
  { title: "privateTableHeader", description: "privateTableBody" },
];

export default function HeroSection() {
  const { translations } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section className="flex w-full items-center justify-center pt-10">
      <div
        className={`flex max-w-7xl flex-col-reverse items-center sm:flex-row ${isMobile ? "gap-8" : "gap-16"} `}
      >
        <div className={`max-w-[45rem] ${isMobile && "m-5"}`}>
          <h1
            className={`text-tertiary1-dark ${isMobile ? "text-center text-displaySmall" : "text-displayLarge"} `}
          >
            {translations["tasting-info.heroHeader"]}
          </h1>
          <p
            className={`mt-2 text-tertiary1-dark ${isMobile ? "text-center text-bodySmall" : "text-bodyLarge"}`}
            dangerouslySetInnerHTML={{
              __html: translations["tasting-info.heroBody"],
            }}
          ></p>
          {events.map((event) => (
            <div key={event.title} className="mt-5 flex flex-row items-start">
              <h2
                className={`me-2 flex-shrink-0 font-bold text-primary-normal ${isMobile ? "text-bodyMedium" : "text-bodyLarge"}`}
              >
                {translations["tasting-info." + event.title]}:
              </h2>
              <p
                className={`${isMobile && "text-bodySmall"} ${event.title == "tastingClassHeader" && "text-primary-normal"}`}
                dangerouslySetInnerHTML={{
                  __html: translations["tasting-info." + event.description],
                }}
              ></p>
            </div>
          ))}
        </div>
        <div
          className={`relative flex w-[200px] items-center justify-center sm:w-[300px] lg:w-[440px] ${isMobile && "mt-5"}`}
        >
          <Image
            src="/images/image-bg-shapes.svg"
            width={isMobile ? 200 : 440}
            height={isMobile ? 200 : 440}
            alt="image-background"
            className={`absolute ${isMobile ? "h-52 w-52" : "h-[440px] w-[440px]"}`}
          />
          <Image
            src={"/images/hero-tasting-info.jpg"}
            width={isMobile ? 120 : 265}
            height={isMobile ? 160 : 318}
            className={`absolute rounded-lg ${isMobile ? "h-36 w-32" : "h-[318px] w-[265px]"}`}
            alt="wines"
          />

          <Image
            src={"/images/ellipse-tasting-info.png"}
            width={isMobile ? 130 : 280}
            height={isMobile ? 140 : 370}
            alt="glow"
            className={isMobile ? "h-36 w-28" : "h-64 w-96"}
            style={{ mixBlendMode: "overlay" }}
          />
        </div>
      </div>
    </section>
  );
}
