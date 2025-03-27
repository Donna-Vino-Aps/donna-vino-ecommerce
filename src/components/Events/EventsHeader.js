import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const EventsHeader = () => {
  const { translations } = useLanguage();
  const infoArticle =
    "relative flex flex-col gap-2 max-w-[77.5%] min-h-[22.063rem] max-h-[80%] sm:max-w-[40%] sm:min-w-[20rem] md:max-w[40%] lg:min-w-[25%] lg:max-w-[27.313rem] lg:min-h-[22.063rem] bg-white text-tertiary1-darker space-y-3 lg:space-y-4 p-4 my-12 px-7 lg:mx-3 xl:mx-4 rounded-2xl border-[2px] border-primary-active";

  const cardButton =
    "flex flex-row gap-2 items-center hover:cursor-pointer min-w-[10rem] whitespace-nowrap";

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const handlePrevious = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? 3 - 1 : prevIndex - 1,
    );
  };

  return (
    <section className="relative flex flex-col bg-primary-light mb-8 z-10 w-full overflow-hidden">
      <div className="absolute bottom-0 left-0 sm:right-auto sm:left-0 sm:bottom-0 flex justify-start z-[-1]">
        <div className="relative w-[4.5rem] h-[6.75rem] sm:w-[10.35rem] sm:h-[6.93rem] max-w-[50vw]">
          <img
            src="/design-elements/Dotted Shape.svg"
            alt="dotted shape"
            className="absolute bottom-0 left-0 sm:top-auto sm:bottom-0 sm:right-0 w-[3rem] h-[3rem] sm:w-[4.6rem] sm:h-[4.6rem]"
            data-testid="dotted-shape-1"
          />
          <img
            src="/design-elements/Dotted Shape.svg"
            alt="dotted shape"
            className="absolute hidden sm:inline bottom-[40%] left-[25%] sm:bottom-[300%] sm:left-[385%] w-[3rem] h-[3rem] sm:w-[4.6rem] sm:h-[4.6rem]"
            data-testid="dotted-shape-2"
          />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 sm:right-auto sm:left-[61.5%] sm:bottom-0 flex justify-start z-[-1]">
        <div className="relative w-[4.5rem] h-[6.75rem] sm:w-[10.35rem] sm:h-[6.93rem] max-w-[50vw]">
          <img
            src="/design-elements/Dotted Shape.svg"
            alt="dotted shape"
            className="absolute bottom-0 left-0 sm:top-auto sm:bottom-0 sm:left-0 w-[3rem] h-[3rem] sm:w-[4.6rem] sm:h-[4.6rem]"
            data-testid="dotted-shape-3"
          />
          <img
            src="/design-elements/Dotted Shape.svg"
            alt="dotted shape"
            className="absolute bottom-0 right-0 sm:bottom-[300%] sm:left-[350%] w-[3rem] h-[3rem] sm:w-[4.6rem] sm:h-[4.6rem]"
            data-testid="dotted-shape-4"
          />
        </div>
      </div>
      <section className="flex flex-col sm:flex-row z-[1]">
        <div className="flex flex-col justify-center text-start mb-4 sm:mb-0 px-8 gap-6">
          <h1 className="text-displayMedium mt-8 sm:mt-4 md:mt-0 sm:text-displaySmall lg:text-displayMedium xl:max-w-[85%]">
            {translations["events-header.h1"]}🍷✨
          </h1>
          <p className="text-bodyLarge mb-4 sm:mb-0 max-w-[85%] md:max-w-[80%] xl:max-w-[80%]">
            {translations["events-header.p"]}
          </p>
        </div>
        <figure className="overflow-hidden sm:min-w-[55%] lg:min-w-[60%]">
          <img
            src="/images/events-header-unsplash.jpg"
            className="object-cover max-h-[22.5rem] w-full sm:min-w-[54.375rem] sm:max-h-[25.313rem] md:max-h-[29.313rem] sm:rounded-tl-[11.531rem]"
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
          <p className="text-bodyLarge lg:text-bodyLarge">
            {translations["events-header.card2-p"]}
          </p>
          <div className="lg:hidden flex w-full items-center">
            <button
              className={`${cardButton} absolute left-10 bottom-6`}
              onClick={handlePrevious}
            >
              <img className="w-4 h-4" src="/icons/chevron-left-circle.svg" />
              <p className="text-tertiary2-darker">Previous step</p>
            </button>
            <button
              className={`${cardButton} absolute right-2 bottom-6`}
              onClick={handleNext}
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
          <p className="text-bodyLarge lg:text-bodyLarge">
            {translations["events-header.card3-p"]}
          </p>
          <button
            className={`lg:hidden absolute bottom-6 ${cardButton}`}
            onClick={handleNext}
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
