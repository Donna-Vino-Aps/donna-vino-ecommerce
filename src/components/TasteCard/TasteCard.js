"use client";
import React from "react";
import PropTypes from "prop-types";

export default function TasteCard({
  icon,
  title,
  description,
  bgColor = "bg-primary-darker",
}) {
  return (
    <div
      className={`flex min-h-[140px] w-full max-w-[370px] flex-col self-start rounded-lg p-4 shadow-md ${bgColor} text-white`}
    >
      <div className="mb-6 ml-1 mt-1 flex items-center gap-2 lg:ml-3">
        <img src={icon} alt="TasteCard icon" />
        <span className="pl-1 text-titleLarge lg:pl-0">{title}</span>
      </div>

      <div className="-mx-4 h-[0.5px] bg-white" />

      <div className="mt-6 px-3 text-bodyLarge">{description}</div>
    </div>
  );
}

TasteCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
};
