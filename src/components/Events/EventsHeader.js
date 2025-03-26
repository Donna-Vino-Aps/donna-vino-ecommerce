import React from "react";

const EventsHeader = () => {
  const infoArticle =
    "flex flex-col gap-2 mx-4 max-w-[27.313rem] max-h-[19.563rem] bg-white text-tertiary1-darker space-y-3 p-4 my-12 mx-8 rounded-2xl border-[2px] border-primary-active";

  return (
    <section className="flex flex-col bg-primary-light mb-8">
      <section className="flex flex-col md:flex-row">
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
        <figure className="">
          <img
            src="/images/events-header-unsplash.jpg"
            className="max-w-[54.375rem] max-h-[29.313rem] md:rounded-tl-[11.531rem]"
          />
        </figure>
      </section>
      <section className="flex flex-row justify-center">
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
