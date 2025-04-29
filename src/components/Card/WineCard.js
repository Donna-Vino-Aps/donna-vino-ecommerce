import React from "react";
import PropTypes from "prop-types";
// import { useLanguage } from "@/context/LanguageContext";

const WineCard = ({ title, imageUrl, price, reviewsCount }) => {
  //   const { translations } = useLanguage();

  return (
    <article className="ml-4 mr-4 mt-12 h-[32rem] w-[23.125rem] rounded-lg bg-white opacity-95 shadow-lg transition-shadow duration-300 hover:opacity-100 hover:shadow-xl">
      <figure className="mb-6 mt-4 overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={title}
          className="h-[24rem] w-full object-cover"
        />
      </figure>
      <div className="flex items-center justify-between font-barlow">
        <div className="flex flex-col">
          <h4 className="pb-1 pl-2 text-headlineMedium font-regular">
            {title}
          </h4>
          <p className="pb-3 pl-2 text-labelXLarge font-semibold">${price}</p>
        </div>
        <div className="relative bottom-6 mr-2 flex flex-row gap-2">
          <p className="text-labelXLarge font-semibold text-tertiary2-darker">
            {reviewsCount} reviews
          </p>
          <img src="/icons/star-fill.svg" />
        </div>
      </div>
    </article>
  );
};

export default WineCard;

WineCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  reviewsCount: PropTypes.number.isRequired,
};
