"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button.js";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/ShoppingCartContext.js";
import useIsMobile from "@/hooks/useIsMobile.js";

const WineActions = ({ wine, isPreSale }) => {
  const { translations } = useLanguage();
  const { addItemToCart } = useCart();
  const [isClicked, setIsClicked] = useState(false);
  const isMobile = useIsMobile();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsClicked(true);

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
    setTimeout(() => setIsClicked(false), 3000);
  };

  return (
    <div className="flex w-full items-end justify-between">
      <p
        data-testid="wineCard-viewDetails"
        aria-label="Go to home"
        className={`cursor-pointer  text-bodySmall text-black underline ${isPreSale && "sm:text-bodyMedium"}`}
      >
        {translations["wineCard.viewDetails"]}
      </p>
      <Button
        text={
          translations[
            isClicked ? "wineCard.addedToCart" : "wineCard.addToCart"
          ]
        }
        onClick={
          isPreSale
            ? handleAddToCart
            : () => console.warn("Pressed add to cart in TopWines section")
        }
        color={isClicked ? "" : "primary"}
        size={isPreSale && !isMobile ? "lg" : "md"}
        width={isPreSale && !isMobile ? "lg" : "md"}
        ariaLabel={"Add wine to cart"}
        testId="addToCart-button"
        icon={"/icons/card/cart-white.svg"}
        extraStyle={`px-4 py-2 text-nowrap text-white text-titleMedium font-medium transition-transform duration-150 ease-in-out  ${isClicked ? " bg-others-confirm hover:bg-others-confirm " : ""} active:scale-95 ${isPreSale && " sm:px-5 sm:py-3 "}`}
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
    nrOfRatings: PropTypes.number.isRequired,
    variantMap: PropTypes.shape({
      bottle: PropTypes.object,
    }).isRequired,
  }).isRequired,
  isPreSale: PropTypes.bool.isRequired,
};

export default WineActions;
