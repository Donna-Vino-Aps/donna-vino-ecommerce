"use client";

import React from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";
import { useCalendar } from "@/context/CalendarContext";
import { getSeatStatus } from "@/utils/eventUtils";

const CalendarItem = ({
  dayOfMonth,
  index,
  availableSeats = 0,
  totalSeats = 0,
  onClick,
  isOtherMonth,
  hasEvents = false,
}) => {
  const { translations } = useLanguage();
  const { selectedMonth: currentMonth, selectedYear: currentYear } =
    useCalendar();

  // Get today's date
  const today = new Date();
  const todayDayOfMonth = today.getDate(); // Get the day of the month (1-31)
  const todayMonth = today.getMonth();

  // Check if today's day matches the dayOfMonth and currentMonth prop
  const isToday =
    dayOfMonth === todayDayOfMonth && currentMonth === todayMonth + 1;

  // Check if the calendar item is rendered in the current year or not
  const isCurrentYear = currentYear === today.getFullYear(); // Get the current year

  const isLeft = index % 7 === 0; // Check if the item is on the left side of the calendar
  const isRight = (index + 1) % 7 === 0; // Check if the item is on the right side of the calendar

  const BASE_CALENDARITEM_CLASSES = `
   min-w-[99%] min-h-[2.813rem] md:min-h-[4.813rem] lg:h-[4.926rem] ${(index + 1) % 7 === 0 ? "lg:w-[6.12rem]" : "lg:w-[6.20rem]"} text-labelXLarge font-semibold
`;

  let styleClasses = "";
  let cornerStyle =
    "rounded-tl-[6px] rounded-bl-[20px] md:rounded-tl-[0px] md:rounded-bl-[16px]";

  if (isOtherMonth) {
    styleClasses = "bg-transparent text-tertiary1-active hover:cursor-default";
  } else if (isToday && isCurrentYear && totalSeats === 0) {
    styleClasses = "bg-primary-active text-tertiary1-light"; // Pink if today without an event
    cornerStyle = ""; // No rounded corners
  } else if (hasEvents) {
    const { bgColor, textColor } = getSeatStatus(
      availableSeats,
      totalSeats,
      "calendar",
    );
    const cursorStyle =
      availableSeats === 0
        ? "hover:cursor-not-allowed"
        : "hover:cursor-pointer";
    styleClasses = `${bgColor} ${textColor} ${cursorStyle}`;
  } else {
    styleClasses = "bg-transparent text-tertiary1-dark hover:cursor-default"; // Default styling for non-event days
  }

  const calendarItemClass = `
    ${BASE_CALENDARITEM_CLASSES}
    ${styleClasses}
    ${cornerStyle}
      `.trim();

  const handleClick = () => {
    if (hasEvents && availableSeats > 0 && onClick) {
      onClick();
    }
  };

  return (
    <article
      className={`relative min-h-[2.813rem] min-w-[2.618rem] border-t-[1px] border-tertiary1-light bg-transparent lg:h-[4.976rem] lg:w-[6.282rem] ${!isLeft && !isRight ? "border-r-[1px]" : ""} ${isLeft ? "border-r-[1px]" : ""}`}
      onClick={handleClick}
    >
      <div
        className={`${calendarItemClass} 
        `}
      >
        <p className="flex justify-center pt-3 text-labelLarge font-medium md:absolute md:left-2 md:h-auto md:pt-[5px] md:text-labelMedium">
          {isToday && isCurrentYear && totalSeats > 0 ? (
            <span className="relative bottom-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary-active md:bottom-1 md:right-[6px]">
              {dayOfMonth}
            </span>
          ) : (
            dayOfMonth
          )}
        </p>
        {availableSeats >= 0 && totalSeats !== 0 && !isOtherMonth ? (
          <div className="absolute bottom-1 right-2 hidden items-center justify-end md:right-2 md:flex md:gap-[4px]">
            <p className="text-labelMedium font-medium text-tertiary1-light">{`${translations["calendar.seats"]}: ${availableSeats}`}</p>
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
  hasEvents: PropTypes.bool,
};

export default CalendarItem;
