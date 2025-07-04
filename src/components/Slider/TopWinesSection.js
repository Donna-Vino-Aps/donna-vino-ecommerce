import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/slider/buttons.css";
import WineCard from "@/components/Card/WineCard";

const wineData = [
  {
    title: "Muga Reserva",
    slug: "muga-reserva",
    price: 130.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: true,
    url: "/wines/muga-reserva",
  },
  {
    title: "Barolo Terlo",
    slug: "barolo-terlo",
    price: 121.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: true,
    url: "/wines/barolo-terlo",
  },
  {
    title: "Pinot Noir",
    slug: "pinot-noir",
    price: 180.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: false,
    url: "/wines/pinot-noir",
  },
  {
    title: "Vega Cicilia",
    slug: "vega-cicilia",
    price: 210.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: false,
    url: "/wines/vega-cicilia",
  },
  {
    title: "Saviognese Merlot",
    slug: "saviognese-merlot",
    price: 210.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: true,
    url: "/wines/saviognese-merlot",
  },
  {
    title: "Pinot Grigio",
    slug: "pinot-grigio",
    price: 210.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: false,
    url: "/wines/pinot-grigio",
  },
  {
    title: "Marques de Murrieta",
    slug: "marques-de-murrieta",
    price: 210.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: false,
    url: "/wines/marques-de-murrieta",
  },
];

const TopWinesSection = () => {
  return (
    <section className="relative w-full bg-primary-light py-20 pb-24 text-center">
      <div className="mb-[-60px]">
        <h3 className="text-titleMedium font-semibold text-primary-normal">
          MOST POPULAR PRODUCTS
        </h3>
        <h2 className="text-displayLarge font-regular text-tertiary1-dark">
          Top Wines
        </h2>
        <p className="mt-2 text-bodyLarge font-regular text-tertiary1-dark">
          Our Exclusive Selection of Finest Wines, Handpicked for You <br />
          Discover our wine selection
        </p>
      </div>

      <div className="relative mx-auto mt-[100px] h-auto w-full max-w-[1350px] overflow-visible px-4 sm:mt-0 md:h-[660px]">
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
          className="relative z-10 flex h-full w-full"
        >
          {wineData.map((wine, index) => (
            <SwiperSlide key={index} className="h-full overflow-visible ">
              <div className="group h-full overflow-visible transition-all duration-300">
                <Link
                  href={wine.url}
                  className="flex h-full w-full items-center justify-center"
                >
                  <WineCard
                    data-testid="wine-card"
                    {...wine}
                    className="shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:overflow-visible"
                  />
                </Link>
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
