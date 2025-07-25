import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const RatingDisplay = ({ rating, nrOfRatings }) => {
  const { translations } = useLanguage();

  const STAR_ICONS = {
    EMPTY: "/icons/star-empty.svg",
    HALF: "/icons/star-half.svg",
    FULL: "/icons/star-fill.svg",
  };

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starPosition = index + 1;
    let src = STAR_ICONS.EMPTY; // Default to empty

    if (rating >= starPosition) {
      src = STAR_ICONS.FULL; // Full star
    } else if (rating >= starPosition - 0.5) {
      src = STAR_ICONS.HALF; // Half star
    }

    return (
      <Image
        key={index}
        src={src}
        alt="Star"
        width={18}
        height={18}
        className="h-4 w-4 md:h-[1.125rem] md:w-[1.125rem]"
      />
    );
  });

  return (
    <div className="flex flex-row items-center space-x-2">
      <div className="flex space-x-1">{stars}</div>
      <p className="text-titleSmall text-tertiary1-dark md:text-titleMedium">
        {nrOfRatings}{" "}
        {nrOfRatings === 1
          ? translations["wine-details.rating"]
          : translations["wine-details.ratings"]}
      </p>
    </div>
  );
};

RatingDisplay.propTypes = {
  rating: PropTypes.number.isRequired,
  nrOfRatings: PropTypes.number.isRequired,
};
