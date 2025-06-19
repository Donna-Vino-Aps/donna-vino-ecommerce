"use client";
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const QuantitySelector = ({
  quantityAvailable,
  selectedQuantity,
  setSelectedQuantity,
  price,
  casePrice,
  selectedSize,
  setSelectedSize,
  volume,
  preSale,
  min = 1,
  max = quantityAvailable || 99,
}) => {
  const { translations } = useLanguage();
  const handleIncrement = () => {
    if (preSale ? true : selectedQuantity < max) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  const handleDecrement = () => {
    // Ensure quantity does not go below the minimum
    if (selectedQuantity > min) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const [isOpen, setOpen] = React.useState(false);

  return (
    <section>
      <p className="mb-2 ml-[2px] text-titleMedium font-medium text-tertiary1-dark">
        {translations["wine-details.quantity"]}
      </p>
      <div className="grid h-10 w-full grid-cols-[20%_60%_20%] rounded-xl border border-solid border-tertiary1-light md:h-9 md:w-[7.125rem] md:grid-cols-[28%_44%_28%] md:rounded-md">
        <button
          onClick={handleDecrement}
          disabled={preSale ? false : selectedQuantity <= 1}
          className="flex items-center justify-center border-r border-tertiary1-light disabled:opacity-50"
        >
          <Image src="/icons/minus.svg" width="12" height="12" alt="Decrease" />
        </button>

        <span className="flex items-center justify-center border-x border-tertiary1-light px-4 text-center text-titleMedium font-semibold">
          {selectedQuantity}
        </span>

        <button
          onClick={handleIncrement}
          disabled={selectedQuantity >= max}
          className="flex items-center justify-center border-l border-tertiary1-light disabled:opacity-50"
        >
          <Image src="/icons/plus.svg" width="12" height="12" alt="Increase" />
        </button>
      </div>
      <p className="mb-2 ml-[2px] mt-5 text-titleMedium font-medium text-tertiary1-dark">
        {translations["wine-details.selectsize"]}
      </p>
      <div
        className="flex w-full max-w-full flex-col items-center rounded-b-md text-titleMedium font-medium text-primary-light shadow-md"
        onClick={preSale ? () => setOpen((prev) => !prev) : () => {}}
      >
        <div
          className={`flex w-full items-center justify-between bg-primary-normal px-4 py-2 ${isOpen ? "rounded-t-[10px]" : "rounded-[10px]"} cursor-pointer`}
        >
          <div className="flex gap-2">
            <Image
              src={
                selectedSize === "bottle"
                  ? "/icons/wine-bottle-white.svg"
                  : "/icons/wine-case-white.svg"
              }
              width="16"
              height="16"
              alt={selectedSize === "bottle" ? "wine bottle" : "wine case"}
            />
            <p className="text-titleMedium font-medium text-primary-light">
              {selectedSize === "bottle"
                ? translations["wine-details.singlebottle"]
                : translations["wine-details.singlecase"]}
            </p>
          </div>
          <Image
            src={
              isOpen
                ? "/icons/chevron-up-white.svg"
                : "/icons/chevron-down-white.svg"
            }
            width="20"
            height="20"
            alt="Toggle Size Selector"
          />
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
                setOpen(false);
              }}
            >
              <div className="flex flex-row gap-1 px-[0.875rem] py-5">
                <Image
                  src="/icons/wine-bottle.svg"
                  width="16"
                  height="16"
                  alt="wine bottle"
                />
                <p className="text-labelMedium font-medium">
                  {translations["wine-details.singlebottle"]}
                </p>
              </div>
              <div className="flex flex-col items-end self-start p-2 text-right">
                <p
                  className={`text-titleMedium font-semibold ${selectedSize === "bottle" ? "text-primary-normal" : "text-tertiary2-darker"}`}
                >
                  {price.toFixed(2)} kr
                </p>
                <p className="text-labelSmall text-tertiary2-darker">
                  {price / volume} kr / L
                </p>
              </div>
            </div>
            <div
              className={`flex w-full items-start justify-between gap-1 ${selectedSize === "case" ? "border-2 border-solid border-primary-normal" : ""} h-[3.5rem] cursor-pointer border-solid`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize("case");
                setOpen(false);
              }}
            >
              <div className="flex flex-row gap-1 px-4 py-5">
                <Image
                  src="/icons/wine-case.svg"
                  width="16"
                  height="16"
                  alt="wine case"
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
                  {casePrice / (volume * 6)} kr / L
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

QuantitySelector.propTypes = {
  quantityAvailable: PropTypes.number.isRequired,
  setSelectedQuantity: PropTypes.func.isRequired,
  selectedQuantity: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  inStock: PropTypes.bool,
  price: PropTypes.number.isRequired,
  casePrice: PropTypes.number.isRequired,
  selectedSize: PropTypes.string.isRequired,
  setSelectedSize: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  preSale: PropTypes.bool.isRequired,
};
