import React from "react";
import PropTypes from "prop-types";
import InfoCard from "./InfoCard";
import { format, parseISO } from "date-fns";
import { enUS, da } from "date-fns/locale";
import { logError } from "@/utils/logging";
import { useLanguage } from "@/context/LanguageContext";

function EventDetails({ eventDetails = {} }) {
  const { language, translations } = useLanguage();

  const getLocale = () => {
    switch (language) {
      case "dk":
        return da;
      case "en":
      default:
        return enUS;
    }
  };

  const {
    availableSeats = "",
    totalInventory = "",
    location = "",
    date = "",
    timeStart = "",
    timeEnd = "",
    price = "",
    currency = "",
    description = "",
    wineDescription = "",
    menuDescription = "",
    images = [],
  } = eventDetails;

  const wineImage = images.find((img) => img.url?.includes("wine.jpg")) || {};
  const dinnerImage =
    images.find((img) => img.url?.includes("dinner.jpg")) || {};

  const formatTime = (timeString) => {
    if (!timeString) return "";

    try {
      if (timeString instanceof Date) {
        // Use 24-hour format for Danish, 12-hour for English
        const formatString = language === "dk" ? "HH:mm" : "h:mm aaa";
        return format(timeString, formatString, { locale: getLocale() });
      }
      return String(timeString);
    } catch (error) {
      logError("Error formatting time:", error.message);
      return String(timeString);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      const date = parseISO(dateString);
      const formatString =
        language === "dk" ? "d. MMMM yyyy" : "MMMM, do, yyyy";
      return format(date, formatString, { locale: getLocale() });
    } catch (error) {
      logError("Error formatting date:", error.message);
      return String(dateString);
    }
  };

  const formattedDate = formatDate(date);
  const formattedTimeStart = formatTime(timeStart);
  const formattedTimeEnd = formatTime(timeEnd);
  const time =
    formattedTimeStart && formattedTimeEnd
      ? `${translations["event.details.from"]} ${formattedTimeStart} ${translations["event.details.to"]} ${formattedTimeEnd}`
      : "";

  // Format seats available
  const seatsInfo =
    availableSeats !== undefined && availableSeats !== "" && totalInventory
      ? `${availableSeats}/${totalInventory}`
      : "";

  const isFull = availableSeats === 0 && totalInventory > 0;
  const percentageAvailable =
    totalInventory > 0 ? (availableSeats / totalInventory) * 100 : 0;

  // Assign classes based on available seats percentage
  let seatBgClass = "bg-calendar-open_light";
  let seatTextClass = "text-calendar-open_dark";

  if (isFull) {
    seatBgClass = "bg-calendar-full_light";
    seatTextClass = "text-calendar-full";
  } else if (percentageAvailable <= 50 && totalInventory !== 0) {
    seatBgClass = "bg-calendar-limited_light";
    seatTextClass = "text-calendar-limited";
  }

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
          <p>{formattedDate}</p>
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
          <p>{time}</p>
        </div>
        <div
          data-testid="event-details-price"
          className="flex items-center justify-center gap-2"
        >
          <img src="/icons/Money.svg" alt="Money icon" className="h-6 w-6" />
          <p>
            {translations["event.details.from"]} {price}{" "}
            {currency === "DKK" ? "kr." : currency}{" "}
            {translations["event.details.perPerson"]}
          </p>
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
    totalInventory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    location: PropTypes.string,
    date: PropTypes.string,
    timeStart: PropTypes.string,
    timeEnd: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
    description: PropTypes.string,
    wineDescription: PropTypes.string,
    menuDescription: PropTypes.string,
    wine: PropTypes.string,
    winery: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        url: PropTypes.string,
        altText: PropTypes.string,
      }),
    ),
  }),
};

export default EventDetails;
