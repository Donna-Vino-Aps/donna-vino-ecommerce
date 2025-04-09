import React from "react";
import PropTypes from "prop-types";
import InfoCard from "./InfoCard";
import { format, parseISO } from "date-fns";
import { logError, logInfo } from "@/utils/logging";

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
    wine = "",
    winery = "",
    images = [],
  } = eventDetails;

  const wineImage = images.find((img) => img.url?.includes("wine.jpg")) || {};
  const dinnerImage =
    images.find((img) => img.url?.includes("dinner.jpg")) || {};

  const formatTime = (timeString) => {
    if (!timeString) return "";

    try {
      if (timeString instanceof Date) {
        return format(timeString, "h:mm a");
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
  let seatBgClass = "bg-calendar-open";
  let seatTextClass = "text-white";
  if (availableSeats === 0) {
    seatBgClass = "bg-calendar-full";
    seatTextClass = "text-white";
  } else if (availableSeats < 10) {
    seatBgClass = "bg-calendar-limited";
    seatTextClass = "text-white";
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="w-full text-headlineSmall md:text-headlineMedium font-semibold font-barlow text-center">
          🍷✨Event's details ✨🍷
        </h2>
      </div>
      <div className="text-bodyMedium text-tertiary1-normal space-y-1 mb-6 text-center">
        <span
          className={`inline-block ${seatBgClass} ${seatTextClass} text-bodySmall px-4 py-1 rounded-full`}
        >
          Seats available {seatsInfo}
        </span>
        <div className="flex items-center gap-2 justify-center">
          <img src="/icons/pin.svg" alt="Location icon" className="h-6 w-6" />
          <p>{location}</p>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <img
            src="/icons/calendar1.svg"
            alt="Calendar icon"
            className="h-6 w-6"
          />
          <p>{formattedDate}</p>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <img
            src="/icons/clock-alt-1.svg"
            alt="Clock icon"
            className="h-6 w-6"
          />
          <p>{time}</p>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <img src="/icons/Money.svg" alt="Money icon" className="h-6 w-6" />
          <p>
            From {price} {currency === "DKK" ? "kr." : currency} per person
          </p>
        </div>
      </div>
      <p className="text-bodyMedium text-tertiary1-normal mb-6">
        {description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <InfoCard
          title="Our Wines"
          imageUrl={wineImage.url || "/images/wines.svg"}
          imageAlt={wineImage.altText || "Wine image"}
          description={wineDescription}
          winery={winery}
          wine={wine}
          bgClass="bg-primary-light"
        />

        <InfoCard
          title="Our Dinner Menu"
          imageUrl={dinnerImage.url || "/images/dinner.svg"}
          imageAlt={dinnerImage.altText || "Dinner menu image"}
          description={menuDescription}
          bgClass="bg-primary-active"
        />
      </div>
      <p className="text-bodySmall text-tertiary1-normal italic mb-6 text-center">
        (*) For allergies or special requests, please contact us after
        confirming your reservation.
      </p>
      <hr className="border-tertiary2-normal mb-6" />
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
