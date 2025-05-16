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
      url: "/events",
    },
    {
      type: "image",
      subheading: "tasting.subheading2",
      heading: "tasting.heading2",
      paragraph: "tasting.paragraph2",
      buttonText: "tasting.button2",
      buttonIcon: "/icons/wine-glass-white.svg",
      media: "/images/hero-wines-resized.png",
      url: "", // blank for now until the webshop is ready
    },
    {
      type: "image",
      subheading: "tasting.subheading3",
      heading: "tasting.heading3",
      paragraph: "tasting.paragraph3",
      buttonText: "tasting.button3",
      buttonIcon: "/icons/envelope-alt.svg",
      media: "/images/hero-newsletter-resized.jpg",
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ComingSoonModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[A11y]}
        className="h-full w-full"
        onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
        initialSlide={0}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <section
              className={`relative flex flex-col-reverse md:w-full ${index === 0 ? "md:flex-row" : "md:flex-row-reverse"} min-h-[43.75rem] justify-between bg-tertiary2-light`}
            >
              <div className="mb-4 min-h-[20rem] w-full items-center md:relative md:mb-0 md:w-[50%]">
                {slide.type === "video" ? (
                  hasCredits ? (
                    <video
                      className="iimd:mt-0 mt-4 max-h-[22.5rem] w-full rounded-br-[0rem] rounded-tr-[0rem] object-cover md:absolute md:inset-0 md:min-h-[43.75rem] md:rounded-br-xl md:rounded-tr-[8rem]"
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
                      src="/images/hero-tasting-resized.jpg"
                      className="mt-4 max-h-[22.5rem] w-full rounded-br-[0rem] rounded-tr-[0rem] object-cover md:absolute md:inset-0 md:mt-0 md:min-h-[43.75rem] md:rounded-br-[0.5rem] md:rounded-tr-[8rem]"
                      data-testid="fallback-image"
                    />
                  )
                ) : (
                  <img
                    src={slide.media}
                    alt="Slide media"
                    className="mt-4 max-h-[22.5rem] w-full rounded-br-[0rem] rounded-tr-[0rem] object-cover md:absolute md:inset-0 md:mt-0 md:min-h-[43.75rem] md:rounded-bl-xl md:rounded-tl-[8rem]"
                  />
                )}
              </div>
              <div className="mb-3 flex min-h-[20rem] flex-col items-start justify-center px-12 font-barlow font-regular sm:px-20 md:max-w-[50%] md:items-start md:px-6 lg:px-10 xl:px-14">
                <div>
                  <p className="text-left text-headlineSmall text-primary-normal">
                    {translations[slide.subheading]}
                  </p>
                </div>
                <h2 className="my-4 mr-8 text-left text-displayMedium text-tertiary1-dark md:my-2 md:text-left md:text-headlineLarge lg:text-displaySmall xl:text-displayMedium">
                  {translations[slide.heading]}
                </h2>
                <p className="mb-4 mr-10 mt-2 text-start text-bodyMedium sm:mb-7 sm:mt-2 md:mb-5 md:mt-2 md:text-start md:text-bodyMedium xl:mb-10 xl:text-bodyLarge">
                  {translations[slide.paragraph]}
                </p>
                <Button
                  text={translations[slide.buttonText]}
                  icon={slide.buttonIcon}
                  size={{ md: "large" }}
                  aria-label={translations[slide.buttonText]}
                  data-testid="book-tasting-button"
                  linkUrl={slide.url}
                  onClick={index === 1 ? () => setIsModalOpen(true) : undefined}
                ></Button>
                <div
                  className={`mt-4 hidden md:absolute md:bottom-8 md:flex lg:bottom-10 xl:bottom-14 ${index === 0 ? "md:right-8 lg:right-10 xl:right-12" : "md:left-[37.5%]"}`}
                >
                  <button
                    onClick={handlePrevious}
                    className="mr-[8px] flex items-center justify-center rounded-full active:bg-primary-hover_normal md:h-[2rem] md:w-[2rem] lg:h-[2.25rem] lg:w-[2.25rem] xl:h-[2.625rem] xl:w-[2.625rem]"
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
                    className="ml-[8px] flex items-center justify-center rounded-full active:bg-primary-hover_normal md:h-[2rem] md:w-[2rem] lg:h-[2.25rem] lg:w-[2.25rem] xl:h-[2.625rem] xl:w-[2.625rem]"
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
      <div className="relative bottom-8 mx-auto flex min-h-[2rem] justify-center py-2 md:hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="mx-1 h-[10px] w-[10px] rounded-full"
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
              className="h-full w-full"
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
