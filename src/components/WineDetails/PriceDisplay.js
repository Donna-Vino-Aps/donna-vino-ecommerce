import React from "react";
import PropTypes from "prop-types";

export const PriceDisplay = ({ price, volume }) => {
  let pricePerLiter = price / volume;
  pricePerLiter = pricePerLiter.toFixed(2); // Format to 2 decimal places

  return (
    <div className="text-end">
      <p className="text-titleMedium text-tertiary2-hover_dark">each bottle:</p>
      <p className="text-headlineLarge font-normal">{price} kr</p>
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
  volume: PropTypes.number.isRequired, // Assuming volume is in liters
};
