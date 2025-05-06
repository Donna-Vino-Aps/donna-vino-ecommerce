"use client";

import React from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";
import { useCalendar } from "@/context/CalendarContext";

const CalendarItem = ({
  dayOfMonth,
  index,
  availableSeats = 0,
  totalSeats = 0,
  onClick,
  isOtherMonth,
}) => {
  const { translations } = useLanguage();
  const { selectedMonth: currentMonth, selectedYear: currentYear } =
    useCalendar();
  const isFull = availableSeats === 0 && totalSeats > 0;
  const isLeft = index % 7 === 0; // Check if the item is on the left side of the calendar
  const isRight = (index + 1) % 7 === 0; // Check if the item is on the right side of the calendar
  const percentageAvailable =
    totalSeats > 0 ? (availableSeats / totalSeats) * 100 : undefined;

  const BASE_CALENDARITEM_CLASSES = `
   min-w-[99%] min-h-[2.813rem] md:min-h-[4.813rem] lg:h-[4.926rem] ${(index + 1) % 7 === 0 ? "lg:w-[6.12rem]" : "lg:w-[6.20rem]"} text-labelXLarge font-semibold rounded-tl-[6px] rounded-bl-[20px] md:rounded-tl-[0px] md:rounded-bl-[16px]
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
  } else if (percentageAvailable > 50 && totalSeats !== 0) {
    bgColor = "bg-calendar-open text-tertiary1-light"; // Green if many seats available
  } else if (percentageAvailable <= 50 && totalSeats !== 0) {
    bgColor = "bg-calendar-limited text-tertiary1-light"; // Yellow if limited
  } else if (isToday && percentageAvailable !== null && isCurrentYear) {
    bgColor =
      "bg-primary-active text-tertiary1-light rounded-tl-[0px] rounded-bl-[0px] md:rounded-tl-[0px] md:rounded-bl-[0px] lg:rounded-tl-[0px] lg:rounded-bl-[0px]"; // light pink and square if today
  } else if (totalSeats === 0) {
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
      className={`relative min-h-[2.813rem] min-w-[2.618rem] border-t-[1px] border-tertiary1-light bg-transparent lg:h-[4.976rem] lg:w-[6.282rem] ${!isLeft && !isRight ? "border-r-[1px]" : ""} ${isLeft ? "border-r-[1px]" : ""}  
        ${isFull ? "hover:cursor-not-allowed" : "hover:cursor-pointer"} 
       `}
      onClick={onClick}
    >
      <div
        className={`${calendarItemClass} 
        `}
      >
        <p className="flex justify-center pt-3 text-labelLarge font-medium md:absolute md:left-2 md:h-auto md:pt-[5px] md:text-labelMedium">
          {isToday &&
          isCurrentYear &&
          typeof percentageAvailable === "number" ? (
            <span
              className={`
                inline-flex h-6 w-6 items-center justify-center rounded-full border-2
                ${percentageAvailable <= 50 ? "border-calendar-today_ring" : ""}
                ${percentageAvailable > 50 ? "border-primary-active" : ""}
                relative bottom-[2px] md:bottom-1 md:right-[6px]
              `}
            >
              {dayOfMonth}
            </span>
          ) : (
            dayOfMonth
          )}
        </p>
        {availableSeats >= 0 && totalSeats !== 0 && !isOtherMonth ? (
          <div className="absolute bottom-1 right-2 hidden items-center justify-end md:right-2 md:flex md:gap-[4px]">
            {/* <img
              src={icon}
              alt="attendants icon"
              className="object-center w-4 h-5"
            /> */}
            <p className="text-labelMedium font-medium text-white">{`${translations["calendar.seats"]}: ${availableSeats}`}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
};

CalendarItem.propTypes = {
  dayOfMonth: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  availableSeats: PropTypes.number,
  totalSeats: PropTypes.number,
  onClick: PropTypes.func,
  isOtherMonth: PropTypes.bool,
};

export default CalendarItem;
