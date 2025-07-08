"use client";
import React from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const WineInfoRow = ({ detail, isMobile, isLast }) => {
  const { translations } = useLanguage();
  const { key, value, icon } = detail;

  return (
    <div>
      <div
        className={`
					flex items-center gap-4 
					${isMobile ? "py-2 ps-6" : "ps-4"} 
					${!isLast && isMobile ? "border-b border-others-stroke" : ""}
				`}
      >
        <Image
          src={`/icons/more-info/${icon}`}
          width={isMobile ? 16 : 32}
          height={isMobile ? 16 : 32}
          alt={translations[`more-info.${key}`]}
          className={isMobile ? "h-4 w-4" : "h-8 w-8"}
        />

        <h5 className="text-labelLarge text-tertiary2-darker sm:text-labelXLarge">
          {translations[`more-info.${key}`]}:
        </h5>

        <p className="text-bodyMedium text-others-primaryText sm:text-bodyLarge">
          {value}
        </p>
      </div>

      {!isMobile && (
        <div
          className={`my-5 w-full ${isLast ? "" : "border-b-2 border-others-stroke"}`}
        />
      )}
    </div>
  );
};

export default WineInfoRow;

WineInfoRow.propTypes = {
  detail: PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
};
