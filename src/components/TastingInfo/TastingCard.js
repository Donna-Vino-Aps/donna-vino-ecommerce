"use client";
import { useLanguage } from "@/context/LanguageContext";
import PropTypes from "prop-types";
import React from "react";
import Button from "../Button/Button";
import useIsMobile from "@/hooks/useIsMobile";

export default function TastingCard({
  image,
  title,
  titleMobile,
  body,
  bodyMobile,
  engagement,
  engagementMobile,
  buttonTitle,
}) {
  const { translations } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="w-[19.5rem] rounded-[2rem] bg-white sm:w-[24.3rem] sm:rounded-[3rem]">
      <img
        src={"/images/" + image}
        alt={translations["tasting-info." + title] + " image"}
        className="h-40 w-full"
      />
      <div className="flex flex-col gap-8 px-4 py-8 sm:min-h-[19.5rem] sm:gap-4 sm:p-4">
        <h3 className="text-center text-headlineSmall text-tertiary1-darker sm:text-headlineLarge">
          {titleMobile && isMobile
            ? translations["tasting-info-card." + titleMobile]
            : translations["tasting-info." + title]}
        </h3>
        <div className="flex flex-col justify-between gap-4 sm:min-h-44 lg:min-h-[10.5rem]">
          {bodyMobile && isMobile ? (
            bodyMobile.map((p, index) => (
              <p
                key={index}
                className="text-center text-labelSmall text-tertiary1-normal sm:text-bodyLarge"
                dangerouslySetInnerHTML={{
                  __html: translations["tasting-info-card." + p],
                }}
              />
            ))
          ) : (
            <p
              className="text-center text-labelSmall text-tertiary1-normal sm:text-bodyLarge"
              dangerouslySetInnerHTML={{
                __html: translations["tasting-info-card." + body],
              }}
            />
          )}
          <p
            className={`text-center ${titleMobile && isMobile ? "mt-4" : ""} text-labelSmall sm:text-bodyLarge`}
          >
            {
              translations[
                "tasting-info-card." +
                  (isMobile && engagementMobile ? engagementMobile : engagement)
              ]
            }
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
  titleMobile: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  bodyMobile: PropTypes.arrayOf(PropTypes.string),
  engagement: PropTypes.string.isRequired,
  engagementMobile: PropTypes.string,
  buttonTitle: PropTypes.string.isRequired,
};
