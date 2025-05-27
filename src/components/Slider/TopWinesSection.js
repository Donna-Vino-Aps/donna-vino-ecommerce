import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/slider/buttons.css";

import WineCardSmall from "@/components/Card/WineCardSmall";

const wineData = [
  {
    title: "Muga Reserva",
    price: 130.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: true,
  },
  {
    title: "Barolo Terlo",
    price: 121.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: true,
  },
  {
    title: "Pinot Noir",
    price: 180.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: false,
  },
  {
    title: "Vega Cicilia",
    price: 210.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: false,
  },
  {
    title: "Saviognese Merlot",
    price: 210.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: true,
  },
  {
    title: "Pinot Grigio",
    price: 210.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: false,
  },
  {
    title: "Marques de Murrieta",
    price: 210.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: false,
  },
];

const TopWinesSection = () => {
  return (
    <section className="relative w-full bg-primary-light py-6 pb-24 text-center">
      <div className="mb-[-60px]">
        <h3 className="text-titleMedium font-semibold">
          Most Popular Products
        </h3>
        <h2 className="py-6 text-displayLarge font-regular text-tertiary1-dark">
          Our Top Wines
        </h2>
        <p className="mb-6 text-bodyLarge font-regular text-tertiary1-dark">
          Our Exclusive Selection of Finest Wines, Handpicked for You Discover
          our wine selection
        </p>
      </div>

      <div className="relative mx-auto h-auto w-full max-w-7xl overflow-visible px-4 md:h-[660px]">
        <Swiper
          slidesPerView={1}
          spaceBetween={5}
          navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
          loop={true}
          loopAdditionalSlides={2}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 5 },
            768: { slidesPerView: 2, spaceBetween: 8 },
            1024: { slidesPerView: 3, spaceBetween: 10 },
            1440: { slidesPerView: 4, spaceBetween: 12 },
          }}
          className="relative z-10 w-full"
        >
          {wineData.map((wine, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center overflow-visible px-3"
            >
              <div className="group flex items-center justify-center overflow-visible px-5 py-5 transition-all duration-300">
                <WineCardSmall
                  data-testid="wine-card"
                  {...wine}
                  className="shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:overflow-visible"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          aria-label="Previous Slide"
          /* eslint-disable-next-line tailwindcss/no-custom-classname */
          className="prev-btn nav-button nav-button-prev bg-primary-normal hover:bg-primary-dark"
        >
          <img
            src="/icons/slider/arrow-left.svg"
            alt="Previous"
            className="h-4 w-4 invert md:h-5 md:w-5"
          />
        </button>
        <button
          aria-label="Next Slide"
          /* eslint-disable-next-line tailwindcss/no-custom-classname */
          className="next-btn nav-button nav-button-next bg-primary-normal hover:bg-primary-dark"
        >
          <img
            src="/icons/slider/arrow-right.svg"
            alt="Next"
            className="h-4 w-4 invert md:h-5 md:w-5"
          />
        </button>
      </div>
    </section>
  );
};

export default TopWinesSection;
