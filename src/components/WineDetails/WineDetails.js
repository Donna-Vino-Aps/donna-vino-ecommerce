import React from "react";
import PropTypes from "prop-types";

const WineDetails = ({ wine }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{wine.title}</h1>
      <p className="mt-2 text-lg">${wine.price}</p>
      <img
        src={wine.imageUrl}
        alt={wine.title}
        className="mt-4 w-full max-w-md"
      />
      <p className="mt-4">{wine.description}</p>
    </div>
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
