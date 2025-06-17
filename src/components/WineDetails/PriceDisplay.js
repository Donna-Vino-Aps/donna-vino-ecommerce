import React from "react";
import PropTypes from "prop-types";

export const PriceDisplay = ({ price, casePrice, volume, selectedSize }) => {
  let pricePerLiter =
    selectedSize === "bottle" ? price / volume : casePrice / (volume * 6);
  pricePerLiter = pricePerLiter.toFixed(2); // Format to 2 decimal places

  return (
    <div className="text-end">
      <p className="text-titleSmall text-tertiary2-hover_dark md:text-titleMedium">
        each {selectedSize === "bottle" ? "bottle" : "case"}:
      </p>
      <p className="text-headlineMedium font-normal md:text-headlineLarge">
        {selectedSize === "bottle" ? price.toFixed(2) : casePrice.toFixed(2)} kr
      </p>
      <p className="text-titleSmall font-medium text-tertiary1-normal md:text-titleMedium">
        (12% VAT excluded)
      </p>
      <p className="text-titleSmall text-tertiary2-hover_dark md:text-titleMedium">
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
