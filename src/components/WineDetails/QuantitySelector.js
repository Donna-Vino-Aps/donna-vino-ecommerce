"use client";
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

export const QuantitySelector = ({
  quantityInStock,
  selectedQuantity,
  setSelectedQuantity,
  price,
  casePrice,
  selectedSize,
  setSelectedSize,
  volume,
  preSale,
  min = 1,
  max = quantityInStock || 99,
}) => {
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
        Quantity
      </p>
      <div className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-solid border-tertiary1-light md:h-9 md:w-[7.125rem]">
        <button
          onClick={handleDecrement}
          disabled={preSale ? false : selectedQuantity <= 1}
          className="flex cursor-pointer items-center justify-center disabled:opacity-50"
        >
          <Image src="/icons/minus.svg" width="12" height="12" alt="Decrease" />
        </button>
        <span className="min-w-[55%] border-l border-r border-solid border-tertiary1-light px-4 py-1 text-center text-titleMedium font-semibold md:min-w-[3rem]">
          {selectedQuantity}
        </span>
        <button
          onClick={handleIncrement}
          disabled={selectedQuantity >= max}
          className="flex cursor-pointer items-center justify-center disabled:opacity-50"
        >
          <Image src="/icons/plus.svg" width="12" height="12" alt="Increase" />
        </button>
      </div>
      <p className="mb-2 ml-[2px] mt-5 text-titleMedium font-medium text-tertiary1-dark">
        Select Size
      </p>
      <div
        className="flex w-full flex-col items-center rounded-b-md text-titleMedium font-medium text-primary-light shadow-md lg:max-w-[29.563rem]"
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
                ? "Single bottle"
                : "Wine case (6 bottles)"}
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
                <p className="text-labelMedium font-medium">Single bottle</p>
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
                  Wine case (6 bottles)
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
  quantityInStock: PropTypes.number.isRequired,
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
