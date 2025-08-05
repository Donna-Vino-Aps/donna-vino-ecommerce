"use client";
import React from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/ShoppingCartContext.js";
import useIsMobile from "@/hooks/useIsMobile.js";
import AnimatedButton from "../Button/AnimatedButton.js";

const WineActions = ({ wine, isPreSale }) => {
  const { translations } = useLanguage();
  const { addItemToCart } = useCart();
  const isMobile = useIsMobile();

  const handleAddToCart = () => {
    const bottle = wine.variantMap.bottle;

    const itemToAdd = {
      title: wine.title,
      variantId: bottle.id,
      size: "bottle",
      price: bottle.price.amount,
      currencyCode: bottle.price.currencyCode,
      quantity: 1,
      imageUrl: wine.imageUrl,
    };

    addItemToCart(itemToAdd);
  };

  return (
    <div className="flex w-full items-end justify-between">
      <p
        data-testid="wineCard-viewDetails"
        aria-label="View wine details"
        className={`cursor-pointer  text-bodySmall text-black underline ${isPreSale && "sm:text-bodyMedium"}`}
      >
        {translations["wineCard.viewDetails"]}
      </p>

      <AnimatedButton
        textBefore={translations["wineCard.addToCart"]}
        textAfter={translations["wineCard.addedToCart"]}
        onClick={
          isPreSale
            ? handleAddToCart
            : () => console.warn("Pressed add to cart in TopWines section")
        }
        clickedStyle={"bg-others-confirm"}
        size={isPreSale && !isMobile ? "lg" : "md"}
        width={isPreSale && !isMobile ? "lg" : "md"}
        ariaLabel={"Add wine to cart"}
        testId="addToCart-button"
        icon={"/icons/card/cart-white.svg"}
        extraStyle={`
          px-4 py-2 text-nowrap cursor-pointer text-white text-titleMedium font-medium
          ${isPreSale ? "sm:px-5 sm:py-3" : ""}
        `}
      />
    </div>
  );
};

WineActions.propTypes = {
  wine: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    bottlePrice: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    vintage: PropTypes.number.isRequired,
    nrOfRatings: PropTypes.number.isRequired,
    variantMap: PropTypes.shape({
      bottle: PropTypes.object,
    }).isRequired,
  }).isRequired,
  isPreSale: PropTypes.bool.isRequired,
};

export default WineActions;
