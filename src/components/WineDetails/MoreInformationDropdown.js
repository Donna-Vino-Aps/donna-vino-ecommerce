"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";
import WineInfoRow from "./WineInfoRow";
import clsx from "clsx";

const MoreInfoDropdown = ({ wine }) => {
  const { translations } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const wineInfo = [
    { key: "grape", value: wine.grape, icon: "grape.svg" },
    { key: "vintage", value: wine.vintage, icon: "calendar.svg" },
    {
      key: "origin",
      value: `${wine.region}, ${wine.country}`,
      icon: "calendar.svg",
    },
    { key: "producer", value: wine.producer, icon: "factory.svg" },
    {
      key: "servingTemperature",
      value: wine.servingTemperature + "°C",
      icon: "term.svg",
    },
    {
      key: "alcoholContent",
      value: wine.alcoholContent + "%",
      icon: "wine-glass.svg",
    },
    {
      key: "volume",
      value:
        wine.volume < 1
          ? `${Math.round(wine.volume * 100)} cl`
          : `${wine.volume} L`,
      icon: "wine-bottle.svg",
    },
  ];

  return (
    <article className="mt-2 w-full sm:mt-20">
      <div
        className={`mx-auto my-4 w-11/12 min-w-[270px] max-w-[1250px] ${!isMobile && "rounded-b-lg"} ${isOpen && !isMobile && "shadow-md"}`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            "w-full rounded-lg",
            !isOpen && "border-[1px] border-tertiary1-light",
            isOpen &&
              isMobile &&
              "rounded-none border-b-[1px] border-others-stroke",
            isOpen &&
              !isMobile &&
              "rounded-b-none rounded-t-xl border-0 shadow-sm",
          )}
        >
          <div className="flex h-14  w-full items-center  justify-between px-6 sm:h-20">
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

        <div
          className={clsx(
            "overflow-hidden transition-all duration-500 ease-in-out",
            isMobile && "flex flex-col gap-2",
            isMobile
              ? isOpen
                ? "max-h-[600px] py-2 opacity-100 sm:py-8"
                : "max-h-0 opacity-0"
              : isOpen
                ? "max-h-[540px] py-3 ps-10 opacity-100 sm:py-8"
                : "max-h-0 opacity-0",
          )}
        >
          {wineInfo.map(({ key, value, icon }, idx) => (
            <WineInfoRow
              key={key}
              detail={{ key, value, icon }}
              isMobile={isMobile}
              isLast={idx === wineInfo.length - 1}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

export default MoreInfoDropdown;

MoreInfoDropdown.propTypes = {
  wine: PropTypes.shape({
    grape: PropTypes.string.isRequired,
    vintage: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    producer: PropTypes.string.isRequired,
    servingTemperature: PropTypes.string.isRequired,
    alcoholContent: PropTypes.string.isRequired,
    volume: PropTypes.number.isRequired,
  }).isRequired,
};
