"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { RatingDisplay } from "./RatingDisplay";
import { InStockDisplay } from "./InStockDisplay";
import { PriceDisplay } from "./PriceDisplay";
import { QuantitySelector } from "./QuantitySelector";
import { ProductDetails } from "./ProductDetails";
import Button from "../Button/Button";
// import Image from "next/image";

const WineDetails = ({ wine }) => {
  const [quantity, setQuantity] = useState(wine.quantity);
  const [preSale, setPreSale] =
    wine.inStock === false ? useState(true) : useState(false);
  const [selectedSize, setSelectedSize] = React.useState("bottle");

  return (
    <article className="relative flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8 lg:gap-12">
      <img
        src={wine.imageUrl}
        alt={wine.title}
        className="mt-4 h-[18.75rem] w-[18rem] w-full md:h-[31rem] md:w-[30rem] lg:h-[40rem] lg:w-[38.75rem] "
      />
      <div className="flex min-w-[18.75rem] flex-col rounded-lg bg-tertiary2-active p-6 font-barlow shadow-lg md:min-w-[25rem] lg:w-[32.625rem]">
        <div className="flex flex-row items-center justify-between">
          <h1 className="mb-2 text-headlineMedium font-normal md:mb-4 md:text-displaySmall lg:text-displayMedium">
            {wine.title}
          </h1>
          <InStockDisplay
            inStock={wine.inStock}
            preSale={preSale}
            setPreSale={setPreSale}
          />
        </div>
        <div className="flex flex-col">
          <div className="order-2 mb-8 md:order-1 md:mb-0">
            <RatingDisplay
              rating={wine.rating}
              nrOfRatings={wine.nrOfRatings}
              className="order-2 md:order-1"
            />
          </div>
          <p className="order-1 mb-2 text-bodySmall font-normal md:order-2 md:mb-3 md:mt-6 md:text-titleMedium md:font-medium">
            {wine.description}
          </p>
        </div>
        <PriceDisplay
          price={wine.price}
          casePrice={wine.casePrice}
          volume={0.7}
          setSelectedSize={setSelectedSize}
          selectedSize={selectedSize}
        />
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          price={wine.price}
          casePrice={wine.casePrice}
          volume={wine.volume}
          preSale={preSale}
        />
        {preSale === false ? (
          <Button
            text="Add to Cart"
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
            text="Add Pre-Order to Cart"
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
          country={wine.country}
          region={wine.region}
          vineyard={wine.vineyard}
          wineColor={wine.wineColor}
          grape={wine.grape}
        />
      </div>
    </article>
  );
};

export default WineDetails;

WineDetails.propTypes = {
  wine: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    casePrice: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    nrOfRatings: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
    quantity: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    vineyard: PropTypes.string.isRequired,
    wineColor: PropTypes.string.isRequired,
    grape: PropTypes.string.isRequired,
  }).isRequired,
};
