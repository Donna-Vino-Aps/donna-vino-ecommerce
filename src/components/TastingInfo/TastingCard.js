import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
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
    <div className="flex w-72 flex-col gap-5 rounded-[2rem] bg-white pb-5 sm:w-96 sm:rounded-[3rem]">
      <Image
        src={"/images/" + image}
        alt={translations["tasting-info." + title] + " image"}
        width={384}
        height={160}
      />
      <h3 className="text-center text-headlineSmall sm:text-headlineLarge">
        {translations["tasting-info." + title]}
      </h3>
      <div className="flex h-32 flex-col justify-between px-3 sm:h-44">
        <p
          className="text-center text-labelSmall sm:text-bodyLarge"
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
        extraStyle="mx-auto min-w-max h-[2rem] text-bodyMedium sm:h-[2.5rem] sm:text-titleMedium px-3"
      />
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
