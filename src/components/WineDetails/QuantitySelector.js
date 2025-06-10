"use client";
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

export const QuantitySelector = ({
  quantity,
  setQuantity,
  min = 1,
  max = 99,
}) => {
  const handleIncrement = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
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
          disabled={quantity <= 1}
          className="flex cursor-pointer items-center justify-center disabled:opacity-50"
        >
          <Image src="/icons/minus.svg" width="12" height="12" alt="Decrease" />
        </button>
        <span className="min-w-[55%] border-l border-r border-solid border-tertiary1-light px-4 py-1 text-center text-titleMedium font-semibold md:min-w-[3rem]">
          {quantity}
        </span>
        <button
          onClick={handleIncrement}
          disabled={quantity >= 99}
          className="flex cursor-pointer items-center justify-center disabled:opacity-50"
        >
          <Image src="/icons/plus.svg" width="12" height="12" alt="Increase" />
        </button>
      </div>
      <p className="mb-2 ml-[2px] mt-5 text-titleMedium font-medium text-tertiary1-dark">
        Select Size
      </p>
      <div
        className="flex w-full flex-col items-center rounded-b-md text-titleMedium font-medium text-primary-light shadow-md md:w-[29.563rem]"
        onClick={() => setOpen((prev) => !prev)}
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
            className={`flex w-[18.5rem] flex-col bg-transparent text-tertiary2-darker md:w-[29.563rem]`}
          >
            <div
              className={`flex w-full items-start gap-1 ${selectedSize === "bottle" ? "border-b-2 border-e-2 border-s-2 border-solid border-primary-normal" : ""} cursor-pointer px-3 py-4`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize("bottle");
                setOpen(false);
              }}
            >
              <Image
                src="/icons/wine-bottle.svg"
                width="16"
                height="16"
                alt="wine bottle"
              />
              <p className="text-labelMedium font-medium">Single bottle</p>
            </div>
            <div
              className={`flex w-full items-start gap-1 ${selectedSize === "case" ? "border-2 border-solid border-primary-normal" : ""} cursor-pointer border-solid px-3 py-4`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize("case");
                setOpen(false);
              }}
            >
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
          </div>
        )}
      </div>
    </section>
  );
};

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  inStock: PropTypes.bool,
};
