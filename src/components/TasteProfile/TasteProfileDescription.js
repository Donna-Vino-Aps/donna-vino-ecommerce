"use client";

import React from "react";
import PropTypes from "prop-types";

export default function TasteProfileDescription({ wine }) {
  const dottedString = Array.isArray(wine.tasteProfile)
    ? wine.tasteProfile.join(" ・ ")
    : "–";

  return (
    <div className="flex w-full flex-col items-center justify-center text-center lg:mx-0">
      <h2 className="font-barlow text-headlineMedium text-tertiary1-active_dark md:text-displayMedium">
        Taste Profile: {wine.title}
      </h2>
      <div className="mt-8">
        <span className="font-barlow text-bodyLarge text-primary-darker md:text-titleLarge">
          {dottedString}
        </span>
      </div>
    </div>
  );
}

TasteProfileDescription.propTypes = {
  wine: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tasteProfile: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
