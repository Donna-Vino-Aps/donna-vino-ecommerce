"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { RatingDisplay } from "./RatingDisplay";
import { InStockDisplay } from "./AvailabilityDisplay";
import { PriceDisplay } from "./PriceDisplay";
import { QuantitySelector } from "./QuantitySelector";
import { ProductDetails } from "./ProductDetails";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const WineDetails = ({ wine }) => {
  const { translations } = useLanguage();

  const [selectedSize, setSelectedSize] = useState(() => {
    if (wine.variantMap.bottle) return "bottle";
    if (wine.variantMap.case) return "case";
    return "bottle"; // fallback
  });

  const [preSale, setPreSale] = useState(!wine.inStock);
  const [selectedQuantity, setSelectedQuantity] = React.useState(1);

  return (
    <article className="relative flex flex-col items-center justify-center gap-6 md:gap-8 lg:flex-row lg:gap-12">
      <Image
        src={wine.imageUrl}
        alt={wine.title}
        width={620}
        height={640}
        className="mt-4 h-[18.75rem] w-[18rem] object-contain md:h-[26rem] md:w-[25rem] lg:h-[31rem] lg:w-[30rem] xl:h-[40rem] xl:w-[38.75rem]"
        unoptimized
        priority
      />
      <div className="flex min-w-[18.75rem] flex-col rounded-lg bg-tertiary2-active p-5 font-barlow shadow-lg md:min-w-[25rem] lg:w-[32.625rem]">
        <div className="flex flex-row items-center justify-between">
          <h1 className="mb-2 text-headlineSmall font-normal sm:text-headlineMedium md:mb-4 lg:text-displaySmall xl:text-displayMedium">
            {wine.title}
          </h1>
          <InStockDisplay
            inStock={wine.inStock}
            preSale={preSale}
            setPreSale={setPreSale}
          />
        </div>
        <div className="flex flex-col">
          <div className="order-2 mb-8 lg:order-1 lg:mb-0">
            <RatingDisplay
              rating={wine.rating}
              nrOfRatings={wine.nrOfRatings}
              className="order-2 md:order-1"
            />
          </div>
          <p className="order-1 mb-2 text-bodySmall font-normal md:text-titleSmall md:font-medium lg:order-2 lg:mb-3 lg:mt-6 lg:text-titleMedium">
            {wine.description}
          </p>
        </div>
        <PriceDisplay
          bottlePrice={wine.bottlePrice}
          casePrice={wine.casePrice}
          setSelectedSize={setSelectedSize}
          selectedSize={selectedSize}
          pricePerLiterBottle={wine.pricePerLiterBottle}
          pricePerLiterCase={wine.pricePerLiterCase}
        />
        <QuantitySelector
          quantityAvailable={wine.quantityAvailable}
          selectedQuantity={selectedQuantity}
          setSelectedQuantity={setSelectedQuantity}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          bottlePrice={wine.bottlePrice}
          casePrice={wine.casePrice}
          volume={wine.volume}
          pricePerLiterBottle={wine.pricePerLiterBottle}
          pricePerLiterCase={wine.pricePerLiterCase}
          preSale={preSale}
        />
        {preSale === false ? (
          <Button
            text={translations["wine-details.addtocart"]}
            variant="rounde"
            border="primary"
            icon="/icons/cart-white.svg"
            color="primary"
            size="md"
            width="full"
            extraStyle="font-medium mt-8"
            ariaLabel="Add to Cart Button"
            testId="add-to-cart-button"
          />
        ) : (
          <Button
            text={translations["wine-details.addpreorder"]}
            variant="rounded"
            border=""
            icon="/icons/cart-white.svg"
            color="secondary"
            size="md"
            width="full"
            extraStyle="font-medium mt-8"
            ariaLabel="Pre-Order Button"
            testId="pre-order-button"
          />
        )}
        <ProductDetails
          country={wine.country}
          region={wine.region}
          vineyard={wine.vineyard}
          wineVariety={wine.wineVariety}
          grape={wine.grape}
        />
      </div>
    </article>
  );
};

export default WineDetails;

WineDetails.propTypes = {
  wine: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
    quantityAvailable: PropTypes.number.isRequired,
    bottlePrice: PropTypes.number.isRequired,
    casePrice: PropTypes.number.isRequired,
    pricePerLiterBottle: PropTypes.number.isRequired,
    pricePerLiterCase: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    nrOfRatings: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    vineyard: PropTypes.string.isRequired,
    wineVariety: PropTypes.string.isRequired,
    grape: PropTypes.string.isRequired,
    variantMap: PropTypes.shape({
      bottle: PropTypes.object,
      case: PropTypes.object,
    }).isRequired,
  }).isRequired,
};
