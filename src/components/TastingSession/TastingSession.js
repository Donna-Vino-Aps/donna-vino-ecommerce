import React, { useState } from "react";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";

const TastingSession = () => {
  const { translations } = useLanguage();

  // Storing the different texts and images used in the slider
  const subheadings = [
    "tasting.subheading1",
    "tasting.subheading2",
    "tasting.subheading3",
  ];

  const headings = ["tasting.heading1", "tasting.heading2", "tasting.heading3"];

  const paragraphs = [
    "tasting.paragraph1",
    "tasting.paragraph2",
    "tasting.paragraph3",
  ];

  const buttons = ["tasting.button1", "tasting.button2", "tasting.button3"];

  const buttonIcons = [
    "/icons/calender-alt-1.svg",
    "/icons/calender-alt-1.svg",
    "/icons/calender-alt-1.svg",
  ];

  const images = [
    "https://res.cloudinary.com/db3h63tns/video/upload/v1741092198/e-commerce-hero-section_egcjvf.mp4",
    "/images/hero-wines.jpg",
    "/images/hero-newsletter.jpg",
  ];

  // Logic for handling use of the prev/next-buttons
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <section className="relative flex flex-col-reverse md:w-full md:flex-row justify-between bg-white min-h-[36rem]">
      <div className="md:hidden flex mx-auto my-3">
        <button
          onClick={handlePrevious}
          className="md:w-[2rem] md:h-[2rem] lg:w-[2.25rem] lg:h-[2.25rem] xl:w-[2.625rem] xl:h-[2.625rem] rounded-full flex items-center justify-center active:bg-primary-hover_normal mr-[8px]"
          aria-label="Previous image"
          data-testid="carousel-previous-button"
        >
          <img
            src="/icons/Prev.svg"
            alt="Previous arrow"
            data-testid="icon-previous-arrow"
            role="presentation"
          ></img>
        </button>
        <button
          onClick={handleNext}
          className="md:w-[2rem] md:h-[2rem] lg:w-[2.25rem] lg:h-[2.25rem] xl:w-[2.625rem] xl:h-[2.625rem] rounded-full flex items-center justify-center active:bg-primary-hover_normal ml-[8px]"
          aria-label="Next image"
          data-testid="carousel-next-button"
        >
          <img
            src="/icons/Next.svg"
            alt="Next arrow"
            data-testid="icon-next-arrow"
            role="presentation"
          ></img>
        </button>
      </div>
      <div className="relative justify-center self-start w-full md:w-1/2 min-h-[22.75rem] md:h-full">
        <video
          className="absolute inset-0 rounded-t-[6rem] md:rounded-t-[0rem] md:rounded-tr-[8rem] md:rounded-br-xl object-cover w-full h-full"
          autoPlay
          loop
          muted
          role="region"
          aria-label="Background video for TastingSession Section"
          aria-hidden="true"
          data-testid="hero-video"
        >
          <source src={[images[currentImageIndex]]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex flex-col justify-center align-center items-center md:items-start font-barlow font-regular px-10 sm:px-20 md:px-6 lg:px-10 xl:px-14 min-h-[20rem] md:max-w-[50%]">
        <div>
          <p className=" sm:text-titleSmall md:text-titleMedium xl:text-titleLarge text-primary-dark">
            {translations[subheadings[currentImageIndex]]}
          </p>
        </div>
        <h2 className="text-headlineSmall text-center md:text-left md:text-headlineLarge lg:text-displaySmall xl:text-displayMedium text-tertiary1-dark my-1 md:my-2 mr-8">
          {translations[headings[currentImageIndex]]}
        </h2>
        <p className="text-center md:text-start text-bodySmall md:text-bodyMedium xl:text-bodyLarge md:mt-3 mb-4 md:mb-5 xl:mb-10 mr-10">
          {translations[paragraphs[currentImageIndex]]}
        </p>
        <Button
          text={translations[buttons[currentImageIndex]]}
          icon={buttonIcons[currentImageIndex]}
          variant="redFullText"
          ariaLabel="Book tasting session"
          testId="book-tasting-button"
        ></Button>
        <div className="hidden md:flex mt-4 md:absolute md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 xl:bottom-14 xl:right-12">
          <button
            onClick={handlePrevious}
            className="md:w-[2rem] md:h-[2rem] lg:w-[2.25rem] lg:h-[2.25rem] xl:w-[2.625rem] xl:h-[2.625rem] rounded-full flex items-center justify-center active:bg-primary-hover_normal mr-[8px]"
            aria-label="Previous image"
            data-testid="carousel-previous-button-large"
          >
            <img
              src="/icons/Prev.svg"
              alt="Previous arrow"
              data-testid="icon-previous-arrow-large"
              role="presentation"
            ></img>
          </button>
          <button
            onClick={handleNext}
            className="md:w-[2rem] md:h-[2rem] lg:w-[2.25rem] lg:h-[2.25rem] xl:w-[2.625rem] xl:h-[2.625rem] rounded-full flex items-center justify-center active:bg-primary-hover_normal ml-[8px]"
            aria-label="Next image"
            data-testid="carousel-next-button-large"
          >
            <img
              src="/icons/Next.svg"
              alt="Next arrow"
              data-testid="icon-next-arrow-large"
              role="presentation"
            ></img>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TastingSession;
