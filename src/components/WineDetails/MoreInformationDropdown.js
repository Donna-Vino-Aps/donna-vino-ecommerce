"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";

const MoreInfoDropdown = ({ wine }) => {
  const { translations } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const classNameMobile = `
    flex flex-col gap-2 overflow-hidden transition-all duration-500 ease-in-out ${
      isOpen ? "max-h-[600px] py-2 opacity-100 sm:py-8" : "max-h-0 opacity-0"
    }`;

  const classNameDesktop = `
    overflow-hidden ps-10 transition-all duration-500 ease-in-out ${
      isOpen ? "max-h-[540px] py-3 opacity-100 sm:py-8" : "max-h-0 opacity-0"
    }`;

  const wineInfo = {
    grape: wine.grape,
    vintage: wine.vintage,
    origin: wine.region + ", " + wine.country,
    producer: wine.producer,
    servingTemp: wine.servingTemp,
    alcoholContent: wine.alcoholContent,
    volume: wine.volume < 1 ? Math.round(wine.volume * 100) : wine.volume,
  };

  return (
    <article className=" w-full ">
      <div
        className={`mx-auto my-4 w-11/12 min-w-[270px] max-w-[1250px] ${!isMobile && "rounded-b-lg"} ${isOpen && !isMobile && "shadow-md"}`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full rounded-lg ${
            isOpen
              ? isMobile
                ? "rounded-none border-b-[1px] border-others-stroke"
                : "rounded-b-none rounded-t-xl border-0 shadow-sm"
              : "border-[1px] border-tertiary1-light"
          }
            `}
        >
          <div className="flex h-[57px] w-full items-center  justify-between px-6 sm:h-[95px] ">
            <h4 className="text-titleLarge text-tertiary1-dark sm:text-headlineSmall">
              {isMobile
                ? translations["more-info.title-short"]
                : translations["more-info.title"]}
            </h4>

            <Image
              src={
                isOpen
                  ? "/icons/more-info/chevron-up.svg"
                  : "/icons/chevron-down.svg"
              }
              width={24}
              height={24}
              alt="Open-more"
              className="h-6 w-6"
            />
          </div>
        </button>

        <div className={isMobile ? classNameMobile : classNameDesktop}>
          {Object.entries(wineInfo).map(([key, value], index) => (
            <div key={index}>
              <div
                className={`
                  flex items-center gap-4 
                  ${isMobile ? "py-2 ps-6" : "ps-4"} 
                  ${key !== "volume" && isMobile ? "border-b border-others-stroke" : ""}
                `}
              >
                <Image
                  src={`/icons/more-info/${icons[key]}`}
                  width={isMobile ? 16 : 32}
                  height={isMobile ? 16 : 32}
                  alt={translations[`more-info.${key}`]}
                  className={isMobile ? "h-4 w-4" : "h-8 w-8"}
                />

                <h5 className="text-labelLarge text-tertiary2-darker sm:text-labelXLarge">
                  {translations[`more-info.${key}`]}:
                </h5>

                <p className="text-bodyMedium text-others-primaryText sm:text-bodyLarge">
                  {value}
                  {key === "servingTemp" && "°C"}
                  {key === "alcoholContent" && "%"}
                  {key === "volume" && " cl"}
                </p>
              </div>

              {!isMobile && (
                <div
                  className={`my-5 w-full ${key === "volume" ? "" : "border-t-2 border-others-stroke"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

MoreInfoDropdown.defaultProps = {
  wine: {
    grape: "Primitivo",
    vintage: "2023",
    region: "Puglia",
    country: "Italia",
    producer: "Tenuta Romana",
    servingTemp: "16-18",
    alcoholContent: 13.5,
    volume: 0.75,
  },
};

export default MoreInfoDropdown;

MoreInfoDropdown.propTypes = {
  wine: PropTypes.shape({
    grape: PropTypes.string.isRequired,
    vintage: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    producer: PropTypes.string.isRequired,
    servingTemp: PropTypes.string.isRequired,
    alcoholContent: PropTypes.string.isRequired,
    volume: PropTypes.number.isRequired,
  }).isRequired,
};

const icons = {
  grape: "grape.svg",
  vintage: "calendar.svg",
  origin: "world.svg",
  producer: "factory.svg",
  servingTemp: "term.svg",
  alcoholContent: "wine-glass.svg",
  volume: "wine-bottle.svg",
};
