"use client";
import React from "react";
import TasteCard from "@/components/TasteCard/TasteCard";
import { useLanguage } from "@/context/LanguageContext";
import PropTypes from "prop-types";

export default function TasteProfileCards({ wine }) {
  const { translations } = useLanguage();

  return (
    <section className="flex w-full items-center justify-center">
      <div className="grid w-full max-w-[1440px] auto-rows-min grid-cols-1 justify-items-center gap-x-10 gap-y-12 px-4 pb-8 pt-10 sm:gap-x-14 sm:px-20 sm:pt-12 md:grid-cols-1 lg:grid-cols-3">
        <TasteCard
          icon="/icons/tasteCard/grape.svg"
          title={translations["tasteProfile.tasteCard.fruitsTitle"]}
          bgColor="bg-primary-darker"
          description={wine?.tastesFruits?.join(", ")}
        />
        <TasteCard
          icon="/icons/tasteCard/ph_plant.svg"
          title={translations["tasteProfile.tasteCard.spicesTitle"]}
          bgColor="bg-others-oliveGold"
          description={wine?.tastesSpices?.join(", ")}
        />
        <TasteCard
          icon="/icons/tasteCard/streamline_log.svg"
          title={translations["tasteProfile.tasteCard.balsamicEarthTitle"]}
          bgColor="bg-secondary-dark"
          description={wine?.tastesNotes?.join(", ")}
        />
      </div>
    </section>
  );
}

TasteProfileCards.propTypes = {
  wine: PropTypes.shape({
    tastesFruits: PropTypes.arrayOf(PropTypes.string).isRequired,
    tastesSpices: PropTypes.arrayOf(PropTypes.string).isRequired,
    tastesNotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
