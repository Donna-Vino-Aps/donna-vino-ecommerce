"use client";

import React from "react";
import PropTypes from "prop-types";

const BASE_CALENDARITEM_CLASSES = `
   h-[7.938rem] w-[12.5rem] text-labelXLarge font-semibold rounded-tl-[16px] rounded-bl-[62.5px]
`;

const CalendarItem = ({
  dayOfMonth,
  icon,
  seatsTaken = 0,
  seatsTotal = 0,
  variant = "none",
  onClick,
}) => {
  const seatsAvailable = seatsTotal - seatsTaken;
  const isFull = seatsAvailable === 0 && seatsTotal > 0;
  const percentageAvailable = (seatsAvailable / seatsTotal) * 100;

  // Get today's date
  const today = new Date();
  const todayDayOfMonth = today.getDate(); // Get the day of the month (1-31)

  // Check if today's day matches the dayOfMonth prop
  const isToday = dayOfMonth === todayDayOfMonth;

  let bgColor;
  if (isFull) {
    bgColor = "bg-[#FF3B30] text-tertiary1-light"; // Red if full
  } else if (percentageAvailable > 50 && seatsTotal !== 0) {
    bgColor = "bg-[#34C759] text-tertiary1-light"; // Green if many seats available
  } else if (percentageAvailable <= 50 && seatsTotal !== 0) {
    bgColor = "bg-[#ff9500] text-tertiary1-light"; // Yellow if limited
  } else if (isToday && percentageAvailable !== null) {
    bgColor = "bg-primary-active text-tertiary1-light"; // light pink if today
  } else if (seatsTotal === 0) {
    bgColor = "bg-[#ffffff]"; // White if there is no event on this day
  } else {
    bgColor = "bg-[#ffffff]"; // White if nothing else matches
  }

  const calendarItemClass = `
    ${BASE_CALENDARITEM_CLASSES}
    ${bgColor}
      `.trim();

  return (
    <article
      className={`relative h-[7.938rem] w-[12.5rem] bg-white border-tertiary1-light border-[1px] ${isFull ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}`}
      onClick={onClick}
    >
      <div
        className={`${calendarItemClass} 
        ${variant === "limited" && percentageAvailable > 50 ? "opacity-85" : "opacity-100"}`}
      >
        <p className="absolute top-5 left-4">{dayOfMonth}</p>
        {(seatsAvailable > 0 && seatsTotal === 0) ||
        (isToday && icon) ? null : (
          <div className="flex gap-[6px] absolute bottom-2 right-6">
            <img
              src={icon}
              alt="attendants icon"
              className="w-6 h-6 relative bottom-1"
            />
            <p className="text-white">{`Seats: ${seatsAvailable}`}</p>
          </div>
        )}
      </div>
    </article>
  );
};

CalendarItem.propTypes = {
  dayOfMonth: PropTypes.number.isRequired,
  icon: PropTypes.string,
  seatsTaken: PropTypes.number.isRequired,
  seatsTotal: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(["none", "today", "open", "limited", "full"]),
  onClick: PropTypes.func,
};

export default CalendarItem;
