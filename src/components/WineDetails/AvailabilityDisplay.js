import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const AvailabilityDisplay = ({ inStock, preSale }) => {
  const { translations } = useLanguage();

  let config;

  if (preSale) {
    config = {
      iconSrc: "/icons/checkmark-circle-green.svg",
      iconAlt: "Pre Order indicator",
      textColor: "text-calendar-open",
      statusText: translations["wine-details.presale"],
    };
  } else if (inStock) {
    config = {
      iconSrc: "/icons/checkmark-circle-green.svg",
      iconAlt: translations["wine-details.instock"],
      textColor: "text-calendar-open",
      statusText: translations["wine-details.instock"],
    };
  } else {
    config = {
      iconSrc: "/icons/cross-circle.svg",
      iconAlt: translations["wine-details.outofstock"],
      textColor: "text-primary-normal",
      statusText: translations["wine-details.outofstock"],
    };
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <Image
        width={20}
        height={20}
        alt={config.iconAlt}
        src={config.iconSrc}
        className="h-5 w-5"
      />
      <p className={`text-nowrap text-titleMedium ${config.textColor}`}>
        {config.statusText}
      </p>
    </div>
  );
};

AvailabilityDisplay.propTypes = {
  inStock: PropTypes.bool.isRequired,
  preSale: PropTypes.bool.isRequired,
};
