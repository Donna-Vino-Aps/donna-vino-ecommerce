"use client";

import React from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";

const CalendarItem = ({
  dayOfMonth,
  icon,
  index,
  availableSeats = 0,
  totalInventory = 0,
  onClick,
  isOtherMonth,
  currentMonth,
  currentYear,
}) => {
  const { translations } = useLanguage();
  const isFull = availableSeats === 0 && totalInventory > 0;
  const percentageAvailable =
    totalInventory > 0 ? (availableSeats / totalInventory) * 100 : 0;

  const BASE_CALENDARITEM_CLASSES = `
   min-w-[2.818rem] min-h-[2.813rem] md:min-h-[4.813rem] lg:h-[4.926rem] ${(index + 1) % 7 === 0 ? "lg:w-[6.12rem]" : "lg:w-[6.20rem]"} text-labelXLarge font-semibold rounded-tl-[6px] rounded-bl-[20px] md:rounded-tl-[12px] md:rounded-bl-[40px] lg:rounded-tl-[6px] lg:rounded-bl-[24px]
`;

  // Get today's date
  const today = new Date();
  const todayDayOfMonth = today.getDate(); // Get the day of the month (1-31)
  const todayMonth = today.getMonth();

  // Check if today's day matches the dayOfMonth and currentMonth prop
  const isToday =
    dayOfMonth === todayDayOfMonth && currentMonth === todayMonth + 1;

  // Check if the calendar item is rendered in the current year or not
  const isCurrentYear = currentYear === today.getFullYear(); // Get the current year

  let bgColor;
  if (isOtherMonth) {
    bgColor = "bg-transparent text-tertiary1-active hover:cursor-default";
  } else if (isFull) {
    bgColor = "bg-calendar-full text-tertiary1-light"; // Red if full
  } else if (percentageAvailable > 50 && totalInventory !== 0) {
    bgColor = "bg-calendar-open text-tertiary1-light"; // Green if many seats available
  } else if (percentageAvailable <= 50 && totalInventory !== 0) {
    bgColor = "bg-calendar-limited text-tertiary1-light"; // Yellow if limited
  } else if (isToday && percentageAvailable !== null && isCurrentYear) {
    bgColor =
      "bg-primary-active text-tertiary1-light rounded-tl-[0px] rounded-bl-[0px] md:rounded-tl-[0px] md:rounded-bl-[0px] lg:rounded-tl-[0px] lg:rounded-bl-[0px]"; // light pink and square if today
  } else if (totalInventory === 0) {
    bgColor = "bg-transparent hover:cursor-default"; // White if there is no event on this day
  } else {
    bgColor = "bg-transparent hover:cursor-default"; // White if nothing else matches
  }

  const calendarItemClass = `
    ${BASE_CALENDARITEM_CLASSES}
    ${bgColor}
      `.trim();

  return (
    <article
      className={`relative min-w-[2.818rem] min-h-[2.813rem] lg:h-[4.976rem] lg:w-[6.22rem] bg-transparent border-tertiary1-light border-t-[1px] border-x-[1px] 
        ${isFull ? "hover:cursor-not-allowed" : "hover:cursor-pointer"} 
       `}
      onClick={onClick}
    >
      <div
        className={`${calendarItemClass} 
        `}
      >
        <p className="flex justify-center pt-3 md:h-auto md:absolute md:left-4 md:pt-4 text-labelLarge">
          {isToday && isCurrentYear ? (
            <span
              className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 ${percentageAvailable <= 50 && percentageAvailable !== null ? "border-calendar-today_ring" : "border-primary-active"}  relative right-[6px]`}
            >
              {dayOfMonth}
            </span>
          ) : (
            dayOfMonth
          )}
        </p>
        {availableSeats >= 0 && totalInventory !== 0 && !isOtherMonth ? (
          <div className="justify-end items-center md:gap-[4px] absolute bottom-3 right-2 md:right-1 hidden md:flex">
            <img
              src={icon}
              alt="attendants icon"
              className="object-center w-4 h-5"
            />
            <p className="text-white text-labelMedium">{`${translations["calendar.seats"]}: ${availableSeats}`}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
};

CalendarItem.propTypes = {
  dayOfMonth: PropTypes.number.isRequired,
  icon: PropTypes.string,
  index: PropTypes.number.isRequired,
  availableSeats: PropTypes.number,
  totalInventory: PropTypes.number,
  onClick: PropTypes.func,
  isOtherMonth: PropTypes.bool,
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
};

export default CalendarItem;
