import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

export const RatingDisplay = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starPosition = index + 1;
    let src = "/icons/star-empty.svg"; // Default to empty

    if (rating >= starPosition) {
      src = "/icons/star-fill.svg"; // Full star
    } else if (rating >= starPosition - 0.5) {
      src = "/icons/star-half.svg"; // Half star
    }

    return (
      <Image
        key={index}
        src={src}
        alt="Star"
        width={18}
        height={18}
        className="h-[1.125rem] w-[1.125rem]"
      />
    );
  });

  return (
    <div className="flex flex-row items-center space-x-2">
      <div className="flex space-x-1">{stars}</div>
      <p className="text-titleMedium text-tertiary1-dark">
        {rating.toFixed(2)} Rating
      </p>
    </div>
  );
};

RatingDisplay.propTypes = {
  rating: PropTypes.number.isRequired,
};
