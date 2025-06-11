import React from "react";
import PropTypes from "prop-types";

export const ProductDetails = ({
  country,
  region,
  vineyard,
  wineColor,
  grape,
}) => {
  return (
    <section className="w-full">
      <h4 className="mb-6 mt-12 text-titleLarge">Product Details</h4>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <p className="text-titleMedium font-medium">Country/Region</p>
          <p className="text-titleMedium font-medium">
            {country}/{region}
          </p>
        </div>
        <hr className="my-2" />
        <div className="flex flex-row justify-between">
          <p className="text-titleMedium font-medium">Wine type</p>
          <p className="text-titleMedium font-medium">
            {wineColor}, {grape}
          </p>
        </div>
        <hr className="my-2" />
        <div className="flex flex-row  justify-between">
          <p className="text-titleMedium font-medium">Vineyard</p>
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
  wineColor: PropTypes.string.isRequired,
  grape: PropTypes.string.isRequired,
};
