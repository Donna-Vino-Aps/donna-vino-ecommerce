import React from "react";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";

const TastingSession = () => {
  const { translations } = useLanguage();

  return (
    <section>
      <figure>
        <img src="" />
      </figure>
      <div className="font-barlow font-regular">
        <div>
          <p className="text-headlineSmall text-primary-dark">
            {translations["tasting.subheading"]}🍷✨
          </p>
          <img src="" />
          <img src="" />
        </div>
        <h2 className="text-displayLarge text-tertiary1-dark">
          {translations["tasting.heading"]}
        </h2>
        <p className="text-bodyLarge">{translations["tasting.paragraph"]}</p>
        <Button
          text={translations["tasting.button"]}
          icon="/icons/calendar-alt-1.svg"
          variant="red"
          ariaLabel="Book tasting session"
          testId="book-tasting-button"
        ></Button>
      </div>
    </section>
  );
};

export default TastingSession;
