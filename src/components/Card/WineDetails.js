"use client";
import React from "react";
import PropTypes from "prop-types";

const WineDetails = ({ title, bottlePrice, isPreSale }) => {
  return (
    <div className="flex w-full flex-grow flex-col">
      <div className="flex items-center justify-between self-stretch">
        <h3
          data-testid="wine-title"
          className={`
						flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-start text-headlineSmall
						text-tertiary1-dark ${isPreSale && "sm:text-headlineLarge"}
					`}
        >
          {title}
        </h3>
      </div>
      <p
        data-testid="wine-price"
        className={`
					mt-1 flex-1 text-start text-titleMedium font-medium text-tertiary1-dark 
					${isPreSale && "sm:text-titleLarge sm:font-semibold"}
				`}
      >
        Kr. {bottlePrice.toFixed(2).replace(".", ",")}
      </p>
    </div>
  );
};

WineDetails.propTypes = {
  title: PropTypes.string.isRequired,
  bottlePrice: PropTypes.number.isRequired,
  isPreSale: PropTypes.bool.isRequired,
};

export default WineDetails;
