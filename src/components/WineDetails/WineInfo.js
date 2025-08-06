"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { AvailabilityDisplay } from "./AvailabilityDisplay";
import { PriceDisplay } from "./PriceDisplay";
import { QuantitySelector } from "../QuantitySelector/QuantitySelector";
import { SizeSelector } from "./SizeSelector";
import { ProductDetails } from "./ProductDetails";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/ShoppingCartContext";
import Image from "next/image";
import { logError } from "@/utils/logging";
import AnimatedButton from "../Button/AnimatedButton";
import WineAddedPopup from "@/components/Cart/WineAddedPopup";

const WineInfo = ({ wine }) => {
  const { translations } = useLanguage();
  const { addItemToCart } = useCart();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(() => {
    if (wine.variantMap.bottle) return "bottle";
    if (wine.variantMap.case) return "case";
    return "bottle"; // fallback
  });

  const [preSale, setPreSale] = useState(!wine.inStock);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleAddToCart = () => {
    const selectedVariant = wine.variantMap[selectedSize];

    if (!selectedVariant) {
      logError(
        `Variant "${selectedSize}" not found for product "${wine.title}".`,
      );
      return;
    }

    const itemToAdd = {
      title: wine.title,
      variantId: selectedVariant.id,
      size: selectedSize,
      price: selectedVariant.price.amount,
      currencyCode: selectedVariant.price.currencyCode,
      quantity: selectedQuantity,
      imageUrl: wine.imageUrl,
    };
    addItemToCart(itemToAdd);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 md:gap-8 lg:flex-row lg:gap-12">
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
        </div>
        <div className="flex flex-col">
          <div className="order-2 mb-8 lg:order-1 lg:mb-0">
            <AvailabilityDisplay
              inStock={wine.inStock}
              preSale={preSale}
              setPreSale={setPreSale}
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
        <p className="mb-2 ml-[2px] text-titleMedium font-medium text-tertiary1-dark">
          {translations["wine-details.quantity"]}
        </p>
        <QuantitySelector
          selectedQuantity={selectedQuantity}
          setSelectedQuantity={setSelectedQuantity}
          quantityAvailable={wine.quantityAvailable}
          preSale={true}
        />
        {preSale && (
          <SizeSelector
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            bottlePrice={wine.bottlePrice}
            casePrice={wine.casePrice}
            pricePerLiterBottle={wine.pricePerLiterBottle}
            pricePerLiterCase={wine.pricePerLiterCase}
            preSale={preSale}
          />
        )}
        {preSale === false ? (
          <AnimatedButton
            onClick={handleAddToCart}
            textBefore={translations["wineCard.addToCart"]}
            textAfter={translations["wineCard.addedToCart"]}
            styleAfter={"bg-others-confirm"}
            variant="rounded"
            icon="/icons/cart-white.svg"
            color="primary"
            size="md"
            width="full"
            extraStyle="font-medium mt-8"
            ariaLabel="Add to Cart Button"
            testId="add-to-cart-button"
          />
        ) : (
          <AnimatedButton
            onClick={handleAddToCart}
            textBefore={translations["wine-details.addPreOrder"]}
            textAfter={translations["wine-details.addedPreOrder"]}
            color={"primary"}
            clickedStyle={" bg-others-confirm "}
            variant="rounded"
            icon="/icons/cart-white.svg"
            size="md"
            width="full"
            extraStyle="font-medium mt-8 text-white"
            ariaLabel="Add to Cart Button"
            testId="add-to-cart-button"
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
      <WineAddedPopup
        isOpen={showPopup}
        wine={{
          imageUrl: wine.imageUrl,
          title: wine.title,
          vintage: wine.vintage,
          size: String(selectedSize),
          quantity: selectedQuantity,
          totalPrice:
            wine.variantMap[selectedSize].price.amount * selectedQuantity,
        }}
      />
    </div>
  );
};

export default WineInfo;

WineInfo.propTypes = {
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
    vintage: PropTypes.string,
    grape: PropTypes.string.isRequired,
    variantMap: PropTypes.shape({
      bottle: PropTypes.object,
      case: PropTypes.object,
    }).isRequired,
  }).isRequired,
};
