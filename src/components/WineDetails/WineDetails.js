import React from "react";
import PropTypes from "prop-types";

const WineDetails = ({ wine }) => {
  return (
    <article className="flex flex-row items-center justify-center gap-4">
      <img
        src={wine.imageUrl}
        alt={wine.title}
        className="mt-4 w-full max-w-md"
      />
      <div className="w-[32.625rem] bg-tertiary2-active rounded-lg p-6 shadow-lg font-barlow">
        <h1 className="text-displayMedium font-normal">{wine.title}</h1>
        <p className="mt-4 text-titleMedium font-medium">{wine.description}</p>
        <div className=" text-end">
          <p className="text-titleMedium text-tertiary2-hover_dark">
            each bottle:
          </p>
          <p className="text-headlineLarge font-normal">{wine.price} kr</p>
          <p className="text-titleMedium text-tertiary1-normal font-medium">
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
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
