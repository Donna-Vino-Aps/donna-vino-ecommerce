import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

export const InStockDisplay = ({ inStock }) => {
  return (
    <div className="flex flex-row gap-2">
      <Image
        width="20"
        height="20"
        alt={inStock ? "In Stock" : "Out of Stock"}
        src={
          inStock
            ? "/icons/checkmark-circle-green.svg"
            : "/icons/cross-circle-red.svg"
        }
      />
      <p>{inStock ? "In Stock" : "Out of Stock"}</p>
    </div>
  );
};

InStockDisplay.propTypes = {
  inStock: PropTypes.bool.isRequired,
};
