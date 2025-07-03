import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/slider/buttons.css";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { usePreSaleWines } from "@/context/PreSaleWinesContext";
import { getWineUrl } from "@/utils/wineUtils";
import ErrorMessage from "@/components/UI/ErrorMessage";
import WineCard from "@/components/Card/WineCard";

const TopWinesSection = () => {
  const { translations } = useLanguage();
  const { wines, isLoading, error } = usePreSaleWines();

  if (isLoading) {
    return <div data-testid="loading">Loading...</div>;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }
  if (!wines || wines.length === 0) {
    return <div>No top wines available at the moment.</div>;
  }

  return (
    <section className="relative w-full bg-primary-light py-6 pb-24 text-center">
      <div className="mb-[-60px]">
        <h3 className="text-titleMedium font-semibold">
          {translations["topwinesection.title"]}
        </h3>
        <h2 className="py-6 text-displayLarge font-regular text-tertiary1-dark">
          {translations["topwinesection.headline"]}
        </h2>
        <p className="mb-6 text-bodyLarge font-regular text-tertiary1-dark">
          {translations["topwinesection.description"]}
        </p>
      </div>

      <div className="relative mx-auto mt-[100px] h-auto w-full max-w-[1350px] overflow-visible px-4 sm:mt-0 md:h-[660px]">
        <Swiper
          slidesPerView={1}
          spaceBetween={5}
          navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
          loop={true}
          loopAdditionalSlides={0}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 5 },
            768: { slidesPerView: 2, spaceBetween: 8 },
            1024: { slidesPerView: 3, spaceBetween: 10 },
            1440: { slidesPerView: 4, spaceBetween: 12 },
          }}
          className="relative z-10 flex h-full w-full"
        >
          {wines.map((wine, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center overflow-visible px-3"
            >
              <div className="group flex items-center justify-center overflow-visible px-5 py-5 transition-all duration-300">
                <Link href={getWineUrl(wine)} className="w-full">
                  <WineCard
                    data-testid="wine-card"
                    key={wine.id}
                    price={wine.bottlePrice}
                    title={wine.title}
                    imageUrl={wine.imageUrl}
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
        <div className="flex justify-center">
          <Button
            text={translations["topwinesection.button-more"]}
            color="white"
            width="large"
            size="lg"
            variant="outlineThin"
            border="primaryNormal"
            linkUrl="/wines/pre-sale"
            aria-label={translations["topwinesection.button-more"]}
          />
        </div>
      </div>
    </section>
  );
};

export default TopWinesSection;
