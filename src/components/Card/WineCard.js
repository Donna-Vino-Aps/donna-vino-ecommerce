"use client";
import React from "react";
import PropTypes from "prop-types";
import WineActions from "./WineActions.js";
import WineDetails from "./WineDetails.js";

const WineCard = ({ wine, isNew, context, setShowPopup, setPopupWine }) => {
  const isPreSale = context === "pre-sale";

  return (
    <section
      data-testid="wine-card"
      role="button"
      tabIndex={0}
      className={`
        group box-border flex h-full w-full cursor-pointer flex-col items-center 
        justify-center gap-2 rounded-lg bg-tertiary2-light p-4  shadow-lg 
        transition-transform duration-300 hover:scale-105 ${isPreSale && "sm:max-w-[384px] sm:p-5"}
      `}
    >
      <div className="relative h-5 w-full">
        {isNew && (
          <span className="absolute right-0 top-0  rounded-full bg-primary-light px-3 py-1  text-labelMedium font-medium  text-tertiary1-dark">
            New
          </span>
        )}
      </div>

      <div
        className={`relative flex h-[283px] flex-col items-center justify-center ${isPreSale && "sm:h-[360px] sm:w-[343px]"}`}
      >
        <img
          src={wine.imageUrl}
          alt={`Image of wine: ${wine.title}`}
          className="h-full w-full object-contain"
          data-testid="wine-image"
        />
      </div>

      <WineDetails
        title={wine.title}
        bottlePrice={wine.bottlePrice}
        isPreSale={isPreSale}
      />
      <WineActions
        wine={wine}
        context={context}
        isPreSale={isPreSale}
        setShowPopup={setShowPopup}
        setPopupWine={setPopupWine}
      />
    </section>
  );
};

WineCard.propTypes = {
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
  isNew: PropTypes.bool,
  context: PropTypes.oneOf(["pre-sale", "top-wines"]),
  setShowPopup: PropTypes.func.isRequired,
  setPopupWine: PropTypes.func.isRequired,
};

export default WineCard;
