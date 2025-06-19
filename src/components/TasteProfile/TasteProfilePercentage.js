"use client";

import React from "react";

const pairs = [
  { left: "Delicate", right: "Bold", value: 30 },
  { left: "Velvety", right: "Astringent", value: 80 },
  { left: "Dry", right: "Smooth", value: 50 },
  { left: "Soft", right: "Crisp", value: 90 },
];

export default function TasteProfilePercentage() {
  return (
    <div className="flex w-[39.1875rem] flex-col gap-6">
      {pairs.map((pair, index) => (
        <div className="mt-9 flex items-center gap-4" key={index}>
          <div className="flex w-12 text-bodyMedium">
            <span>{pair.left}</span>
          </div>
          <div className="relative h-3 w-[28.375rem] gap-4 rounded-full bg-tertiary1-light">
            <div
              className="absolute left-0 top-0 h-3 rounded-full bg-primary-active_dark"
              style={{ width: `${pair.value}%` }}
            ></div>
            <div
              className="absolute -top-9 -translate-x-1/2 transform rounded-md bg-primary-active_dark px-3 py-1 text-labelLarge text-tertiary2-light"
              style={{ left: `${pair.value}%` }}
            >
              {pair.value}%
              <div className="absolute -bottom-1 left-1/2 h-0 w-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-primary-active_dark"></div>
            </div>
          </div>
          <div className="flex justify-between text-bodyMedium">
            <span>{pair.right}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
