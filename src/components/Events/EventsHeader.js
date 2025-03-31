import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const EventsHeader = () => {
  const { translations } = useLanguage();
  const infoArticle =
    "relative flex flex-col gap-2 min-w-[20rem] max-w-[70%] min-h-[20.938rem] sm:max-w-[40%] sm:min-w-[22.375rem] md:max-w[40%] lg:min-w-[22.5%] lg:max-w-[25rem] lg:min-h-[22.063rem] bg-white text-tertiary1-darker space-y-2 lg:space-y-3 xl:space-y-4 p-4 my-12 px-7 md:mx-3 lg:mx-4 rounded-2xl border-[2px] border-primary-active";

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
    <section className="relative flex flex-col bg-primary-light mb-8 z-10 w-full overflow-hidden">
      <div className="absolute bottom-0 left-0 sm:right-auto sm:left-0 sm:bottom-0 flex justify-start z-[-1]">
        <div className="relative w-[4.5rem] h-[6.75rem] sm:w-[10.35rem] sm:h-[6.93rem] max-w-[50vw]">
          <img
            src="/design-elements/dotted-shape.svg"
            alt="dotted shape"
            className="absolute bottom-0 left-0 sm:top-auto sm:bottom-0 sm:right-0 w-[4.6rem] h-[4.6rem]"
            data-testid="dotted-shape-1"
          />
          <img
            src="/design-elements/dotted-shape.svg"
            alt="dotted shape"
            className="absolute hidden sm:inline bottom-[40%] left-[25%] sm:bottom-[300%] sm:left-[385%] w-[4.6rem] h-[4.6rem]"
            data-testid="dotted-shape-2"
          />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 sm:right-auto sm:left-[61.5%] sm:bottom-0 flex justify-start z-[-1]">
        <div className="relative w-[4.5rem] h-[6.75rem] sm:w-[10.35rem] sm:h-[6.93rem] max-w-[50vw]">
          <img
            src="/design-elements/dotted-shape.svg"
            alt="dotted shape"
            className="absolute bottom-0 left-0 hidden sm:inline sm:top-auto sm:bottom-0 sm:left-0 w-[4.6rem] h-[4.6rem]"
            data-testid="dotted-shape-3"
          />
          <img
            src="/design-elements/dotted-shape.svg"
            alt="dotted shape"
            className="absolute bottom-[325%] right-0 sm:bottom-[300%] sm:left-[350%] w-[4.6rem] h-[4.6rem]"
            data-testid="dotted-shape-4"
          />
        </div>
      </div>
      <section className="flex flex-col sm:flex-row z-[1]">
        <div className="flex flex-col justify-center text-start mb-4 sm:mb-0 px-8 gap-6">
          <h1 className="text-displayMedium max-w-[80%] sm:max-w-full mt-8 sm:mt-4 md:mt-0 sm:text-displaySmall lg:text-displayMedium xl:max-w-[85%]">
            {translations["events-header.h1"]}🍷✨
          </h1>
          <p className="text-bodyLarge mb-4 sm:mb-0 max-w-[95%] sm:max-w-[85%] md:max-w-[80%] xl:max-w-[80%]">
            {translations["events-header.p"]}
          </p>
        </div>
        <figure className="overflow-hidden sm:min-w-[55%] lg:min-w-[60%]">
          <img
            src="/images/events-header-unsplash.jpg"
            className="object-cover min-h-[22.5rem] w-full sm:min-w-[54.375rem] sm:min-h sm:max-h-[25.313rem] md:max-h-[29.313rem] sm:rounded-tl-[11.531rem]"
            alt="Hands pouring a glass of wine at a wine tasting"
          />
        </figure>
      </section>
      <section className="relative flex flex-row justify-center z-[1] mx-2">
        <article
          className={` ${currentCardIndex === 0 ? "flex" : "hidden"} 
          lg:flex ${infoArticle}`}
        >
          <h3 className="text-headlineMedium pt-2">
            1. {translations["events-header.card1-h"]}
          </h3>
          <p className="text-bodyMedium lg:text-bodyLarge">
            {translations["events-header.card1-p"]}
          </p>
          <button
            className={`lg:hidden absolute bottom-6 ${cardButton}`}
            onClick={handleNext}
            aria-label={translations["events-header.button-next"]}
          >
            <p className="text-tertiary2-darker">
              {translations["events-header.button-next"]}
            </p>
            <img
              className="relative top-[2px]"
              src="/icons/chevron-right-circle.svg"
            />
          </button>
        </article>
        <article
          className={`${currentCardIndex === 1 ? "flex" : "hidden"} 
          lg:flex ${infoArticle} `}
        >
          <h3 className="text-headlineMedium pt-2">
            2. {translations["events-header.card2-h"]}
          </h3>
          <p className="text-bodyLarge">
            {translations["events-header.card2-p"]}
          </p>
          <div className="absolute bottom-6 lg:hidden flex justify-between w-full items-center">
            <button
              className={`${cardButton}`}
              onClick={handlePrevious}
              aria-label={translations["events-header.button-prev"]}
            >
              <img className="w-4 h-4" src="/icons/chevron-left-circle.svg" />
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
                src="/icons/chevron-right-circle.svg"
              />
            </button>
          </div>
        </article>
        <article
          className={` ${currentCardIndex === 2 ? "flex" : "hidden"} 
          lg:flex ${infoArticle}`}
        >
          <h3 className="text-headlineMedium  pt-2">
            3. {translations["events-header.card3-h"]}
          </h3>
          <p className="text-bodyMedium sm:text-bodyLarge">
            {translations["events-header.card3-p"]}
          </p>
          <button
            className={`lg:hidden absolute bottom-6 ${cardButton}`}
            onClick={handleNext}
            aria-label={translations["events-header.button-next"]}
          >
            <p className="text-tertiary2-darker">
              {translations["events-header.button-complete"]}
            </p>
            <img src="/icons/checkmark-circle.svg" />
          </button>
        </article>
      </section>
    </section>
  );
};

export default EventsHeader;
