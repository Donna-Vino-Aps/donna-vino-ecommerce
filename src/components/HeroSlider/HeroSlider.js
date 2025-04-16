import React, { useState } from "react";
import Button from "../Button/Button";
import ComingSoonModal from "../Modal/ComingSoonModal";
import { useLanguage } from "@/context/LanguageContext";

const HeroSlider = () => {
  const { translations } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Storing the different texts and images used in the slider
  const subheadings = [
    "tasting.subheading2",
    "tasting.subheading1", // video slide
    "tasting.subheading3",
  ];

  const headings = ["tasting.heading2", "tasting.heading1", "tasting.heading3"]; // put these in numerical order for production

  const paragraphs = [
    "tasting.paragraph2",
    "tasting.paragraph1", // video slide
    "tasting.paragraph3",
  ];

  const buttons = ["tasting.button2", "tasting.button1", "tasting.button3"]; // put these in numerical order for production

  const buttonIcons = [
    "/icons/envelope-alt.svg",
    "/icons/calender-alt-1.svg", // video slide
    "/icons/wine-glass-white.svg",
  ];

  const images = [
    "/images/hero-wines.jpg",
    "https://res.cloudinary.com/db3h63tns/video/upload/v1741092198/e-commerce-hero-section_egcjvf.mp4", // video slide
    "/images/hero-newsletter.jpg",
  ];

  //const urls = ["/shop", "/events", "/subscribe"];  // flip number 0 and 1 here for production
  const urls = ["", "/events", "/subscribe"];

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

  const handleDotClick = (index) => {
    setCurrentImageIndex(index); // updates the slider to the clicked dot
  };

  return (
    <section
      className={`relative flex flex-col-reverse md:w-full ${currentImageIndex === 1 ? "md:flex-row" : "md:flex-row-reverse"} justify-between bg-white min-h-[48rem]`}
    >
      {/* Modal "Coming Soon" */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <ComingSoonModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
      <div className="md:hidden flex mx-auto my-3 mt-6 relative top-3">
        {Array.from({ length: images.length }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="w-[10px] h-[10px] rounded-full mx-1"
            aria-label={`Image ${index + 1}`}
            data-testid={`carousel-dot-${index}`}
          >
            <img
              src={
                index === currentImageIndex
                  ? "/icons/dot-active.svg"
                  : "/icons/dot-passive.svg"
              }
              alt={`Dot ${index + 1}`}
              className="w-full h-full"
            />
          </button>
        ))}
      </div>
      <div className="relative justify-center self-start w-full md:w-1/2 min-h-[22.75rem] md:h-full">
        {currentImageIndex === 1 ? ( // change this to 0 before production (after all other changes are made)
          <video
            className="absolute inset-0 mt-6 md:mt-0 md:rounded-t-[0rem] md:rounded-tr-[8rem] md:rounded-br-xl object-cover w-full h-full"
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
        ) : (
          <img
            src={images[currentImageIndex]}
            alt="Tasting session slide"
            className={`absolute inset-0 mt-6 md:mt-0 rounded-tl-[0rem] !rounded-tl-[0rem] ${currentImageIndex === 1 ? "md:rounded-tr-[8rem] md:rounded-br-xl" : "md:rounded-tl-[8rem] !md:rounded-tl-[8rem] md:rounded-bl-xl"} object-cover w-full h-full`}
            data-testid="hero-image"
          />
        )}
      </div>
      <div className="flex flex-col justify-center align-start items-start md:items-start font-barlow font-regular px-12 sm:px-20 md:px-6 lg:px-10 xl:px-14 min-h-[20rem] md:max-w-[50%]">
        <div>
          <p className="text-left sm:text-titleSmall md:text-titleMedium xl:text-titleLarge text-primary-normal">
            {translations[subheadings[currentImageIndex]]}
          </p>
        </div>
        <h2 className="text-displayMedium text-left md:text-left md:text-headlineLarge lg:text-displaySmall xl:text-displayMedium text-tertiary1-dark my-2 md:my-2 mr-8">
          {translations[headings[currentImageIndex]]}
        </h2>
        <p className="text-start md:text-start text-bodyMedium md:text-bodyMedium xl:text-bodyLarge mt-2 mb-7 sm:mt-2 sm:mb-7 md:mt-2 mb-4 md:mb-5 xl:mb-10 mr-10">
          {translations[paragraphs[currentImageIndex]]}
        </p>
        <Button
          text={translations[buttons[currentImageIndex]]}
          icon={buttonIcons[currentImageIndex]}
          variant="redFullText"
          aria-label={translations[buttons[currentImageIndex]]}
          data-testid="book-tasting-button"
          linkUrl={urls[currentImageIndex]}
          onClick={currentImageIndex === 0 ? () => setIsModalOpen(true) : ""}
        ></Button>
        <div
          className={`hidden md:flex mt-4 md:absolute md:bottom-8 lg:bottom-10 xl:bottom-14 ${currentImageIndex === 1 ? "md:right-8 lg:right-10 xl:right-12" : "md:left-[37.5%]"}`}
        >
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

export default HeroSlider;
