import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/SalesCards/Card";

export default function SalesCards() {
  const { translations } = useLanguage();

  const salesCardsInfo = [
    {
      src: "/icons/salesCards/wine-box.svg",
      title: translations["salesCards.card1.title"],
      description1: translations["salesCards.card1.description1"],
      description2: translations["salesCards.card1.description2"],
      urlTitle: translations["salesCards.card1.urlTitle"],
      url: "/Sales-policy/#shipping",
    },
    {
      src: "/icons/salesCards/distribution.svg",
      title: translations["salesCards.card2.title"],
      description1: translations["salesCards.card2.description1"],
      description2: translations["salesCards.card2.description2"],
      urlTitle: translations["salesCards.card2.urlTitle"],
      url: "/",
    },
    {
      src: "/icons/salesCards/credit-card.svg",
      title: translations["salesCards.card3.title"],
      description1: translations["salesCards.card3.description1"],
      description2: translations["salesCards.card3.description2"],
      urlTitle: translations["salesCards.card3.urlTitle"],
      url: "/",
    },
  ];

  return (
    <section className="relative w-full p-8 bg-primary-light mb-4">
      <img
        src="/icons/salesCards/dots.svg"
        alt="dots"
        className="size-20 absolute top-0 left-0 xl:top-auto xl:bottom-0 z-0"
      />
      <img
        src="/icons/salesCards/dots.svg"
        alt="dots"
        className="size-20 absolute top-0 xl:left-[453px] z-0 hidden xl:block"
      />
      <img
        src="/icons/salesCards/dots.svg"
        alt="dots"
        className="size-20 absolute bottom-0 right-0 xl:right-[453px] z-0"
      />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        {salesCardsInfo.map((card, index) => (
          <Card
            key={index}
            src={card.src}
            title={card.title}
            description1={card.description1}
            description2={card.description2}
            urlTitle={card.urlTitle}
            url={card.url}
          />
        ))}
      </div>
    </section>
  );
}
