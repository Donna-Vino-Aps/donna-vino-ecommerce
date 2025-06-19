"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { RatingDisplay } from "./RatingDisplay";
import { InStockDisplay } from "./InStockDisplay";
import { PriceDisplay } from "./PriceDisplay";
import { QuantitySelector } from "./QuantitySelector";
import { ProductDetails } from "./ProductDetails";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";

let WineDetails = ({ wine }) => {
  const variants = wine.variants || [];

  const variantMap = {
    bottle: variants.find((v) =>
      v.title.toLowerCase().includes("single bottle"),
    ),
    case: variants.find((v) =>
      v.title.toLowerCase().includes("case (6 bottles)"),
    ),
  };

  const { translations } = useLanguage();
  const [preSale, setPreSale] = useState(!wine.inStock);
  const [selectedSize, setSelectedSize] = useState(() => {
    if (variantMap.bottle) return "bottle";
    if (variantMap.case) return "case";
    return "bottle"; // fallback
  });
  const defaultVariant = variantMap.bottle;
  const caseVariant = variantMap.case;

  const selectedVariant =
    selectedSize === "case" ? caseVariant : defaultVariant;
  const [selectedQuantity, setSelectedQuantity] = React.useState(1);

  // const defaultVariant =
  //   wine.variants?.find((variant) => variant.isDefault) || wine.variants?.[0];
  // const caseVariant = wine.variants?.find((variant) =>
  //   variant.title.toLowerCase().includes("case"),
  // );

  const primaryImage = wine.images?.[0];

  const price = defaultVariant?.price?.amount ?? 0;
  const casePrice = caseVariant?.price?.amount ?? 0;
  const quantityAvailable = defaultVariant?.quantityAvailable || 0;

  const normalizedWine = {
    id: wine.id,
    title: wine.title,
    bottlePrice: price,
    casePrice: casePrice,
    imageUrl: primaryImage?.url,
    description: wine.description,
    inStock: quantityAvailable > 0,
    quantityAvailable: quantityAvailable,
    grape: wine.grape,
    vineyard: wine.vineyard,
    country: wine.country,
    region: wine.region,
    wineVariety: wine.wineVariety,
    volume: wine.volume?.value,
    rating: 3.0,
    nrOfRatings: 10,
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const currentPrice = selectedVariant?.price?.amount;
    const currentQuantityAvailable = selectedVariant?.quantityAvailable || 0;
    const currentInStock = currentQuantityAvailable > 0;
  };

  return (
    <article className="relative flex flex-col items-center justify-center gap-6 md:gap-8 lg:flex-row lg:gap-12">
      <img
        src={normalizedWine.imageUrl}
        alt={normalizedWine.title}
        className="mt-4 h-[18.75rem] w-[18rem] md:h-[26rem] md:w-[25rem] lg:h-[31rem] lg:w-[30rem] xl:h-[40rem] xl:w-[38.75rem]"
      />
      <div className="flex min-w-[18.75rem] flex-col rounded-lg bg-tertiary2-active p-5 font-barlow shadow-lg md:min-w-[25rem] lg:w-[32.625rem]">
        <div className="flex flex-row items-center justify-between">
          <h1 className="mb-2 text-headlineSmall font-normal sm:text-headlineMedium md:mb-4 lg:text-displaySmall xl:text-displayMedium">
            {normalizedWine.title}
          </h1>
          <InStockDisplay
            inStock={normalizedWine.inStock}
            preSale={preSale}
            setPreSale={setPreSale}
          />
        </div>
        <div className="flex flex-col">
          <div className="order-2 mb-8 lg:order-1 lg:mb-0">
            <RatingDisplay
              rating={normalizedWine.rating}
              nrOfRatings={normalizedWine.nrOfRatings}
              className="order-2 md:order-1"
            />
          </div>
          <p className="order-1 mb-2 text-bodySmall font-normal md:text-titleSmall md:font-medium lg:order-2 lg:mb-3 lg:mt-6 lg:text-titleMedium">
            {normalizedWine.description}
          </p>
        </div>
        <PriceDisplay
          price={normalizedWine.price}
          casePrice={normalizedWine.casePrice}
          volume={0.7}
          setSelectedSize={setSelectedSize}
          selectedSize={selectedSize}
        />
        <QuantitySelector
          quantityAvailable={quantityAvailable}
          selectedQuantity={selectedQuantity}
          setSelectedQuantity={setSelectedQuantity}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          price={normalizedWine.price}
          casePrice={normalizedWine.casePrice}
          volume={normalizedWine.volume}
          preSale={preSale}
        />
        {preSale === false ? (
          <Button
            text={translations["wine-details.addtocart"]}
            variant="roundedSmall"
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
            variant="roundedSmall"
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
          country={normalizedWine.country}
          region={normalizedWine.region}
          vineyard={normalizedWine.vineyard}
          wineVariety={normalizedWine.wineVariety}
          grape={normalizedWine.grape}
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
    price: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    casePrice: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    nrOfRatings: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    ),
    description: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
    quantityAvailable: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    vineyard: PropTypes.string.isRequired,
    wineVariety: PropTypes.string.isRequired,
    grape: PropTypes.string.isRequired,
  }).isRequired,
};
