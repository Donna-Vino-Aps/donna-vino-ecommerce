"use client";

import React from "react";
import Pairing from "@/components/Pairing/Pairing";
import PropTypes from "prop-types";

export default function Pairings({ pairingSet }) {
  return (
    <section className="my-28 w-full px-4 md:px-8">
      <div>
        <h1 className="text-center font-barlow text-headlineMedium md:text-left md:text-displayMedium">
          Your Wine at the Table
        </h1>
        <p className="mt-2 text-center text-bodyLarge text-tertiary1-hover_dark md:text-left">
          Enhance the flavors with the perfect pairings. This Alamos Malbec
          pairs beautifully with:
        </p>
        <div className="mt-16 flex flex-row flex-wrap justify-center gap-16">
          {pairingSet.map((pairing, index) => (
            <div key={index}>
              <Pairing
                description={pairing.description}
                title={pairing.title}
                imageUrl={pairing.img}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Pairings.propTypes = {
  pairingSet: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
