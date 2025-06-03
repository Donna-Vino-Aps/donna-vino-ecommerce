import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const EventsHeader = () => {
  const { translations } = useLanguage();
  const infoArticle =
    "relative flex flex-col gap-2 min-w-[20rem] max-w-[70%] min-h-[20.938rem] sm:max-w-[40%] sm:min-w-[22.375rem] md:max-w-[40%] lg:min-w-[22.5%] lg:max-w-[25rem] lg:min-h-[22.063rem] bg-white text-tertiary1-darker space-y-2 lg:space-y-3 xl:space-y-4 p-4 my-12 px-7 md:mx-3 lg:mx-4 rounded-2xl border-[2px] border-primary-active";

  const cardButton =
    "flex flex-row gap-2 items-center hover:cursor-pointer min-w-[10rem] whitespace-nowrap";

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const TOTAL_CARDS = 3;

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % TOTAL_CARDS);
  };

  const handlePrevious = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? TOTAL_CARDS - 1 : prevIndex - 1,
    );
  };

  return (
    <section className="relative z-10 mb-8 flex w-full flex-col overflow-hidden bg-primary-light">
      <div className="absolute bottom-0 left-0 z-[-1] flex justify-start sm:bottom-0 sm:left-0 sm:right-auto">
        <div className="relative h-[6.75rem] w-[4.5rem] max-w-[50vw] sm:h-[6.93rem] sm:w-[10.35rem]">
          <img
            src="/design-elements/dotted-shape.svg"
            alt="dotted shape"
            className="absolute bottom-0 left-0 h-[4.6rem] w-[4.6rem] sm:bottom-0 sm:right-0 sm:top-auto"
            data-testid="dotted-shape-1"
          />
          <img
            src="/design-elements/dotted-shape.svg"
            alt="dotted shape"
            className="absolute bottom-[40%] left-[25%] hidden h-[4.6rem] w-[4.6rem] sm:bottom-[300%] sm:left-[385%] sm:inline"
            data-testid="dotted-shape-2"
          />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 z-[-1] flex justify-start sm:bottom-0 sm:left-[61.5%] sm:right-auto">
        <div className="relative h-[6.75rem] w-[4.5rem] max-w-[50vw] sm:h-[6.93rem] sm:w-[10.35rem]">
          <img
            src="/design-elements/dotted-shape.svg"
            alt="dotted shape"
            className="absolute bottom-0 left-0 hidden h-[4.6rem] w-[4.6rem] sm:bottom-0 sm:left-0 sm:top-auto sm:inline"
            data-testid="dotted-shape-3"
          />
          <img
            src="/design-elements/dotted-shape.svg"
            alt="dotted shape"
            className="absolute bottom-[325%] right-0 h-[4.6rem] w-[4.6rem] sm:bottom-[300%] sm:left-[350%]"
            data-testid="dotted-shape-4"
          />
        </div>
      </div>
      <section className="z-[1] flex flex-col sm:flex-row">
        <div className="mb-4 flex flex-col justify-center gap-6 px-8 text-start sm:mb-0">
          <h1 className="mt-8 max-w-[80%] text-displayMedium sm:mt-4 sm:max-w-full sm:text-displaySmall md:mt-0 lg:text-displayMedium xl:max-w-[85%]">
            {translations["events-header.h1"]}🍷✨
          </h1>
          <p className="mb-4 max-w-[95%] text-bodyLarge sm:mb-0 sm:max-w-[85%] md:max-w-[80%] xl:max-w-[80%]">
            {translations["events-header.p"]}
          </p>
        </div>
        <figure className="overflow-hidden sm:min-w-[55%] lg:min-w-[60%]">
          <img
            src="/images/events-header-unsplash.jpg"
            className="min-h-[22.5rem] w-full object-cover sm:max-h-[25.313rem] sm:min-w-[54.375rem] sm:rounded-tl-[11.531rem] md:max-h-[29.313rem]"
            alt="Hands pouring a glass of wine at a wine tasting"
          />
        </figure>
      </section>
      <section className="relative z-[1] mx-2 flex flex-row justify-center">
        <article
          className={` ${currentCardIndex === 0 ? "flex" : "hidden"} 
          lg:flex ${infoArticle}`}
        >
          <h3 className="pt-2 text-headlineMedium">
            1. {translations["events-header.card1-h"]}
          </h3>
          <p className="text-bodyMedium lg:text-bodyLarge">
            {translations["events-header.card1-p"]}
          </p>
          <button
            className={`absolute bottom-6 lg:hidden ${cardButton}`}
            onClick={handleNext}
            aria-label={translations["events-header.button-next"]}
          >
            <p className="text-tertiary2-darker">
              {translations["events-header.button-next"]}
            </p>
            <img
              className="relative top-[2px]"
              src="/icons/chevron-right-circle.svg"
              alt="Chevron right in circle icon, indicates forward navigation."
            />
          </button>
        </article>
        <article
          className={`${currentCardIndex === 1 ? "flex" : "hidden"} 
          lg:flex ${infoArticle} `}
        >
          <h3 className="pt-2 text-headlineMedium">
            2. {translations["events-header.card2-h"]}
          </h3>
          <p className="text-bodyLarge">
            {translations["events-header.card2-p"]}
          </p>
          <div className="absolute bottom-6 flex w-full items-center justify-between lg:hidden">
            <button
              className={`${cardButton}`}
              onClick={handlePrevious}
              aria-label={translations["events-header.button-prev"]}
            >
              <img
                alt="Chevron left in circle icon, indicates backward navigation."
                className="h-4 w-4"
                src="/icons/chevron-left-circle.svg"
              />
              <p className="text-tertiary2-darker">
                {translations["events-header.button-prev"]}
              </p>
            </button>
            <button
              className={`${cardButton}`}
              onClick={handleNext}
              aria-label={translations["events-header.button-next"]}
            >
              <p className="text-tertiary2-darker">
                {translations["events-header.button-next"]}
              </p>
              <img
                className="relative top-[2px]"
                alt="Chevron right in circle icon, indicates forward navigation."
                src="/icons/chevron-right-circle.svg"
              />
            </button>
          </div>
        </article>
        <article
          className={` ${currentCardIndex === 2 ? "flex" : "hidden"} 
          lg:flex ${infoArticle}`}
        >
          <h3 className="pt-2  text-headlineMedium">
            3. {translations["events-header.card3-h"]}
          </h3>
          <p className="text-bodyMedium sm:text-bodyLarge">
            {translations["events-header.card3-p"]}
          </p>
          <button
            className={`absolute bottom-6 lg:hidden ${cardButton}`}
            onClick={handleNext}
            aria-label={translations["events-header.button-next"]}
          >
            <p className="text-tertiary2-darker">
              {translations["events-header.button-complete"]}
            </p>
            <img
              src="/icons/checkmark-circle.svg"
              alt="Checkmark in circle icon, indicates success or confirmation."
            />
          </button>
        </article>
      </section>
    </section>
  );
};

export default EventsHeader;
