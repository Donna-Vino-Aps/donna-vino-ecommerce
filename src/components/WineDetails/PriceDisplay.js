import React from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";

export const PriceDisplay = ({ price, casePrice, volume, selectedSize }) => {
  const { translations } = useLanguage();
  let pricePerLiter =
    selectedSize === "bottle" ? price / volume : casePrice / (volume * 6);
  pricePerLiter = pricePerLiter.toFixed(2); // Format to 2 decimal places

  return (
    <div className="text-end">
      <p className="text-titleSmall text-tertiary2-hover_dark md:text-titleMedium">
        {translations["wine-details.each"]}{" "}
        {selectedSize === "bottle"
          ? translations["wine-details.bottle"]
          : translations["wine-details.case"]}
        :
      </p>
      <p className="text-headlineMedium font-normal md:text-headlineLarge">
        {selectedSize === "bottle" ? price.toFixed(2) : casePrice.toFixed(2)} kr
      </p>
      <p className="text-titleSmall font-medium text-tertiary1-normal md:text-titleMedium">
        ({translations["wine-details.vat"]})
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
