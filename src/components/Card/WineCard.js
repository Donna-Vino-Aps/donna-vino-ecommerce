import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const WineCard = ({ title, imageUrl, price, reviewsCount }) => {
  //   const { translations } = useLanguage();

  return (
    <article className="w-[23.125rem] h-[32rem]">
      <figure>
        <img src={imageUrl} />
      </figure>
      <div className="font-barlow">
        <div>
          <h4 className="text-headlineMedium font-regular">{title}</h4>
          <p className="text-labelXLarge font-semibold">${price}</p>
        </div>
        <div className="inline">
          <p className="text-labelXLarge font-semibold">
            {reviewsCount} reviews
          </p>
          <img src="@/icons/star-fill.svg" />
        </div>
      </div>
    </article>
  );
};

export default WineCard;
