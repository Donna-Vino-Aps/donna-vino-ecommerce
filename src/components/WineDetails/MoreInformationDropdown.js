"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

const MoreInfoDropdown = ({ wineInfo }) => {
  const { translations } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  wineInfo.volume =
    wineInfo.volume < 1 ? Math.round(wineInfo.volume * 100) : wineInfo.volume;

  return (
    <article className=" w-full ">
      <div className="mx-auto my-4 w-[1250px]  rounded-b-lg shadow-lg ">
        <button onClick={() => setIsOpen(!isOpen)}>
          <div className="flex h-[95px]  w-[1250px] items-center justify-between rounded-t-lg border-b-[1px] border-x-tertiary1-light px-6">
            <h4 className="text-headlineSmall text-tertiary1-dark">
              {translations["more-info.title"]}
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
          className={`overflow-hidden ps-10 transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[600px] py-8  opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {Object.entries(wineInfo).map(([key, value], index) => (
            <div key={index}>
              <div className={`flex items-center gap-4 `}>
                <Image
                  src={"/icons/more-info/" + icons[key]}
                  width={32}
                  height={32}
                  alt={translations["more-info." + key]}
                  className="h-8 w-8"
                />

                <h5 className="text-labelXLarge text-tertiary2-darker">
                  {translations["more-info." + key]}:
                </h5>

                {key == "producer" ? (
                  <Link
                    href={""}
                    className="text-bodyLarge text-[#637381] underline"
                  >
                    {value}
                  </Link>
                ) : (
                  <p className="text-bodyLarge text-[#637381]">
                    {value}
                    {key == "servingTemp" && "°C"}
                    {key == "alcoholContent" && "%"}
                    {key == "volume" && " cl"}
                  </p>
                )}
              </div>
              <div
                className={`my-5  w-full ${key === "volume" ? "" : "border-t-2 border-[#DFE4EA]"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

MoreInfoDropdown.defaultProps = {
  wineInfo: {
    grape: "Primitivo",
    vintage: "2023",
    origin: "Puglia, Italia",
    producer: "Tenuta Romana",
    servingTemp: "16-18",
    alcoholContent: 13.5,
    volume: 0.75,
  },
};

export default MoreInfoDropdown;

MoreInfoDropdown.propTypes = {
  wineInfo: PropTypes.shape({
    grape: PropTypes.string.isRequired,
    vintage: PropTypes.number.isRequired,
    origin: PropTypes.string.isRequired,
    producer: PropTypes.string.isRequired,
    servingTemp: PropTypes.string.isRequired,
    alcoholContent: PropTypes.string.isRequired,
    volume: PropTypes.number.isRequired,
  }).isRequired,
};

const icons = {
  grape: "grape.svg",
  vintage: "calender.svg",
  origin: "world.svg",
  producer: "factory.svg",
  servingTemp: "term.svg",
  alcoholContent: "wine-glass.svg",
  volume: "wine-bottle.svg",
};
