"use client";

import React from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";

const BASE_CALENDARITEM_CLASSES = `
   min-w-[2.818rem] min-h-[2.813rem] md:min-h-[4.813rem] lg:h-[7.9rem] lg:w-[12.45rem] text-labelXLarge font-semibold
`;

const CalendarItem = ({
  dayOfMonth,
  icon,
  seatsTaken = 0,
  seatsTotal = 0,
  onClick,
  isOtherMonth,
  currentMonth,
}) => {
  const { translations } = useLanguage();
  const seatsAvailable = seatsTotal - seatsTaken;
  const isFull = seatsAvailable === 0 && seatsTotal > 0;
  const percentageAvailable = (seatsAvailable / seatsTotal) * 100;

  // Get today's date
  const today = new Date();
  const todayDayOfMonth = today.getDate(); // Get the day of the month (1-31)
  const todayMonth = today.getMonth();

  // Check if today's day matches the dayOfMonth and currentMonth prop
  const isToday =
    dayOfMonth === todayDayOfMonth && currentMonth === todayMonth + 1;

  // Check if the calendar item is rendered in the current month

  let bgColor;
  if (isOtherMonth) {
    bgColor = "bg-[#ffffff] text-tertiary1-active";
  } else if (isFull) {
    bgColor = "bg-[#FF3B30] text-tertiary1-light"; // Red if full
  } else if (isToday && percentageAvailable !== null) {
    bgColor = "bg-primary-active text-tertiary1-light"; // light pink if today
  } else if (percentageAvailable > 50 && seatsTotal !== 0) {
    bgColor = "bg-[#34C759] text-tertiary1-light"; // Green if many seats available
  } else if (percentageAvailable <= 50 && seatsTotal !== 0) {
    bgColor = "bg-[#ff9500] text-tertiary1-light"; // Yellow if limited
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
      className={`relative min-w-[2.818rem] min-h-[2.813rem] lg:h-[7.938rem] lg:w-[12.5rem] bg-white ${seatsTotal === 0 ? "hover:cursor-default" : "hover:cursor-pointer"} ${isFull ? "hover:cursor-not-allowed" : "hover:cursor-pointer"} ${isToday && seatsTotal && !isOtherMonth > 0 ? `border-[#34C759] border-[2px]` : "border-tertiary1-light border-t-[1px] border-x"}`}
      onClick={onClick}
    >
      <div
        className={`${calendarItemClass} 
        ${!isToday ? "rounded-tl-[6px] rounded-bl-[20px] md:rounded-tl-[12px] md:rounded-bl-[40px] lg:rounded-tl-[16px] lg:rounded-bl-[62.5px]" : ""}
        `}
      >
        <p className="flex justify-center pt-3 md:pt-7 lg:pt-0 lg:h-auto lg:absolute lg:top-5 lg:left-4">
          {dayOfMonth}
        </p>
        {seatsAvailable > 0 && seatsTotal === 0 ? null : (
          <div className="flex justify-end items-center lg:gap-[4px] xl:gap-[6px] absolute bottom-3 lg:right-14 xl:right-6 hidden lg:flex">
            <img
              src={icon}
              alt="attendants icon"
              className="object-center lg:w-5 lg:h-5 xl:w-6 xl:h-6 relative bottom-1"
            />
            <p className="text-white lg:relative lg:bottom-[2px] lg:text-labelLarge xl:text-labelXLarge">{`${translations["calendar.seats"]}: ${seatsAvailable}`}</p>
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
  onClick: PropTypes.func,
  isOtherMonth: PropTypes.bool,
  currentMonth: PropTypes.number,
};

export default CalendarItem;
