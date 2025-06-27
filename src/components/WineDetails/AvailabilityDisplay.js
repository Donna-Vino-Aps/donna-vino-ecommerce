import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";

export const InStockDisplay = ({ inStock, preSale, setPreSale }) => {
  const { translations } = useLanguage();

  // If the wine is in pre-sale, the pre-sale indicator is shown
  if (preSale) {
    return (
      <div className="flex flex-row items-center gap-2">
        <Image
          width={20}
          height={20}
          alt="Pre Order"
          src="/icons/checkmark-circle-green.svg"
          className="h-5 w-5"
        />
        <p className="text-nowrap text-titleMedium text-calendar-open">
          {translations["wine-details.presale"]}
        </p>
      </div>
    );
  }

  const iconSrc = inStock
    ? "/icons/checkmark-circle-green.svg"
    : "/icons/cross-circle.svg";

  const iconAlt = inStock
    ? translations["wine-details.instock"]
    : translations["wine-details.outofstock"];

  const textColor = inStock ? "text-calendar-open" : "text-primary-normal";
  const statusText = inStock
    ? translations["wine-details.instock"]
    : translations["wine-details.outofstock"];

  // if the wine is not in pre-sale, show the in-stock or out-of-stock status
  // If a non pre-sale wine goes out of stock, the user can switch to pre-order via a button
  return (
    <div className="flex flex-row gap-2">
      {inStock ? (
        <>
          <Image
            width={20}
            height={20}
            alt={iconAlt}
            src={iconSrc}
            className="h-5 w-5"
          />
          <p className={`text-nowrap text-titleMedium ${textColor}`}>
            {statusText}
          </p>
        </>
      ) : (
        <Button
          text={translations["wine-details.switch-preorder"]}
          variant="rounded"
          border="primary"
          icon="/icons/cart-white.svg"
          color="primary"
          size="sm"
          width="auto"
          onClick={() => setPreSale(true)}
        />
      )}
    </div>
  );
};

InStockDisplay.propTypes = {
  inStock: PropTypes.bool.isRequired,
  preSale: PropTypes.bool.isRequired,
  setPreSale: PropTypes.func.isRequired,
};
