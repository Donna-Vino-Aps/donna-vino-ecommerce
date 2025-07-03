"use client";

import React from "react";
import TasteProfilePercentage from "@/components/TasteProfile/TasteProfilePercentage";
import TasteProfileDescription from "@/components/TasteProfile/TasteProfileDescription";

export default function TasteProfile({ wine }) {
  return (
    <section className="my-10 flex min-h-[26.5625rem] flex-col-reverse items-center justify-center gap-10 px-5 py-6 md:px-10 lg:my-20 lg:flex-row lg:gap-10 lg:px-28 xl:gap-20">
      <TasteProfilePercentage wine={wine} />
      <TasteProfileDescription wine={wine} />
    </section>
  );
}

import PropTypes from "prop-types";

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
