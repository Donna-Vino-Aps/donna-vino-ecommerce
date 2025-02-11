import React from "react";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";

const TastingSession = () => {
  const { translations } = useLanguage();

  return (
    <section className="flex flex-row bg-white">
      <figure className="md:w-[50%]">
        <img src="/images/dv-tasting.png" />
      </figure>
      <div className="flex flex-col justify-center align-center font-barlow font-regular mx-8 md:w-[50%]">
        <div>
          <p className="md:text-titleMedium xl:text-titleLarge text-primary-dark">
            {translations["tasting.subheading"]}🍷✨
          </p>
        </div>
        <h2 className="md:text-displaySmall xl:text-displayMedium text-tertiary1-dark my-2 mr-8">
          {translations["tasting.heading"]}
        </h2>
        <p className="md:text-bodyMedium xl:text-bodyLarge mt-3 md:mb-5 xl:mb-10 mr-10">
          {translations["tasting.paragraph"]}
        </p>
        <Button
          text={translations["tasting.button"]}
          icon="@/icons/calender-alt-1.svg"
          variant="redFullText"
          ariaLabel="Book tasting session"
          testId="book-tasting-button"
        ></Button>
      </div>
    </section>
  );
};

export default TastingSession;
