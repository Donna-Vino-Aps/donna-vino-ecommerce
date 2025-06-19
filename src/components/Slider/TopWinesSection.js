import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/slider/buttons.css";

import WineCardSmall from "@/components/Card/WineCardSmall";
import { usePreSaleWines } from "@/context/PreSaleWinesContext";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";

const wineData = [
  {
    title: "Muga Reserva",
    slug: "muga-reserva",
    price: 130.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: true,
    url: "/wine-details/muga-reserva",
  },
  {
    title: "Barolo Terlo",
    slug: "barolo-terlo",
    price: 121.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: true,
    url: "/wine-details/barolo-terlo",
  },
  {
    title: "Pinot Noir",
    slug: "pinot-noir",
    price: 180.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: false,
    url: "/wine-details/pinot-noir",
  },
  {
    title: "Vega Cicilia",
    slug: "vega-cicilia",
    price: 210.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: false,
    url: "/wine-details/vega-cicilia",
  },
  {
    title: "Saviognese Merlot",
    slug: "saviognese-merlot",
    price: 210.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: true,
    url: "/wine-details/saviognese-merlot",
  },
  {
    title: "Pinot Grigio",
    slug: "pinot-grigio",
    price: 210.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: false,
    url: "/wine-details/pinot-grigio",
  },
  {
    title: "Marques de Murrieta",
    slug: "marques-de-murrieta",
    price: 210.0,
    imageUrl: "/images/exampleImageWine.png",
    isNew: false,
    url: "/wine-details/marques-de-murrieta",
  },
];

const TopWinesSection = () => {
  const { wines, isLoading, error } = usePreSaleWines();

  // Reused this from Natalias "/wines" page
  if (isLoading) {
    return (
      <div className="flex min-h-[25rem] items-center justify-center">
        <Spinner size="medium" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[25rem] items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!wines || wines.length === 0) {
    return (
      <div className="flex min-h-[25rem] items-center justify-center">
        <p className="text-bodyLarge font-medium text-tertiary1-normal">
          No Top Wines available at the moment.
        </p>
      </div>
    );
  }

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
                <Link href={wine.url} className="w-full">
                  <WineCardSmall
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
