"use client";

import React from "react";
import TasteProfilePercentage from "@/components/TasteProfile/TasteProfilePercentage";
import TasteProfileDescription from "@/components/TasteProfile/TasteProfileDescription";
import PropTypes from "prop-types";

export default function TasteProfile({ wine }) {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="flex min-h-[26.5625rem] max-w-7xl flex-col-reverse items-center justify-center gap-10 py-6 md:gap-16  lg:flex-row xl:gap-20">
        <TasteProfilePercentage wine={wine} />
        <TasteProfileDescription wine={wine} />
      </div>
    </section>
  );
}

TasteProfile.propTypes = {
  wine: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tasteProfile: PropTypes.arrayOf(PropTypes.string),
    tasteValues: PropTypes.arrayOf(
      PropTypes.shape({
        left: PropTypes.string.isRequired,
        right: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }),
    ),
    imageUrl: PropTypes.string,
  }).isRequired,
};
