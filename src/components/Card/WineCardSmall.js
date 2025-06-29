"use client";
import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button.js";
import { useLanguage } from "@/context/LanguageContext";

const WineCardSmall = ({
  title,
  price,
  imageUrl,
  isNew,
  buttons,
  rating,
  reviews,
}) => {
  const { translations } = useLanguage();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.warn("Add to cart button clicked");
  };

  return (
    <section
      data-testid="wine-card"
      className="group  flex  w-[386px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-tertiary2-light p-5 shadow-lg transition-transform duration-300 hover:scale-105"
    >
      <div className="relative h-6 w-full">
        {isNew && (
          <span className="absolute right-0 top-0  rounded-full bg-primary-light px-3 py-1  text-labelMedium font-medium  text-tertiary1-dark">
            New
          </span>
        )}
      </div>

      <div className="relative mt-5 flex h-[360px] w-[343px] flex-col items-center justify-center">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-contain"
          data-testid="wine-image"
        />

        <div
          data-testid="wine-buttons"
          className="absolute bottom-[50px] left-1/2 flex -translate-x-1/2 gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          {buttons.map((button, index) => (
            <div key={index} className="relative">
              <div className="group/button relative flex h-10 w-10 items-center justify-center rounded-full">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition duration-300 hover:bg-primary-normal"
                  onClick={button.onClick}
                >
                  <img
                    src={button.icon}
                    className="h-6 w-6 text-tertiary1-darker transition-all duration-300 group-hover/button:brightness-0 group-hover/button:invert"
                    alt={button.tooltip}
                  />
                </button>
                <div
                  className="invisible absolute -top-8 left-1/2 w-max -translate-x-1/2 whitespace-nowrap rounded-md bg-tertiary2-light px-3 py-1 text-tertiary1-darker shadow-md transition-opacity delay-200 duration-300 group-hover/button:visible group-hover/button:opacity-100"
                  data-testid={`tooltip-${index}`}
                >
                  {button.tooltip}
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-tertiary2-light"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-grow flex-col ">
        <div className="flex items-center justify-between self-stretch">
          <h3
            data-testid="wine-title"
            className="max-w-[200px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-headlineLarge text-tertiary1-dark"
          >
            {title}
          </h3>
          <div className="flex flex-shrink-0 items-center  justify-between gap-2 ">
            <div className=" flex items-center gap-1">
              <p className="text-headlineSmall text-tertiary2-darker">
                {rating.toFixed(1)}
              </p>
              <img src="/icons/star-fill.svg" alt="Star" className="h-6 w-6" />
              <p className="text-labelXLarge  font-medium text-tertiary2-darker">
                ({reviews})
              </p>
            </div>
            <img
              className="h-8 w-8"
              src="/icons/card/heart-gray.svg"
              alt="heart"
            />
          </div>
        </div>
        <p
          data-testid="wine-price"
          className="mt-1 flex-1 text-titleLarge font-semibold text-tertiary1-dark"
        >
          Kr. {price.toFixed(2)}
        </p>
        <div className="flex flex-row items-end justify-between">
          <p
            data-testid="wineCard-viewDetails"
            aria-label="Go to home"
            className="cursor-pointer text-bodyMedium text-black underline"
          >
            {translations["wineCard.viewDetails"]}
          </p>
          <Button
            text={translations["wineCard.addToCart"]}
            onClick={handleAddToCart}
            size="lg"
            width="lg"
            ariaLabel="Add wine to cart"
            testId="addToCart-button"
            icon={"/icons/card/cart-white.svg"}
            extraStyle="px-5 py-3 text-nowrap text-white text-titleMedium font-medium"
          />
        </div>
      </div>
    </section>
  );
};

WineCardSmall.defaultProps = {
  title: "Barolo Terlo",
  price: 15.0,
  imageUrl: "/images/exampleImageWine.png",
  isNew: true,
  rating: 5.0,
  reviews: 24,
  buttons: [
    {
      icon: "/icons/card/cart.svg",
      tooltip: "Add To Cart",
      onClick: () => console.warn("Add to cart clicked"),
    },
    {
      icon: "/icons/card/eye-alt.svg",
      tooltip: "Quick View",
      onClick: () => console.warn("Quick view clicked"),
    },
    {
      icon: "/icons/card/heart.svg",
      tooltip: "Add to Favorites",
      onClick: () => console.warn("Favorite clicked"),
    },
  ],
};

WineCardSmall.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      tooltip: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    }),
  ),
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
};

export default WineCardSmall;
