import React from "react";
import PropTypes from "prop-types";
// import { useLanguage } from "@/context/LanguageContext";

const WineCard = ({ title, imageUrl, price, reviewsCount }) => {
  //   const { translations } = useLanguage();

  return (
    <article className="w-[23.125rem] h-[32rem] bg-white mt-12 ml-4 mr-4 rounded-lg shadow-lg opacity-95 hover:opacity-100 hover:shadow-xl transition-shadow duration-300">
      <figure className="mt-4 mb-6 overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={title}
          className="h-[24rem] w-full object-cover"
        />
      </figure>
      <div className="flex justify-between items-center font-barlow">
        <div className="flex flex-col">
          <h4 className="text-headlineMedium font-regular pl-2 pb-1">
            {title}
          </h4>
          <p className="text-labelXLarge font-semibold pb-3 pl-2">${price}</p>
        </div>
        <div className="flex flex-row gap-2 relative bottom-6 mr-2">
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
