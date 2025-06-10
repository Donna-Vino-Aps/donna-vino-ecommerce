import React from "react";
import PropTypes from "prop-types";

export const PriceDisplay = ({ price, casePrice, volume, selectedSize }) => {
  let pricePerLiter =
    selectedSize === "bottle" ? price / volume : casePrice / (volume * 6);
  pricePerLiter = pricePerLiter.toFixed(2); // Format to 2 decimal places

  return (
    <div className="text-end">
      <p className="text-titleMedium text-tertiary2-hover_dark">
        each {selectedSize === "bottle" ? "bottle" : "case"}:
      </p>
      <p className="text-headlineLarge font-normal">
        {selectedSize === "bottle" ? price.toFixed(2) : casePrice.toFixed(2)} kr
      </p>
      <p className="text-titleMedium font-medium text-tertiary1-normal">
        (12% VAT excluded)
      </p>
      <p className="text-titleMedium text-tertiary2-hover_dark">
        ({pricePerLiter} kr / L)
      </p>
    </div>
  );
};

PriceDisplay.propTypes = {
  price: PropTypes.number.isRequired,
  casePrice: PropTypes.number.isRequired,
  selectedSize: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
};
