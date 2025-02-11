import React from "react";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";

const TastingSession = () => {
  const { translations } = useLanguage();

  //   Logic for handling future use of the prev/next-buttons
  //   const [currentImageIndex, setCurrentImageIndex] = useState(1);

  //   const handleNext = () => {
  //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   };

  //   const handlePrevious = () => {
  //     setCurrentImageIndex((prevIndex) =>
  //       prevIndex === 0 ? images.length - 1 : prevIndex - 1,
  //     );
  //   };

  return (
    <section className="relative flex flex-row bg-white pb-4 md:pb-0">
      <figure className="hidden md:flex md:w-[50%]">
        <img src="/images/dv-tasting.png" />
      </figure>
      <div className="flex flex-col justify-center align-center items-center md:items-start font-barlow font-regular mx-20 md:mx-8 md:w-[50%]">
        <div>
          <p className="titleMedium md:text-titleMedium xl:text-titleLarge text-primary-dark">
            {translations["tasting.subheading"]}🍷✨
          </p>
        </div>
        <h2 className="text-headlineSmall text-center md:text-left md:text-headlineLarge lg:text-displaySmall xl:text-displayMedium text-tertiary1-dark my-1 md:my-2 mr-8">
          {translations["tasting.heading"]}
        </h2>
        <p className="text-center md:text-start text-bodySmall md:text-bodyMedium xl:text-bodyLarge md:mt-3 mb-3 md:mb-5 xl:mb-10 mr-10">
          {translations["tasting.paragraph"]}
        </p>
        <Button
          text={translations["tasting.button"]}
          icon="/icons/calender-alt-1.svg"
          variant="redFullText"
          ariaLabel="Book tasting session"
          testId="book-tasting-button"
        ></Button>
        <div className="hidden md:flex absolute md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 xl:bottom-14 xl:right-12">
          <button
            // onClick={handlePrevious}
            className="md:w-[2rem] md:h-[2rem] lg:w-[2.25rem] lg:h-[2.25rem] xl:w-[2.625rem] xl:h-[2.625rem] rounded-full flex items-center justify-center active:bg-primary-hover_normal mr-[8px]"
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
            // onClick={handleNext}
            className="md:w-[2rem] md:h-[2rem] lg:w-[2.25rem] lg:h-[2.25rem] xl:w-[2.625rem] xl:h-[2.625rem] rounded-full flex items-center justify-center active:bg-primary-hover_normal ml-[8px]"
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
