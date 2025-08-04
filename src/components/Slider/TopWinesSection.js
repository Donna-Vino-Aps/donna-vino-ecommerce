import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/slider/buttons.css";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useTopWines } from "@/context/TopWinesContext";
import { getWineUrl } from "@/utils/wineUtils";
import ErrorMessage from "@/components/UI/ErrorMessage";
import WineCard from "@/components/Card/WineCard";
import TopWinesHeader from "./TopWinesHeader";

const TopWinesSection = () => {
  const { translations } = useLanguage();
  const { wines, isLoading, error } = useTopWines();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (isLoading) {
    return (
      <div className="min-h-[20px] text-center" data-testid="loading">
        {translations["topwineSection.loadWines"]}
      </div>
    );
  }

  if (error || !wines || wines.length === 0) {
    return (
      <div className="min-h-[40px] px-2 text-center">
        <h2 className="mt-2 pb-3 pt-6 text-displayMedium font-regular text-tertiary1-dark sm:mt-0 sm:py-6 sm:text-displayLarge">
          {translations["topwineSection.headline"]}
        </h2>
        <div className="mb-6 mt-4 text-bodyLarge font-regular text-tertiary1-dark">
          {error ? (
            <ErrorMessage message={error} />
          ) : (
            translations["topwineSection.noWines"]
          )}
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full bg-primary-light py-6 pb-24 text-center md:h-[880px]">
      <TopWinesHeader />

      <div className="relative top-4 mx-auto box-border h-[520px] w-full max-w-[1400px] overflow-visible px-6 sm:top-0 sm:mt-0">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          navigation={{ nextEl: nextRef.current, prevEl: prevRef.current }}
          loop={true}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (swiper.params && swiper.navigation) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              }
            });
          }}
          className="relative z-10 flex h-full w-full overflow-visible"
          centeredSlides={false}
        >
          {wines.map((wine) => (
            <SwiperSlide
              key={`wine-slide-${wine.id}`}
              className="box-border flex h-auto items-stretch overflow-visible"
            >
              <div
                className="group relative bottom-3 mx-auto box-border flex h-full w-full max-w-[580px] items-center 
                           justify-center
                           px-[10px]
                           transition-all
                           duration-300
                           min-[400px]:max-md:px-[clamp(16px,6vw,80px)]
                           md:bottom-0"
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
          ref={prevRef}
          className="nav-button nav-button-prev bg-primary-normal hover:bg-primary-dark"
        >
          <img
            src="/icons/slider/arrow-left.svg"
            alt="Previous"
            className="h-5 w-5 invert"
          />
        </button>
        <button
          aria-label="Next Slide"
          ref={nextRef}
          className="nav-button nav-button-next bg-primary-normal hover:bg-primary-dark sm:pl-2"
        >
          <img
            src="/icons/slider/arrow-right.svg"
            alt="Next"
            className="h-5 w-5 invert"
          />
        </button>

        <div className="relative top-9 z-50 hidden justify-center md:inline-flex">
          <Button
            text={translations["topwineSection.button-more"]}
            color="white"
            width="large"
            size="lg"
            variant="outlineThin"
            border="primaryNormal"
            linkUrl="/wines/pre-sale"
            aria-label={translations["topwineSection.button-more"]}
          />
        </div>
      </div>
    </section>
  );
};

export default TopWinesSection;
