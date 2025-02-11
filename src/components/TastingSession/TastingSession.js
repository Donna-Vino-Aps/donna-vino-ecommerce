import React, { useState } from "react";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";

const TastingSession = () => {
  const { translations } = useLanguage();

  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <section className="relative flex flex-row bg-white">
      <figure className="hidden md:flex md:w-[50%]">
        <img src="/images/dv-tasting.png" />
      </figure>
      <div className="flex flex-col justify-center align-center items-center md:items-start font-barlow font-regular mx-8 md:w-[50%]">
        <div>
          <p className="titleMedium md:text-titleMedium xl:text-titleLarge text-primary-dark">
            {translations["tasting.subheading"]}🍷✨
          </p>
        </div>
        <h2 className="text-headlineLarge text-center md:text-left md:text-displaySmall xl:text-displayMedium text-tertiary1-dark my-2 mr-8">
          {translations["tasting.heading"]}
        </h2>
        <p className="text-bodySmall md:text-bodyMedium xl:text-bodyLarge md:mt-3 mb-3 md:mb-5 xl:mb-10 mr-10">
          {translations["tasting.paragraph"]}
        </p>
        <Button
          text={translations["tasting.button"]}
          icon="/icons/calender-alt-1.svg"
          variant="redFullText"
          ariaLabel="Book tasting session"
          testId="book-tasting-button"
        ></Button>
        <div className="hidden md:flex absolute bottom-14 right-12">
          <button
            onClick={handlePrevious}
            className="w-[2.625rem] h-[2.625rem] rounded-full flex items-center justify-center active:bg-primary-hover_normal mr-[8px]"
            aria-label="Previous image"
            data-testid="carousel-previous-button"
          >
            <img
              src="/icons/Prev.svg"
              alt="Previous arrow"
              data-testid="icon-previous-arrow"
              loading="lazy"
              role="presentation"
            ></img>
          </button>
          <button
            onClick={handleNext}
            className="w-[2.625rem] h-[2.625rem]  rounded-full flex items-center justify-center active:bg-primary-hover_normal ml-[8px]"
            aria-label="Next image"
            data-testid="carousel-next-button"
          >
            <img
              src="/icons/Next.svg"
              alt="Next arrow"
              data-testid="icon-next-arrow"
              loading="lazy"
              role="presentation"
            ></img>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TastingSession;
