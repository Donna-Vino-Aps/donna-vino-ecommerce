import React from "react";

const EventsHeader = () => {
  const infoArticle =
    "flex flex-col gap-2 max-w-[27.313rem] max-h-[19.563rem] bg-white text-tertiary1-darker space-y-3 p-4 my-12 px-4 mx-4 rounded-2xl border-[2px] border-primary-active";

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
            className="absolute bottom-[40%] left-[25%] sm:bottom-[262%] sm:left-[385%] w-[3rem] h-[3rem] sm:w-[4.6rem] sm:h-[4.6rem]"
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
            className="absolute bottom-0 right-0 sm:bottom-[262%] sm:left-[350%] w-[3rem] h-[3rem] sm:w-[4.6rem] sm:h-[4.6rem]"
            data-testid="dotted-shape-4"
          />
        </div>
      </div>
      <section className="flex flex-col md:flex-row z-1">
        <div className="flex flex-col justify-center text-start mx-8 gap-6">
          <h1 className="text-displayMedium xl:max-w-[70%]">
            Secure your spot for our upcoming events.🍷✨
          </h1>
          <p className="text-bodyLarge xl:max-w-[70%]">
            Easily reserve one or more seats for our upcoming events, featuring
            freshly prepared Italian cuisine and wine tastings curated by our
            expert team.
          </p>
        </div>
        <figure className="overflow-hidden">
          <img
            src="/images/events-header-unsplash.jpg"
            className="min-w-[54.375rem] max-h-[29.313rem] md:rounded-tl-[11.531rem] max-w-full"
          />
        </figure>
      </section>
      <section className="flex flex-row justify-center z-1">
        <article className={infoArticle}>
          <h3 className="text-headlineSmall">
            1. Check availability on the calendar
          </h3>
          <p className="text-bodyLarge">
            Check availability on the calendar to view the upcoming event dates.
            The calendar highlights the availability status with three color
            codes: Green for full availability, Orange for limited seats, and
            Red for sold-out events. Simply click on your preferred date to
            proceed with your reservation.
          </p>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-tertiary2-darker">Next step</p>
            <img src="/icons/chevron-right-circle.svg" />
          </div>
        </article>
        <article className={infoArticle}>
          <h3 className="text-headlineSmall">2. Select date and seats.</h3>
          <p className="text-bodyLarge">
            Click on the date to view event details, including the selected
            wines and dinner menu. Then, choose your seats and proceed to the
            final step.
          </p>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-tertiary2-darker">Next step</p>
            <img src="/icons/chevron-right-circle.svg" />
          </div>
        </article>
        <article className={infoArticle}>
          <h3 className="text-headlineSmall">3. Payment and confirmation</h3>
          <p className="text-bodyLarge">
            After selecting an available date, review the menu and wines for the
            event. You’ll then be prompted to make a payment via MobilePay to
            reserve your seat(s). A confirmation message will be sent once your
            reservation is complete.
          </p>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-tertiary2-darker">
              Your reservation has been successfully completed.
            </p>
            <img src="/icons/checkmark-circle.svg" />
          </div>
        </article>
      </section>
    </section>
  );
};

export default EventsHeader;
