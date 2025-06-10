"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { RatingDisplay } from "./RatingDisplay";
import { InStockDisplay } from "./InStockDisplay";
import { PriceDisplay } from "./PriceDisplay";
import { QuantitySelector } from "./QuantitySelector";
import Button from "../Button/Button";

const WineDetails = ({ wine }) => {
  const [quantity, setQuantity] = useState(wine.quantity);
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
          <InStockDisplay inStock={wine.inStock} />
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
        />
        <Button
          text="Add to Cart"
          variant="roundedSmall"
          border="primary"
          icon="/icons/cart-white.svg"
          color="primary"
          size="md"
          width="full"
          extraStyle="font-medium mt-4"
          ariaLabel="Add to Cart Button"
          testId="add-to-cart-button"
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
  }).isRequired,
};
