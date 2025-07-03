"use client";

import React from "react";
import PropTypes from "prop-types";

export default function TasteProfilePercentage({ wine }) {
  const pairs = wine?.tasteValues ?? [];

  return (
    <div className="flex w-full max-w-[39.1875rem] flex-col gap-6">
      {pairs.map((pair, index) => (
        <div className="mt-9 flex items-center gap-6" key={index}>
          <div className="flex w-12 text-bodyMedium">
            <span className="w-20 shrink-0 text-bodySmall md:text-bodyMedium">
              {pair.left}
            </span>
          </div>
          <div className="relative h-3 flex-1 rounded-full bg-tertiary1-light">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-primary-active_dark"
              style={{ width: `${pair.value}%` }}
            ></div>
            <div
              className="absolute -top-9 -translate-x-1/2 transform rounded-md bg-primary-active_dark px-3 py-1 text-labelSmall text-tertiary2-light md:text-labelLarge"
              style={{ left: `${pair.value}%` }}
            >
              {pair.value}%
              <div className="absolute -bottom-1 left-1/2 h-0 w-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-primary-active_dark"></div>
            </div>
          </div>
          <div className="flex justify-between text-bodyMedium">
            <span className="w-20 shrink-0 text-left text-bodySmall md:text-bodyMedium">
              {pair.right}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

TasteProfilePercentage.propTypes = {
  wine: PropTypes.shape({
    tasteValues: PropTypes.arrayOf(
      PropTypes.shape({
        left: PropTypes.string.isRequired,
        right: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
};
