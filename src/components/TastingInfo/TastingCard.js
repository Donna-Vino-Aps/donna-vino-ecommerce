"use client";
import { useLanguage } from "@/context/LanguageContext";
import PropTypes from "prop-types";
import React from "react";
import Button from "../Button/Button";

export default function TastingCard({
  image,
  title,
  body,
  engagement,
  buttonTitle,
}) {
  const { translations } = useLanguage();

  return (
    <div className="w-[19.5rem] rounded-[2rem] bg-white sm:w-[24.3rem] sm:rounded-[3rem]">
      <img
        src={"/images/" + image}
        alt={translations["tasting-info." + title] + " image"}
        className="h-40 w-full"
      />
      <div className="flex flex-col gap-8 px-4 py-8 sm:min-h-[19.5rem] sm:gap-4 sm:p-4">
        <h3 className="text-center text-headlineSmall text-tertiary1-darker sm:text-headlineLarge">
          {translations["tasting-info." + title]}
        </h3>
        <div className="flex flex-col justify-between gap-4 sm:min-h-44 lg:min-h-[10.5rem]">
          <p
            className="text-center text-labelSmall text-tertiary1-normal sm:text-bodyLarge"
            dangerouslySetInnerHTML={{
              __html: translations["tasting-info-card." + body],
            }}
          />
          <p className="text-center text-labelSmall sm:text-bodyLarge">
            {translations["tasting-info-card." + engagement]}
          </p>
        </div>
        <Button
          text={translations["tasting-info-card." + buttonTitle]}
          linkUrl={"/events"}
          extraStyle="mx-auto min-w-max h-8 text-bodyMedium sm:h-[2.5rem] sm:text-titleMedium px-3 hover:bg-primary-hover_normal"
        />
      </div>
    </div>
  );
}

TastingCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  engagement: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
};
