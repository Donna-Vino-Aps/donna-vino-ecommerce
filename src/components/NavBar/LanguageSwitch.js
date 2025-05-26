"use client";

import { useLanguage } from "@/context/LanguageContext";
import React, { useEffect } from "react";

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("pageLanguage");
    setLanguage(savedLanguage || "dk");
  }, [setLanguage]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div
      className="flex h-[2.87rem] w-[5.12rem] items-center justify-center gap-2 rounded-sm shadow-sm lg:absolute lg:right-[3.44rem]"
      data-testid="language-switch-container"
      role="toolbar"
      aria-label="Language Switch"
    >
      <div
        className="flex h-[2.25rem] w-[4.5rem] items-center justify-center"
        data-testid="language-switch"
      >
        <button
          data-testid="en-icon"
          aria-label="Switch to English"
          aria-pressed={language === "en"}
          className={`flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-md hover:bg-primary-light ${
            language === "en" ? "bg-primary-light" : ""
          }`}
          onClick={() => handleLanguageChange("en")}
        >
          <img
            src="/images/ic_en.png"
            className="h-[1rem] w-[1rem]"
            alt="English Flag"
          />
        </button>
        <button
          data-testid="dk-icon"
          aria-label="Switch to Danish"
          aria-pressed={language === "dk"}
          className={`flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-md hover:bg-primary-light ${
            language === "dk" ? "bg-primary-light" : ""
          }`}
          onClick={() => handleLanguageChange("dk")}
        >
          <img
            src="/images/ic_dk.png"
            className="h-[1rem] w-[1rem]"
            alt="Danish Flag"
          />
        </button>
      </div>
    </div>
  );
}

export default LanguageSwitch;
