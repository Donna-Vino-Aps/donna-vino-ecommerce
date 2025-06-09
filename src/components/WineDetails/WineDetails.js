import React from "react";
import PropTypes from "prop-types";
import { RatingDisplay } from "./RatingDisplay";
import { InStockDisplay } from "./InStockDisplay";

const WineDetails = ({ wine }) => {
  return (
    <article className="flex flex-row items-center justify-center gap-4">
      <img
        src={wine.imageUrl}
        alt={wine.title}
        className="mt-4 w-full max-w-md"
      />
      <div className="w-[32.625rem] rounded-lg bg-tertiary2-active p-6 font-barlow shadow-lg">
        <div className="flex flex-row items-center justify-between">
          <h1 className="mb-4 text-displayMedium font-normal">{wine.title}</h1>
          <InStockDisplay inStock={wine.inStock} />
        </div>
        <RatingDisplay rating={wine.rating} />
        <p className="mt-6 text-titleMedium font-medium">{wine.description}</p>
        <div className=" text-end">
          <p className="text-titleMedium text-tertiary2-hover_dark">
            each bottle:
          </p>
          <p className="text-headlineLarge font-normal">{wine.price} kr</p>
          <p className="text-titleMedium font-medium text-tertiary1-normal">
            (12% VAT excluded)
          </p>
          <p className="text-titleMedium text-tertiary2-hover_dark">
            (24,50 kr / L)
          </p>
        </div>
      </div>
    </article>
  );
};

export default WineDetails;

WineDetails.propTypes = {
  wine: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
  }).isRequired,
};
