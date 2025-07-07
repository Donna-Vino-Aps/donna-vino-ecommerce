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
    <section className="relative h-[880px] w-full bg-primary-light py-6 pb-24 text-center">
      <div className="flex flex-col items-center px-4 text-center sm:mb-[-60px]">
        <h3 className="text-headlineSmall sm:text-titleMedium sm:font-semibold">
          {translations["topwinesection.title"]}
        </h3>
        <h2 className="mt-2 py-6 text-displayLarge font-regular text-tertiary1-dark sm:mt-0">
          {translations["topwinesection.headline"]}
        </h2>
        <p className="text-bodyLarge font-regular text-tertiary1-dark sm:mb-6">
          {translations["topwinesection.description"]}
        </p>
      </div>

      <div className="relative top-4 mx-auto h-[520px] w-full  max-w-[1410px] overflow-visible px-4 sm:top-0 sm:mt-0 md:h-[660px]">
        <Swiper
          slidesPerView={1}
          spaceBetween={5}
          navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
          loop={true}
          loopAdditionalSlides={0}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 5 },
            768: { slidesPerView: 2, spaceBetween: 0 },
            1024: { slidesPerView: 3, spaceBetween: 0 },
            1440: { slidesPerView: 4, spaceBetween: 0 },
          }}
          className="relative z-10 flex h-full w-full"
        >
          {wines.map((wine, index) => (
            <SwiperSlide key={index} className="w-full overflow-visible ">
              <div className="group flex h-full items-center justify-center overflow-visible transition-all duration-300">
                <Link
                  href={getWineUrl(wine)}
                  className="flex h-full w-full items-center justify-center"
                >
                  <WineCard
                    key={wine.id}
                    title={wine.title}
                    price={wine.bottlePrice}
                    imageUrl={wine.imageUrl}
                    variant={"top-wines"}
                    className="h-full shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:overflow-visible"
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
        <div className="flex hidden justify-center sm:inline-flex">
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
