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
    <section className="py-20 bg-primary-light text-center relative pb-24 w-full">
      <div className="mb-[-60px]">
        <h3 className="text-titleMedium font-semibold text-primary-normal">
          MOST POPULAR PRODUCTS
        </h3>
        <h2 className="font-regular text-tertiary1-dark text-displayLarge">
          Top Wines
        </h2>
        <p className="text-bodyLarge font-regular text-tertiary1-dark mt-2">
          Our Exclusive Selection of Finest Wines, Handpicked for You <br />
          Discover our wine selection
        </p>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 md:h-[660px] h-auto overflow-visible">
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
              className="flex justify-center items-center overflow-visible px-3"
            >
              <div className="overflow-visible transition-all duration-300 group flex justify-center items-center px-5 py-5">
                <WineCardSmall
                  data-testid="wine-card"
                  {...wine}
                  className="transition-transform duration-300 group-hover:scale-105 shadow-lg group-hover:overflow-visible"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          aria-label="Previous Slide"
          className="prev-btn nav-button nav-button-prev bg-primary-normal hover:bg-primary-dark"
        >
          <img
            src="/icons/slider/arrow-left.svg"
            alt="Previous"
            className="w-4 h-4 md:w-5 md:h-5 invert"
          />
        </button>
        <button
          aria-label="Next Slide"
          className="next-btn nav-button nav-button-next bg-primary-normal hover:bg-primary-dark"
        >
          <img
            src="/icons/slider/arrow-right.svg"
            alt="Next"
            className="w-4 h-4 md:w-5 md:h-5 invert"
          />
        </button>
      </div>
    </section>
  );
};

export default TopWinesSection;
