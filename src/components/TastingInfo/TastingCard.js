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
    <div className="w-72 rounded-[2rem] bg-white sm:w-96 sm:rounded-[3rem]">
      <img
        src={"/images/" + image}
        alt={translations["tasting-info." + title] + " image"}
        className="h-32 w-full sm:h-40"
      />
      <div className="flex flex-col gap-y-4 px-4 py-8 lg:p-4">
        <h3 className="text-center text-headlineSmall text-tertiary1-darker sm:text-headlineLarge">
          {translations["tasting-info." + title]}
        </h3>
        <div className="flex h-32 flex-col justify-between sm:h-44 lg:h-[10.5rem]">
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
