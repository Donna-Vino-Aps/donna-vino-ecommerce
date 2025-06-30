"use client";
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

export const ItemQuantitySelector = ({
  quantityAvailable,
  selectedQuantity,
  setSelectedQuantity,
  setTotalQuantityInCart,
  preSale,
  min = 1,
  max = quantityAvailable || 999,
}) => {
  const isDecrementDisabled = selectedQuantity <= min;
  const isIncrementDisabled = selectedQuantity >= max;

  const handleIncrement = () => {
    if (!preSale && selectedQuantity >= max) {
      return;
    }
    setSelectedQuantity(selectedQuantity + 1);
    updateCartItemQuantity(item.id, +1);
    setTotalQuantityInCart((prev) => prev + 1);
  };

  const handleDecrement = () => {
    // Ensure quantity does not go below the minimum
    if (selectedQuantity > min) {
      setSelectedQuantity(selectedQuantity - 1);
      updateCartItemQuantity(item.id, -1);
      setTotalQuantityInCart((prev) => prev - 1);
    }
  };

  return (
    <div className="grid h-9 w-[7.125rem] grid-cols-[28%_44%_28%] rounded-md border border-solid border-tertiary1-light">
      <button
        onClick={handleDecrement}
        disabled={isDecrementDisabled}
        className="flex items-center justify-center border-r border-tertiary1-light disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        <Image src="/icons/minus.svg" width="12" height="12" alt="Decrease" />
      </button>

      <span className="flex items-center justify-center border-x border-tertiary1-light px-4 text-center text-titleMedium font-semibold">
        {selectedQuantity}
      </span>

      <button
        onClick={handleIncrement}
        disabled={isIncrementDisabled}
        className="flex items-center justify-center border-l border-tertiary1-light disabled:opacity-50"
        aria-label="Increase quantity"
      >
        <Image src="/icons/plus.svg" width="12" height="12" alt="Increase" />
      </button>
    </div>
  );
};

ItemQuantitySelector.propTypes = {
  quantityAvailable: PropTypes.number,
  selectedQuantity: PropTypes.number.isRequired,
  setSelectedQuantity: PropTypes.func.isRequired,
  setTotalQuantityInCart: PropTypes.func.isRequired,
  preSale: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
};
