"use client";
import React from "react";
import TastingSession from "@/components/HeroSlider/HeroSlider";
import ServicesBanner from "@/components/ServicesBanner/ServicesBanner";
import SalesCards from "@/components/SalesCards/SalesCards";
import Pairings from "@/components/Pairing/Pairings";

const pairingSet = [
  {
    img: "images/pairing/ribeye.png",
    title: "Grilled Ribeye steak",
    description:
      "The bold tannins of this wine balance the juiciness of the meat.",
  },
  {
    img: "images/pairing/pasta.png",
    title: "Truffle pasta",
    description:
      "Earthy flavors in perfect harmony. Lorem ipsum ubit sun amet.",
  },
  {
    img: "images/pairing/pecorino.png",
    title: "Aged Pecorino cheese",
    description: "Its saltiness enhances the wine’s fruity notes.",
  },
  {
    img: "images/pairing/tuna.png",
    title: "Seared Tuna steak",
    description: "A refined contrast of richness and freshness.",
  },
];

export default function Home() {
  return (
    <div className="flex w-[100%]" data-testid="home-container">
      <main
        className="flex w-full flex-col gap-4 bg-white"
        data-testid="main-heading"
      >
        <TastingSession />
        <ServicesBanner />
        <Pairings {...{ pairingSet }} />
        <SalesCards />
      </main>
    </div>
  );
}
