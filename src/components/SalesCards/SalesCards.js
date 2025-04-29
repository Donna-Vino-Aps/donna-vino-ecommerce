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
      url: "/sales-policy#shipping",
    },
    {
      src: "/icons/salesCards/distribution.svg",
      title: translations["salesCards.card2.title"],
      description1: translations["salesCards.card2.description1"],
      description2: translations["salesCards.card2.description2"],
      urlTitle: translations["salesCards.card2.urlTitle"],
      url: "/sales-policy#returns",
    },
    {
      src: "/icons/salesCards/credit-card.svg",
      title: translations["salesCards.card3.title"],
      description1: translations["salesCards.card3.description1"],
      description2: translations["salesCards.card3.description2"],
      urlTitle: translations["salesCards.card3.urlTitle"],
      url: "/sales-policy#payment",
    },
  ];

  return (
    <section className="relative mb-4 w-full bg-primary-light p-8">
      <img
        src="/icons/salesCards/dots.svg"
        alt="dots"
        className="absolute left-0 top-0 z-0 size-20 xl:bottom-0 xl:top-auto"
      />
      <img
        src="/icons/salesCards/dots.svg"
        alt="dots"
        className="absolute top-0 z-0 hidden size-20 xl:left-[453px] xl:block"
      />
      <img
        src="/icons/salesCards/dots.svg"
        alt="dots"
        className="absolute bottom-0 right-0 z-0 size-20 xl:right-[453px]"
      />
      <div className="relative z-10 grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
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
