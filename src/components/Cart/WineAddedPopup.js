"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import PropTypes from "prop-types";

export default function WineAddedPopup({ wine, isOpen }) {
  const { translations } = useLanguage();

  if (!isOpen) return null;

  return (
    <section className="fixed top-0 z-50 flex h-[16rem] w-full flex-col items-center justify-between rounded-lg bg-tertiary2-light p-6 shadow-lg transition-opacity duration-300 lg:right-0 lg:top-0 lg:w-[24rem]">
      <div>
        <p className="font-barlow text-headlineSmall text-tertiary1-darker">
          {translations["wineCard.addedToYourCart"]}
        </p>
      </div>
      <div className="flex h-32 w-full items-center gap-2 self-stretch rounded-md border border-primary-normal bg-tertiary2-light px-4 shadow-card">
        <div>
          <Image
            src={wine.imageUrl}
            alt={wine.title}
            width={100}
            height={110}
          />
        </div>
        <div className="flex h-32 w-full flex-col justify-between p-4 text-titleSmall text-tertiary1-darker">
          <div>
            <div>{wine.title}</div>
            <div className="text-labelSmall">{wine.vintage}</div>
          </div>
          <div className="flex justify-between">
            <div>
              {wine.quantity} {translations[`wine-details.${wine.size}`]}
            </div>
            <div>{wine.totalPrice} kr</div>
          </div>
        </div>
      </div>
    </section>
  );
}

WineAddedPopup.propTypes = {
  wine: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    vintage: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
};
