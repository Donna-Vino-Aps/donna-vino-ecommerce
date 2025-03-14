"use client";

import React from "react";
import PropTypes from "prop-types";

const BASE_CALENDARITEM_CLASSES = `
   h-[7.938rem] w-[12.5rem] text-labelXLarge font-semibold rounded-tl-[16px] rounded-bl-[62.5px]
`;

const VARIANT_CLASSES = {
  none: "bg-white",
  today: "bg-primary-light_active",
  open: "bg-[#34C759]",
  limited: "bg-[#ff9500]",
  full: "bg-[#FF3B30]",
};

const CalendarItem = ({
  dayOfMonth,
  icon,
  seatsAvailable,
  seatsTotal,
  variant = "none",
  onClick,
}) => {
  const isFull = seatsAvailable === 0;
  const percentageAvailable = (seatsAvailable / seatsTotal) * 100;

  const calendarItemClass = `
    ${BASE_CALENDARITEM_CLASSES}
    ${VARIANT_CLASSES[variant] || ""}
  `.trim();

  return (
    <article
      className={`relative h-[7.938rem] w-[12.5rem] bg-white ${isFull ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}`}
      onClick={onClick}
    >
      <div
        className={`${calendarItemClass} 
        ${variant === "limited" && percentageAvailable > 50 ? "opacity-85" : "opacity-100"}`}
      >
        <p className="absolute top-2 left-2">{dayOfMonth}</p>
        <div className="absolute bottom-2 left-6">
          {icon && <img src={icon} alt="attendants icon" className="w-4 h-4" />}
          <p>{`Seats: ${seatsAvailable}`}</p>
        </div>
      </div>
    </article>
  );
};

CalendarItem.propTypes = {
  dayOfMonth: PropTypes.number.isRequired,
  icon: PropTypes.string,
  seatsAvailable: PropTypes.number.isRequired,
  seatsTotal: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(["none", "today", "open", "limited", "full"]),
  onClick: PropTypes.func,
};

export default CalendarItem;
