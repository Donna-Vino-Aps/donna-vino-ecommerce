import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Button from "../Button/Button";

export const InStockDisplay = ({ inStock, preSale, setPreSale }) => {
  return preSale === false ? (
    <div className="flex flex-row gap-2">
      <Image
        width="20"
        height="20"
        alt={inStock ? "In Stock" : "Out of Stock"}
        src={
          inStock
            ? "/icons/checkmark-circle-green.svg"
            : "/icons/cross-circle.svg"
        }
      />
      <p
        className={`text-nowrap text-titleMedium ${inStock ? "text-[#34C759]" : "text-primary-normal"}`}
      >
        {inStock ? "In Stock" : "Out of Stock"}
      </p>
      {inStock === false && (
        <Button
          text="Switch to Pre-Order"
          variant="roundedSmall"
          border="primary"
          icon="/icons/cart-white.svg"
          color="primary"
          size="sm"
          width="auto"
          onClick={() => setPreSale(true)}
        />
      )}
    </div>
  ) : (
    <div className="flex flex-row gap-2">
      <Image
        width="20"
        height="20"
        alt="Pre Order"
        src="/icons/checkmark-circle-green.svg"
      />
      <p className="text-nowrap text-titleMedium text-[#34C759]">Pre-Order</p>
    </div>
  );
};

InStockDisplay.propTypes = {
  inStock: PropTypes.bool.isRequired,
  preSale: PropTypes.bool.isRequired,
  setPreSale: PropTypes.func.isRequired,
};
