"use client";
import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button.js";
import { useLanguage } from "@/context/LanguageContext";
import useIsMobile from "@/hooks/useIsMobile.js";

const WineCard = ({ title, price, imageUrl, isNew, variant }) => {
  const { translations } = useLanguage();
  const responsiveStyles = variant === "pre-sale" ? stylesPreSale : {};
  const isMobile = useIsMobile();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.warn("Add to cart button clicked");
  };

  return (
    <section
      data-testid="wine-card"
      className={`group mx-3 flex min-w-[320px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-tertiary2-light p-4 shadow-lg transition-transform duration-300 hover:scale-105 ${responsiveStyles.section}`}
    >
      <div className="relative h-5 w-full">
        {isNew && (
          <span className="absolute right-0 top-0  rounded-full bg-primary-light px-3 py-1  text-labelMedium font-medium  text-tertiary1-dark">
            New
          </span>
        )}
      </div>

      <div
        className={`relative flex h-[283px] w-[288px] flex-col items-center justify-center ${responsiveStyles.image}`}
      >
        <img
          src={imageUrl}
          alt={`Image of wine: ${title}`}
          className="h-full w-full object-contain"
          data-testid="wine-image"
        />
        {/* overlay with buttons */}
        {/*
        <div
          data-testid="wine-buttons"
          className={`absolute bottom-[100px] left-1/2 flex -translate-x-1/2 gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${responsiveStyles.buttons}`}
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
                    role="tooltip"
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
*/}
      </div>
      <div className="flex w-full flex-grow flex-col ">
        <div className="flex items-center justify-between self-stretch">
          <h3
            data-testid="wine-title"
            className={`flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-start text-headlineSmall text-tertiary1-dark ${responsiveStyles.title}`}
          >
            {title}
          </h3>
          {/* rating and favorite */}
          {/*
          <div className="flex flex-shrink-0 items-center  justify-between gap-2 ">
            <div className="flex h-5 items-center gap-1">
              <p
                className={`text-labelXLarge  leading-none text-tertiary2-darker ${responsiveStyles.rating}`}
              >
                {rating.toFixed(1)}
              </p>
              <img src="/icons/star-fill.svg" alt="Star" className="h-5 w-5" />
              <p
                className={`text-labelLarge font-medium leading-none text-tertiary2-darker ${responsiveStyles.reviews}`}
              >
                ({reviews})
              </p>
            </div>
            <img
              className="h-8 w-8"
              src="/icons/card/heart-gray.svg"
              alt="heart"
            />
          </div>
*/}
        </div>
        <p
          data-testid="wine-price"
          className={`mt-1 flex-1 text-start text-titleMedium font-medium text-tertiary1-dark ${responsiveStyles.price}`}
        >
          Kr. {price.toFixed(2).replace(".", ",")}
        </p>
      </div>
      <div className="flex w-full items-end justify-between">
        <p
          data-testid="wineCard-viewDetails"
          aria-label="Go to home"
          className={`cursor-pointer text-bodySmall text-black underline ${responsiveStyles.details}`}
        >
          {translations["wineCard.viewDetails"]}
        </p>
        <Button
          text={translations["wineCard.addToCart"]}
          onClick={handleAddToCart}
          size={variant === "pre-sale" && !isMobile ? "lg" : "md"}
          width={variant === "pre-sale" && !isMobile ? "lg" : "md"}
          ariaLabel="Add wine to cart"
          testId="addToCart-button"
          icon={"/icons/card/cart-white.svg"}
          extraStyle={`px-4 py-2 text-nowrap text-white text-titleMedium font-medium ${responsiveStyles.button}`}
        />
      </div>
    </section>
  );
};

WineCard.defaultProps = {
  title: "Barolo Terlo",
  price: 15.0,
  imageUrl: "/images/exampleImageWine.png",
  isNew: true,
  rating: 5.0,
  reviews: 24,
  variant: "top-wines",
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

WineCard.propTypes = {
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
  variant: PropTypes.oneOf(["pre-sale", "top-wines"]),
};

const stylesPreSale = {
  section: "sm:w-[384px] sm:p-5",
  image: "sm:h-[360px] sm:w-[343px]",
  title: "sm:text-headlineLarge",
  rating: "sm:text-headlineSmall",
  reviews: "sm:text-labelXLarge",
  price: "sm:font-semibold sm:text-titleLarge",
  details: "sm:text-bodyMedium",
  button: "sm:px-5 sm:py-3",
  buttons: "sm:bottom-[120px]",
};

export default WineCard;
