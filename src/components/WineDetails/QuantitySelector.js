"use client";
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const QuantitySelector = ({
  quantityAvailable,
  selectedQuantity,
  setSelectedQuantity,
  preSale,
  min = 1,
  max = quantityAvailable || 999,
}) => {
  const { translations } = useLanguage();
  const isDecrementDisabled = selectedQuantity <= min;
  const isIncrementDisabled = !preSale && selectedQuantity >= max;

  const handleIncrement = () => {
    if (!preSale && selectedQuantity >= max) {
      return;
    }
    setSelectedQuantity(selectedQuantity + 1);
  };

  const handleDecrement = () => {
    // Ensure quantity does not go below the minimum
    if (selectedQuantity > min) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  return (
    <section>
      <p className="mb-2 ml-[2px] text-titleMedium font-medium text-tertiary1-dark">
        {translations["wine-details.quantity"]}
      </p>
      <div className="grid h-10 w-full grid-cols-[20%_60%_20%] rounded-xl border border-solid border-tertiary1-light md:h-9 md:w-[7.125rem] md:grid-cols-[28%_44%_28%] md:rounded-md">
        <button
          onClick={handleDecrement}
          disabled={isDecrementDisabled}
          className="flex items-center justify-center disabled:opacity-50"
        >
          <Image
            src="/icons/minus.svg"
            width={12}
            height={12}
            alt="Decrease"
            className="h-3 w-3"
          />
        </button>

        <span className="flex items-center justify-center border-x border-tertiary1-light px-4 text-center text-titleMedium font-semibold">
          {selectedQuantity}
        </span>

        <button
          onClick={handleIncrement}
          disabled={isIncrementDisabled}
          className="flex items-center justify-center disabled:opacity-50"
        >
          <Image
            src="/icons/plus.svg"
            width={12}
            height={12}
            alt="Increase"
            className="h-3 w-3"
          />
        </button>
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
  bottlePrice: PropTypes.number.isRequired,
  casePrice: PropTypes.number.isRequired,
  selectedSize: PropTypes.string.isRequired,
  setSelectedSize: PropTypes.func.isRequired,
  pricePerLiterBottle: PropTypes.number.isRequired,
  pricePerLiterCase: PropTypes.number.isRequired,
  preSale: PropTypes.bool.isRequired,
};
