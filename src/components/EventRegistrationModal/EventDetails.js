import React from "react";
import PropTypes from "prop-types";
import InfoCard from "./InfoCard";
import { format, parseISO } from "date-fns";
import { logError } from "@/utils/logging";

function EventDetails({ eventDetails = {} }) {
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
        return format(timeString, "h:mm aaa");
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
      return format(date, "MMMM, do, yyyy");
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
      ? `From ${formattedTimeStart} to ${formattedTimeEnd}`
      : "";

  // Format seats available
  const seatsInfo =
    availableSeats && totalInventory
      ? `${availableSeats}/${totalInventory}`
      : "";

  // Assign classes based on available seats
  let seatBgClass = "bg-calendar-open_light";
  let seatTextClass = "text-calendar-open_dark";
  if (availableSeats === 0) {
    seatBgClass = "bg-calendar-full_light";
    seatTextClass = "text-calendar-full";
  } else if (availableSeats < 10) {
    seatBgClass = "bg-calendar-limited_light";
    seatTextClass = "text-calendar-limited";
  }

  return (
    <>
      <h2
        data-testid="event-details-title"
        className="w-full text-headlineSmall md:text-headlineLarge text-center mb-6"
      >
        🍷✨Event's details ✨🍷
      </h2>

      <div
        data-testid="event-details-info"
        className="flex flex-col items-start md:items-center gap-4 mb-6 text-titleMedium text-tertiary2-darker"
      >
        <span
          data-testid="event-details-seats"
          className={`inline-block ${seatBgClass} ${seatTextClass} self-center text-labelXLarge font-semibold px-6 py-3 rounded-full`}
        >
          Seats available {seatsInfo}
        </span>
        <div
          data-testid="event-details-location"
          className="flex items-center gap-2 justify-center"
        >
          <img src="/icons/pin.svg" alt="Location icon" className="h-6 w-6" />
          <p>{location}</p>
        </div>
        <div
          data-testid="event-details-date"
          className="flex items-center gap-2 justify-center"
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
          className="flex items-center gap-2 justify-center"
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
          className="flex items-center gap-2 justify-center"
        >
          <img src="/icons/Money.svg" alt="Money icon" className="h-6 w-6" />
          <p>
            From {price} {currency === "DKK" ? "kr." : currency} per person
          </p>
        </div>
      </div>

      <p
        data-testid="event-details-description"
        className="text-bodyMedium text-tertiary2-darker mb-6 text-center"
      >
        {description}
      </p>
      <div
        data-testid="event-details-cards"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <InfoCard
          data-testid="event-details-wine-card"
          title="Our Wines"
          imageUrl={wineImage.url || "/images/wines.svg"}
          imageAlt={wineImage.altText || "Wine image"}
          description={wineDescription}
          bgClass="bg-primary-light"
        />

        <InfoCard
          data-testid="event-details-menu-card"
          title="Our Dinner Menu"
          imageUrl={dinnerImage.url || "/images/dinner.svg"}
          imageAlt={dinnerImage.altText || "Dinner menu image"}
          description={menuDescription}
          bgClass="bg-primary-active"
        />
      </div>
      <p
        data-testid="event-details-footer"
        className="text-bodySmall text-tertiary2-darker italic mb-6 text-center"
      >
        (*) For allergies or special requests, please contact us after
        confirming your reservation.
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
