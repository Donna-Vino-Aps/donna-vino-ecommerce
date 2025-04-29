import React, { useState, useRef } from "react";
import Button from "../Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ComingSoonModal from "../Modal/ComingSoonModal";
import { useLanguage } from "@/context/LanguageContext";

const HeroSlider = () => {
  const { translations } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasCredits = false;
  const swiperRef = useRef();

  const slides = [
    {
      type: "video",
      subheading: "tasting.subheading1",
      heading: "tasting.heading1",
      paragraph: "tasting.paragraph1",
      buttonText: "tasting.button1",
      buttonIcon: "/icons/calender-alt-1.svg",
      media:
        "https://res.cloudinary.com/db3h63tns/video/upload/v1741092198/e-commerce-hero-section_egcjvf.mp4",
      url: "",
    },
    {
      type: "image",
      subheading: "tasting.subheading2",
      heading: "tasting.heading2",
      paragraph: "tasting.paragraph2",
      buttonText: "tasting.button2",
      buttonIcon: "/icons/wine-glass-white.svg",
      media: "/images/hero-wines.jpg",
      url: "", // blank for now until the webshop is ready
    },
    {
      type: "image",
      subheading: "tasting.subheading3",
      heading: "tasting.heading3",
      paragraph: "tasting.paragraph3",
      buttonText: "tasting.button3",
      buttonIcon: "/icons/envelope-alt.svg",
      media: "/images/hero-newsletter.jpg",
      url: "https://www.donnavino.dk/#subscribe",
    },
  ];
  // Logic for handling use of the prev/next-buttons
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Change this to 0 before launching e-commerce for production

  const handleNext = () => {
    const nextIndex =
      currentImageIndex === slides.length - 1 ? 0 : currentImageIndex + 1;
    swiperRef.current?.slideTo(nextIndex);
    setCurrentImageIndex(nextIndex);
  };

  const handlePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const handleDotClick = (index) => {
    swiperRef.current?.slideTo(index); // updates the slider to the clicked dot
  };

  return (
    <section className="relative">
      {/* Modal "Coming Soon" */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <ComingSoonModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[A11y]}
        className="w-full h-full"
        onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
        initialSlide={0}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <section
              className={`relative flex flex-col-reverse md:w-full ${index === 0 ? "md:flex-row" : "md:flex-row-reverse"} justify-between bg-tertiary2-light min-h-[43.75rem]`}
            >
              <div className="w-full mb-4 min-h-[20rem] md:mb-0 md:relative md:w-[50%] items-center">
                {slide.type === "video" ? (
                  hasCredits ? (
                    <video
                      className="md:absolute md:inset-0 mt-4 iimd:mt-0 rounded-tr-[0rem] rounded-br-[0rem] md:rounded-tr-[8rem] md:rounded-br-xl object-cover w-full max-h-[22.5rem] md:min-h-[43.75rem]"
                      autoPlay
                      loop
                      muted
                      role="region"
                      aria-label="Background video for TastingSession Section"
                      aria-hidden="true"
                      data-testid="hero-video"
                    >
                      <source src={slide.media} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src="/images/caroline-attwood-unsplash.jpg"
                      className="md:absolute md:inset-0 mt-4 iimd:mt-0 rounded-tr-[0rem] rounded-br-[0rem] md:rounded-tr-[8rem] md:rounded-br-[0.5rem] object-cover w-full max-h-[22.5rem] md:min-h-[43.75rem]"
                      data-testid="fallback-image"
                    />
                  )
                ) : (
                  <img
                    src={slide.media}
                    alt="Slide media"
                    className="md:absolute md:inset-0 mt-4 iimd:mt-0 rounded-tr-[0rem] rounded-br-[0rem] md:rounded-tl-[8rem] md:rounded-bl-xl object-cover w-full max-h-[22.5rem] md:min-h-[43.75rem]"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center align-start items-start mb-3 md:items-start font-barlow font-regular px-12 sm:px-20 md:px-6 lg:px-10 xl:px-14 min-h-[20rem] md:max-w-[50%]">
                <div>
                  <p className="text-left text-headlineSmall text-primary-normal">
                    {translations[slide.subheading]}
                  </p>
                </div>
                <h2 className="text-displayMedium text-left md:text-left md:text-headlineLarge lg:text-displaySmall xl:text-displayMedium text-tertiary1-dark my-4 md:my-2 mr-8">
                  {translations[slide.heading]}
                </h2>
                <p className="text-start md:text-start text-bodyMedium md:text-bodyMedium xl:text-bodyLarge mt-2 mb-7 sm:mt-2 sm:mb-7 md:mt-2 mb-4 md:mb-5 xl:mb-10 mr-10">
                  {translations[slide.paragraph]}
                </p>
                <Button
                  text={translations[slide.buttonText]}
                  icon={slide.buttonIcon}
                  variant="redFullText"
                  aria-label={translations[slide.buttonText]}
                  data-testid="book-tasting-button"
                  linkUrl={
                    slide.heading === "tasting.heading1" ||
                    slide.heading === "tasting.heading2"
                      ? undefined
                      : slide.url
                  }
                  onClick={
                    slide.heading === "tasting.heading1" ||
                    slide.heading === "tasting.heading2"
                      ? () => setIsModalOpen(true)
                      : undefined
                  }
                ></Button>
                <div
                  className={`hidden md:flex mt-4 md:absolute md:bottom-8 lg:bottom-10 xl:bottom-14 ${index === 0 ? "md:right-8 lg:right-10 xl:right-12" : "md:left-[37.5%]"}`}
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
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="md:hidden flex py-2 min-h-[2rem] mx-auto relative bottom-8 justify-center">
        {slides.map((_, index) => (
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
    </section>
  );
};

export default HeroSlider;
