import React from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";

export const ProductDetails = ({
  country,
  region,
  vineyard,
  wineVariety,
  grape,
}) => {
  const { translations } = useLanguage();
  return (
    <section className="w-full">
      <h4 className="mb-6 mt-12 text-titleLarge">
        {translations["wine-details.productdetails"]}
      </h4>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <p className="text-titleMedium font-medium">
            {translations["wine-details.country-region"]}
          </p>
          <p className="text-titleMedium font-medium">
            {country}/{region}
          </p>
        </div>
        <hr className="my-2" />
        <div className="flex flex-row justify-between">
          <p className="text-titleMedium font-medium">
            {translations["wine-details.winetype"]}
          </p>
          <p className="text-titleMedium font-medium">
            {wineVariety}, {grape}
          </p>
        </div>
        <hr className="my-2" />
        <div className="flex flex-row  justify-between">
          <p className="text-titleMedium font-medium">
            {translations["wine-details.vineyard"]}
          </p>
          <p className="text-titleMedium font-medium">{vineyard}</p>
        </div>
      </div>
    </section>
  );
};

ProductDetails.propTypes = {
  country: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  vineyard: PropTypes.string.isRequired,
  wineVariety: PropTypes.string.isRequired,
  grape: PropTypes.string.isRequired,
};
