"use client";
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

export const QuantitySelector = ({
  item = null,
  quantityAvailable = 999,
  selectedQuantity,
  setSelectedQuantity,
  setTotalQuantityInCart = null,
  updateCartItemQuantity = null,
  preSale = false,
  min = 1,
  max,
}) => {
  const resolvedMax = max ?? (preSale ? 999 : quantityAvailable);
  const isDecrementDisabled = selectedQuantity <= min;
  const isIncrementDisabled = selectedQuantity >= resolvedMax;

  const handleIncrement = () => {
    if (selectedQuantity >= resolvedMax) return;

    setSelectedQuantity((prev) => prev + 1);

    if (item && updateCartItemQuantity) {
      updateCartItemQuantity(item.id, +1);
    }

    if (setTotalQuantityInCart) {
      setTotalQuantityInCart((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (selectedQuantity <= min) return;

    setSelectedQuantity((prev) => prev - 1);

    if (item && updateCartItemQuantity) {
      updateCartItemQuantity(item.id, -1);
    }

    if (setTotalQuantityInCart) {
      setTotalQuantityInCart((prev) => prev - 1);
    }
  };

  return (
    <div className="grid h-9 w-[7.125rem] grid-cols-[28%_44%_28%] rounded-md border border-solid border-tertiary1-light">
      <button
        onClick={handleDecrement}
        disabled={isDecrementDisabled}
        className="flex items-center justify-center border-tertiary1-light disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        <Image
          src="/icons/minus.svg"
          width="12"
          height="12"
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
        className="flex items-center justify-center border-tertiary1-light disabled:opacity-50"
        aria-label="Increase quantity"
      >
        <Image
          src="/icons/plus.svg"
          width="12"
          height="12"
          alt="Increase"
          className="h-3 w-3"
        />
      </button>
    </div>
  );
};

QuantitySelector.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }),
  quantityAvailable: PropTypes.number,
  selectedQuantity: PropTypes.number.isRequired,
  setSelectedQuantity: PropTypes.func.isRequired,
  setTotalQuantityInCart: PropTypes.func,
  updateCartItemQuantity: PropTypes.func,
  preSale: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
};
