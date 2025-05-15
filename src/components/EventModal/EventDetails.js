import React from "react";
import PropTypes from "prop-types";
import InfoCard from "./InfoCard";
import { useLanguage } from "@/context/LanguageContext";

function EventDetails({ eventDetails = {} }) {
  const { translations } = useLanguage();

  const {
    availableSeats = null,
    totalSeats = null,
    location = "",
    formattedDateFull = "",
    formattedTimeStart = "",
    formattedTimeEnd = "",
    price = null,
    currency = "",
    description = "",
    wineDescription = "",
    menuDescription = "",
    images = [],
    seatStatus = {},
  } = eventDetails;

  const wineImage = images.find((img) => img.url?.includes("wine.jpg")) || {};
  const dinnerImage =
    images.find((img) => img.url?.includes("dinner.jpg")) || {};

  const timeInfo =
    formattedTimeStart && formattedTimeEnd
      ? `${translations["event.details.from"]} ${formattedTimeStart} ${translations["event.details.to"]} ${formattedTimeEnd}`
      : "";

  const seatsInfo =
    availableSeats !== undefined && availableSeats !== "" && totalSeats
      ? `${availableSeats}/${totalSeats}`
      : "";

  const seatBgClass = seatStatus.bgColor;
  const seatTextClass = seatStatus.textColor;

  const currencySymbol = currency === "DKK" ? "kr." : currency;

  let priceAndCurrencyText = "";
  if (price !== null && price !== undefined) {
    if (currency) {
      priceAndCurrencyText = `${price} ${currencySymbol}`;
    } else {
      priceAndCurrencyText = `${price}`; // Price only, no currency
    }
  }

  const priceInfo = priceAndCurrencyText
    ? `${translations["event.details.from"]} ${priceAndCurrencyText} ${translations["event.details.perPerson"]}`
    : `${translations["event.details.from"]} ${translations["event.details.perPerson"]}`;

  return (
    <>
      <h2
        data-testid="event-details-title"
        className="mb-6 w-full text-center text-headlineSmall md:text-headlineLarge"
      >
        🍷✨ {translations["event.details.title"]} ✨🍷
      </h2>

      <div
        data-testid="event-details-info"
        className="mb-6 flex flex-col items-start gap-4 text-titleMedium text-tertiary2-darker md:items-center"
      >
        <span
          data-testid="event-details-seats"
          className={`inline-block ${seatBgClass} ${seatTextClass} self-center rounded-full px-6 py-3 text-labelXLarge font-semibold`}
        >
          {translations["event.details.seatsAvailable"]} {seatsInfo}
        </span>
        <div
          data-testid="event-details-location"
          className="flex items-center justify-center gap-2"
        >
          <img src="/icons/pin.svg" alt="Location icon" className="h-6 w-6" />
          <p>{location}</p>
        </div>
        <div
          data-testid="event-details-date"
          className="flex items-center justify-center gap-2"
        >
          <img
            src="/icons/calendar1.svg"
            alt="Calendar icon"
            className="h-6 w-6"
          />
          <p>{formattedDateFull}</p>
        </div>
        <div
          data-testid="event-details-time"
          className="flex items-center justify-center gap-2"
        >
          <img
            src="/icons/clock-alt-1.svg"
            alt="Clock icon"
            className="h-6 w-6"
          />
          <p>{timeInfo}</p>
        </div>
        <div
          data-testid="event-details-price"
          className="flex items-center justify-center gap-2"
        >
          <img src="/icons/Money.svg" alt="Money icon" className="h-6 w-6" />
          <p>{priceInfo}</p>
        </div>
      </div>

      <p
        data-testid="event-details-description"
        className="mb-6 text-center text-bodyMedium text-tertiary2-darker"
      >
        {description}
      </p>
      <div
        data-testid="event-details-cards"
        className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <InfoCard
          data-testid="event-details-wine-card"
          title={translations["event.details.wineCard.title"]}
          imageUrl={wineImage.url || "/images/wines.svg"}
          imageAlt={wineImage.altText || "Wine image"}
          description={wineDescription}
          bgClass="bg-primary-light"
        />

        <InfoCard
          data-testid="event-details-menu-card"
          title={translations["event.details.menuCard.title"]}
          imageUrl={dinnerImage.url || "/images/dinner.svg"}
          imageAlt={dinnerImage.altText || "Dinner menu image"}
          description={menuDescription}
          bgClass="bg-primary-active"
        />
      </div>

      <p
        data-testid="event-details-footer"
        className="mb-6 text-center text-bodySmall italic text-tertiary2-darker"
      >
        {translations["event.details.allergies"]}
      </p>
    </>
  );
}

EventDetails.propTypes = {
  eventDetails: PropTypes.shape({
    availableSeats: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalSeats: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    location: PropTypes.string,
    formattedDate: PropTypes.string,
    formattedDateFull: PropTypes.string,
    formattedTimeStart: PropTypes.string,
    formattedTimeEnd: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
    description: PropTypes.string,
    wineDescription: PropTypes.string,
    menuDescription: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        url: PropTypes.string,
        altText: PropTypes.string,
      }),
    ),
    seatStatus: PropTypes.shape({
      bgColor: PropTypes.string,
      textColor: PropTypes.string,
    }),
  }),
};

export default EventDetails;
