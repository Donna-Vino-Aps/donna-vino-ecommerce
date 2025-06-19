"use client";

import React from "react";

const taste = ["Exotic", "Spicy", "Earthy", "Crisp", "Astringent"];
const dottedString = taste.join(" ・ ");

export default function TasteProfileDescription() {
  return (
    <div>
      <h1 className="items-center font-barlow text-displayMedium">
        Taste Profile: Wine name
      </h1>
      <div className="mt-8 flex justify-center">
        <span className="font-barlow text-titleLarge text-primary-darker">
          {dottedString}
        </span>
      </div>
    </div>
  );
}
