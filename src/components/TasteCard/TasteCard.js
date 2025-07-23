"use client";

import React from "react";
import PropTypes from "prop-types";

export default function TasteCard(icon, title, description, bgColor) {
  return (
    <div
      className={`flex min-h-[164px] w-[370px] flex-col gap-2 rounded-lg p-4 shadow-md ${bgColor}`}
    >
      <div className="flex items-center gap-2 text-xl font-semibold">
        <img src={icon} alt="TasteCard icon" />
        <span>{title}</span>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
}

TasteCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
};
