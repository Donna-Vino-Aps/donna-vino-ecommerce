import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";

export const InStockDisplay = ({ inStock, preSale, setPreSale }) => {
  const { translations } = useLanguage();
  return preSale === false ? (
    <div className="flex flex-row gap-2">
      <Image
        width={20}
        height={20}
        alt={
          inStock
            ? translations["wine-details.instock"]
            : translations["wine-details.outofstock"]
        }
        src={
          inStock
            ? "/icons/checkmark-circle-green.svg"
            : "/icons/cross-circle.svg"
        }
        className="h-5 w-5"
      />
      <p
        className={`text-nowrap text-titleMedium ${inStock ? "text-calendar-open" : "text-primary-normal"}`}
      >
        {inStock
          ? translations["wine-details.instock"]
          : translations["wine-details.outofstock"]}
      </p>
      {inStock === false && (
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
  ) : (
    <div className="flex flex-row gap-2">
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
};

InStockDisplay.propTypes = {
  inStock: PropTypes.bool.isRequired,
  preSale: PropTypes.bool.isRequired,
  setPreSale: PropTypes.func.isRequired,
};
