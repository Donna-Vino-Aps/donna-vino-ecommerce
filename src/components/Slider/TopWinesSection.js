import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/slider/buttons.css";
import "../../styles/slider/slider.css";
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
    <section className="relative w-full bg-primary-light py-6 pb-24 text-center md:h-[880px]">
      <div className="flex flex-col items-center px-4 text-center md:mb-[-60px]">
        <h3 className="mt-2 text-headlineSmall sm:mt-0 sm:text-titleMedium sm:font-semibold">
          {translations["topwinesection.title"]}
        </h3>
        <h2 className="mt-2 pb-3 pt-6 text-displayMedium font-regular text-tertiary1-dark sm:mt-0 sm:py-6 sm:text-displayLarge">
          {translations["topwinesection.headline"]}
        </h2>
        <p className="text-bodyLarge font-regular text-tertiary1-dark sm:mb-6">
          {translations["topwinesection.description"]}
        </p>
      </div>

      <div className="relative top-4 mx-auto box-border h-[520px] w-full max-w-screen-2xl overflow-visible px-6 sm:top-0 sm:mt-0 md:h-[660px]">
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
          loop={true}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 24 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1440: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="relative z-10 flex h-full w-full overflow-visible !p-[10px]"
          centeredSlides={false}
        >
          {wines.map((wine, index) => (
            <SwiperSlide
              key={index}
              className="box-border flex h-auto items-stretch overflow-visible"
            >
              <div
                id="topWineCard"
                className="group relative bottom-3 flex h-full w-full items-center justify-center transition-all duration-300 md:bottom-0"
              >
                <Link
                  href={getWineUrl(wine)}
                  className="flex w-full items-center justify-center"
                >
                  <WineCard
                    key={wine.id}
                    title={wine.title}
                    price={wine.bottlePrice}
                    imageUrl={wine.imageUrl}
                    variant="top-wines"
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
            className="h-5 w-5 invert"
          />
        </button>
        <button
          aria-label="Next Slide"
          /* eslint-disable-next-line tailwindcss/no-custom-classname */
          className="next-btn nav-button nav-button-next bg-primary-normal hover:bg-primary-dark sm:pl-2"
        >
          <img
            src="/icons/slider/arrow-right.svg"
            alt="Next"
            className="h-5 w-5 invert"
          />
        </button>

        <div className="relative bottom-8 z-50 flex hidden justify-center md:inline-flex lg:inline-flex">
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
