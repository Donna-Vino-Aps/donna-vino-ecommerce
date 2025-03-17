import React from "react";
import PropTypes from "prop-types";

const CalendarMonthPicker = ({ currentMonth, currentYear, onMonthChange }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      onMonthChange(12, currentYear - 1); // Move to December of previous year
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      onMonthChange(1, currentYear + 1); // Move to January of next year
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

  return (
    <div className="flex justify-between items-center mx-auto bg-primary-normal w-full h-[5rem] max-w-[calc(7*12.5rem-2px)] rounded-t-[1rem] text-headlineMedium text-center text-tertiary2-light">
      <button onClick={handlePreviousMonth} aria-label="Previous Month">
        <img
          src="/icons/arrow-left-small.svg"
          className="relative top-[2px] left-16"
        />
      </button>
      {months[currentMonth - 1]} {currentYear}
      <button onClick={handleNextMonth} aria-label="Next Month">
        <img
          src="/icons/arrow-right-small.svg"
          className="relative top-[2px] right-16"
        />
      </button>
    </div>
  );
};

CalendarMonthPicker.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired,
};

export default CalendarMonthPicker;
