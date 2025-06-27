import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";

export const SizeSelector = ({
  selectedSize,
  setSelectedSize,
  bottlePrice,
  casePrice,
  pricePerLiterBottle,
  pricePerLiterCase,
}) => {
  const { translations } = useLanguage();
  const isOpen = true;
  return (
    <>
      <p className="mb-2 ml-[2px] mt-5 text-titleMedium font-medium text-tertiary1-dark">
        {translations["wine-details.selectsize"]}
      </p>
      <div className="flex w-full max-w-full flex-col items-center rounded-b-md text-titleMedium font-medium text-primary-light shadow-md">
        <div
          className={`flex w-full items-center justify-between bg-primary-normal px-4 py-2 ${isOpen ? "rounded-t-[10px]" : "rounded-[10px]"} cursor-pointer`}
        >
          <div className="flex items-center gap-2">
            <Image
              src={
                selectedSize === "bottle"
                  ? "/icons/wine-bottle-white.svg"
                  : "/icons/wine-case-white.svg"
              }
              width="16"
              height="16"
              alt={selectedSize === "bottle" ? "wine bottle" : "wine case"}
              className="h-4 w-4"
            />
            <p className="text-titleMedium font-medium text-primary-light">
              {selectedSize === "bottle"
                ? translations["wine-details.singlebottle"]
                : translations["wine-details.singlecase"]}
            </p>
          </div>
        </div>
        {isOpen && (
          <div
            className={`flex w-full flex-col bg-transparent text-tertiary2-darker`}
          >
            <div
              className={`flex w-full items-start justify-between gap-1 ${selectedSize === "bottle" ? "border-b-2 border-e-2 border-s-2 border-solid border-primary-normal" : ""} h-[3.5rem] cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize("bottle");
              }}
            >
              <div className="flex flex-row gap-1 px-[0.875rem] py-5">
                <Image
                  src="/icons/wine-bottle.svg"
                  width="16"
                  height="16"
                  alt="wine bottle"
                  className="h-4 w-4"
                />
                <p className="text-labelMedium font-medium">
                  {translations["wine-details.singlebottle"]}
                </p>
              </div>
              <div className="flex flex-col items-end self-start p-2 text-right">
                <p
                  className={`text-titleMedium font-semibold ${selectedSize === "bottle" ? "text-primary-normal" : "text-tertiary2-darker"}`}
                >
                  {bottlePrice.toFixed(2)} kr
                </p>
                <p className="text-labelSmall text-tertiary2-darker">
                  {pricePerLiterBottle} kr / L
                </p>
              </div>
            </div>
            <div
              className={`flex w-full items-start justify-between gap-1 ${selectedSize === "case" ? "border-2 border-solid border-primary-normal" : ""} h-[3.5rem] cursor-pointer border-solid`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize("case");
              }}
            >
              <div className="flex flex-row gap-1 px-4 py-5">
                <Image
                  src="/icons/wine-case.svg"
                  width="16"
                  height="16"
                  alt="wine case"
                  className="h-4 w-4"
                />
                <p className="text-labelMedium font-medium">
                  {translations["wine-details.singlecase"]}
                </p>
              </div>
              <div className="flex flex-col items-end self-start p-2 text-right">
                <p
                  className={`text-titleMedium font-semibold ${selectedSize === "case" ? "text-primary-normal" : "text-tertiary2-darker"}`}
                >
                  {casePrice.toFixed(2)} kr
                </p>
                <p className="text-labelSmall text-tertiary2-darker">
                  {pricePerLiterCase} kr / L
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

SizeSelector.propTypes = {
  selectedSize: PropTypes.string.isRequired,
  setSelectedSize: PropTypes.func.isRequired,
  bottlePrice: PropTypes.number.isRequired,
  casePrice: PropTypes.number.isRequired,
  pricePerLiterBottle: PropTypes.string.isRequired,
  pricePerLiterCase: PropTypes.string.isRequired,
  preSale: PropTypes.bool.isRequired,
};
