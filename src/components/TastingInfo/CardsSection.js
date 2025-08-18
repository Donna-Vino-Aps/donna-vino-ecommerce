"use client";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import React from "react";
import TastingCard from "./TastingCard";

const events = [
  {
    title: "tastingClassHeader",
    body: "tastingClass-body",
    engagement: "tastingClass-engagement",
    buttonTitle: "tastingClass-button",
    image: "tasting-info-card-1.png",
  },
  {
    title: "sommelierTableHeader",
    body: "sommelierTable-body",
    engagement: "sommelierTable-engagement",
    buttonTitle: "sommelierTable-button",
    image: "tasting-info-card-2.png",
  },
  {
    title: "privateTableHeaderCard",
    body: "privateTable-body",
    engagement: "privateTable-engagement",
    buttonTitle: "privateTable-button",
    image: "tasting-info-card-3.png",
  },
];

export default function CardsSection() {
  const { translations } = useLanguage();

  return (
    <section className="flex w-full items-center justify-center pb-40">
      <div className=" max-w-7xl">
        <h1 className="mb-6 text-center font-roboto text-headlineSmall sm:mb-8 sm:text-displaySmall">
          {translations["tasting-info.cardsHeader"]}
        </h1>
        <Image
          src={"/icons/chevron-down.svg"}
          height={20}
          width={20}
          className="visible mx-auto mb-6 sm:invisible"
          alt=""
          aria-hidden="true"
        />
        <div className="flex flex-col items-center justify-center gap-7 xl:flex-row">
          {events.map((event) => (
            <TastingCard key={event.title} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
