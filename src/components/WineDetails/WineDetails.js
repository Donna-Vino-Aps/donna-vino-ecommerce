"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { RatingDisplay } from "./RatingDisplay";
import { InStockDisplay } from "./InStockDisplay";
import { PriceDisplay } from "./PriceDisplay";
import { QuantitySelector } from "./QuantitySelector";
import { ProductDetails } from "./ProductDetails";
import Button from "../Button/Button";

const WineDetails = ({ wine }) => {
  const [quantity, setQuantity] = useState(wine.quantity);
  const [preSale, setPreSale] =
    wine.inStock === false ? useState(true) : useState(false);
  const [selectedSize, setSelectedSize] = React.useState("bottle");

  return (
    <article className="flex flex-col items-center justify-center gap-4 md:flex-row">
      <img
        src={wine.imageUrl}
        alt={wine.title}
        className="mt-4 w-full max-w-md"
      />
      <div className="flex w-[32.625rem] flex-col rounded-lg bg-tertiary2-active p-6 font-barlow shadow-lg">
        <div className="flex flex-row items-center justify-between">
          <h1 className="mb-4 text-displayMedium font-normal">{wine.title}</h1>
          <InStockDisplay
            inStock={wine.inStock}
            preSale={preSale}
            setPreSale={setPreSale}
          />
        </div>
        <RatingDisplay rating={wine.rating} />
        <p className="mb-3 mt-6 text-titleMedium font-medium">
          {wine.description}
        </p>
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
