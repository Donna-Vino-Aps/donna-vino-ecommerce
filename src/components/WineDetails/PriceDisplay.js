import React from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";

export const PriceDisplay = ({
  bottlePrice,
  casePrice,
  selectedSize,
  pricePerLiterBottle,
  pricePerLiterCase,
}) => {
  const { translations } = useLanguage();

  const safePrice = typeof bottlePrice === "number" ? bottlePrice : 0;
  const safeCasePrice = typeof casePrice === "number" ? casePrice : 0;

  let pricePerLiter =
    selectedSize === "bottle" ? pricePerLiterBottle : pricePerLiterCase;

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
        {selectedSize === "bottle"
          ? safePrice.toFixed(2)
          : safeCasePrice.toFixed(2)}{" "}
        DKK
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
  bottlePrice: PropTypes.number.isRequired,
  casePrice: PropTypes.number.isRequired,
  selectedSize: PropTypes.string.isRequired,
  pricePerLiterBottle: PropTypes.number.isRequired,
  pricePerLiterCase: PropTypes.number.isRequired,
};
