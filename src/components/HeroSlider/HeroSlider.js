"use client";

import React, { useState, useRef } from "react";
import Button from "../Button/Button";
import dynamic from "next/dynamic";

const SwiperClient = dynamic(() => import("../Swiper/SwiperClient"), {});
import { SwiperSlide } from "swiper/react";
import ComingSoonModal from "../Modal/ComingSoonModal";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const HeroSlider = () => {
  const { translations } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasCredits = false;
  const swiperRef = useRef(null);

  const slides = [
    {
      id: "video-slide",
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
      id: "wine-image",
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
      id: "newsletter-image",
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
    <section>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ComingSoonModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
      <SwiperClient
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="h-full w-full"
        onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
        initialSlide={0}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <section
              className={`relative flex flex-col-reverse md:w-full ${index === 0 ? "md:flex-row" : "md:flex-row-reverse"} justify-between bg-tertiary2-light md:min-h-[43.75rem]`}
            >
              <div className="mb-4 min-h-[22rem] w-full items-center md:relative md:mb-0 md:w-[50%]">
                {slide.type === "video" ? (
                  hasCredits ? (
                    <video
                      className="mt-4 min-h-[22rem] w-full rounded-br-[0rem] rounded-tr-[0rem] object-cover md:absolute md:inset-0 md:mt-0 md:min-h-[43.75rem] md:rounded-br-xl md:rounded-tr-[8rem]"
                      autoPlay
                      loop
                      muted
                      role="region"
                      aria-label="Background video for TastingSession Section"
                      aria-hidden="true"
                      data-testid="hero-video"
                      preload="none"
                    >
                      <source src={slide.media} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="relative mt-4 min-h-[22rem] w-full md:min-h-[43.75rem]">
                      <Image
                        src="/images/hero-tasting-resized.jpg"
                        alt="Guests at a wine tasting event sampling different wines in a warm, elegant setting."
                        fill
                        priority={index === 0}
                        loading={index === 0 ? undefined : "lazy"}
                        sizes="(min-width: 768px) 100vw, 100vw"
                        className="object-cover object-center md:rounded-br-[0.5rem] md:rounded-tr-[8rem]"
                      />
                    </div>
                  )
                ) : (
                  <div className="relative mt-4 min-h-[22rem] w-full md:min-h-[43.75rem] md:w-[100%]">
                    <Image
                      src={slide.media}
                      alt="Slide media"
                      fill
                      priority={index === 0}
                      loading={index === 0 ? undefined : "lazy"}
                      sizes="(min-width: 768px) 100vw, 100vw"
                      className="object-cover object-center md:rounded-br-[0.5rem] md:rounded-tr-[8rem]"
                    />
                  </div>
                )}
              </div>
              <div className="flex w-full flex-col justify-between px-6 py-6 md:h-[43.75rem] md:max-w-[50%] md:items-start md:px-6 lg:px-10 xl:px-14">
                <div className="flex flex-col justify-items-start text-center font-barlow font-regular sm:justify-center md:min-h-[43.75rem]">
                  <div>
                    <p className="text-left text-headlineSmall text-primary-normal">
                      {translations[slide.subheading]}
                    </p>
                  </div>
                  <h2 className="my-4 mr-8 text-left text-displaySmall text-tertiary1-dark md:my-2 md:text-left xl:text-displayMedium">
                    {translations[slide.heading]}
                  </h2>
                  <p className="mb-4 mr-10 mt-2 text-start text-bodyMedium sm:mb-7 sm:mt-2 md:mb-5 md:mt-2 md:text-start md:text-bodyMedium xl:mb-10 xl:text-bodyLarge">
                    {translations[slide.paragraph]}
                  </p>
                  <Button
                    text={translations[slide.buttonText]}
                    icon={slide.buttonIcon}
                    width="wide"
                    aria-label={translations[slide.buttonText]}
                    data-testid="book-tasting-button"
                    linkUrl={slide.url}
                    onClick={
                      index === 1 ? () => setIsModalOpen(true) : undefined
                    }
                  />
                </div>
                <div
                  className={`mt-4 hidden md:absolute md:bottom-8 md:flex lg:bottom-10 xl:bottom-14 ${index === 0 ? "md:right-8 lg:right-10 xl:right-12" : "md:left-[37.5%]"}`}
                >
                  <button
                    onClick={handlePrevious}
                    className="mr-2 flex items-center justify-center rounded-full active:bg-primary-hover_normal md:h-[2rem] md:w-[2rem] lg:h-[2.25rem] lg:w-[2.25rem] xl:h-[2.625rem] xl:w-[2.625rem]"
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
      </SwiperClient>
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
