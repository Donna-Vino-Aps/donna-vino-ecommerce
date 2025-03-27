import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const EventsHeader = () => {
  const { translations } = useLanguage();
  const infoArticle1 =
    "relative flex flex-col gap-2 min-w-[27.313rem] max-w-[27.313rem] min-h-[22.063rem] bg-white text-tertiary1-darker space-y-4 p-4 my-12 px-7 mx-4 rounded-2xl border-[2px] border-primary-active";
  const infoArticle2 =
    "relative flex flex-col gap-2 min-w-[27.313rem] max-w-[27.313rem] min-h-[19.563rem] bg-white text-tertiary1-darker space-y-4 p-4 my-12 px-7 mx-4 rounded-2xl border-[2px] border-primary-active";
  const cardButton =
    "absolute bottom-6 flex flex-row gap-2 items-center hover:cursor-pointer";

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
            className="absolute bottom-[40%] left-[25%] sm:bottom-[300%] sm:left-[385%] w-[3rem] h-[3rem] sm:w-[4.6rem] sm:h-[4.6rem]"
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
      <section className="flex flex-col md:flex-row z-1">
        <div className="flex flex-col justify-center text-start px-8 gap-6">
          <h1 className="text-displayMedium xl:max-w-[85%]">
            {translations["events-header.h1"]}🍷✨
          </h1>
          <p className="text-bodyLarge xl:max-w-[80%]">
            {translations["events-header.p"]}
          </p>
        </div>
        <figure className="overflow-hidden">
          <img
            src="/images/events-header-unsplash.jpg"
            className="object-right min-w-[54.375rem] max-h-[29.313rem] md:rounded-tl-[11.531rem] max-w-full"
          />
        </figure>
      </section>
      <section className="flex flex-row justify-center z-1">
        <article className={infoArticle1}>
          <h3 className="text-headlineSmall pt-2">
            1. {translations["events-header.card1-h"]}
          </h3>
          <p className="text-bodyLarge">
            {translations["events-header.card1-p"]}
          </p>
          <div className={cardButton}>
            <p className="text-tertiary2-darker">
              {translations["events-header.button-next"]}
            </p>
            <img
              className="relative top-[2px]"
              src="/icons/chevron-right-circle.svg"
            />
          </div>
        </article>
        <article className={infoArticle2}>
          <h3 className="text-headlineSmall pt-2">
            2. {translations["events-header.card2-h"]}
          </h3>
          <p className="text-bodyLarge">
            {translations["events-header.card2-p"]}
          </p>
          <div className={cardButton}>
            <p className="text-tertiary2-darker">
              {translations["events-header.button-next"]}
            </p>
            <img
              className="relative top-[2px]"
              src="/icons/chevron-right-circle.svg"
            />
          </div>
        </article>
        <article className={infoArticle2}>
          <h3 className="text-headlineSmall pt-2">
            3. {translations["events-header.card3-h"]}
          </h3>
          <p className="text-bodyLarge">
            {translations["events-header.card3-p"]}
          </p>
          <div className={cardButton}>
            <p className="text-tertiary2-darker">
              {translations["events-header.button-complete"]}
            </p>
            <img src="/icons/checkmark-circle.svg" />
          </div>
        </article>
      </section>
    </section>
  );
};

export default EventsHeader;
