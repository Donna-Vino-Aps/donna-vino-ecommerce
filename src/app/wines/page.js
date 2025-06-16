"use client";

import React from "react";
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

const Wines = () => {
  return (
    <div>
      <h1 className="text-center text-displayLarge">Wines</h1>
      <Pairings {...{ pairingSet }} />
    </div>
  );
};

export default Wines;
