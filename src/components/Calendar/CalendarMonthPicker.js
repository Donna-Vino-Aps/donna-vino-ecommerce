import React from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";

const CalendarMonthPicker = ({ currentMonth, currentYear, onMonthChange }) => {
  const { translations } = useLanguage();
  const months = [
    translations["calendar.month.1"],
    translations["calendar.month.2"],
    translations["calendar.month.3"],
    translations["calendar.month.4"],
    translations["calendar.month.5"],
    translations["calendar.month.6"],
    translations["calendar.month.7"],
    translations["calendar.month.8"],
    translations["calendar.month.9"],
    translations["calendar.month.10"],
    translations["calendar.month.11"],
    translations["calendar.month.12"],
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
    <div className="flex justify-between items-center mx-auto bg-primary-active_normal w-full h-[3.438rem] md:h-[2.25rem] md:max-w-[calc(7*6.22rem-10px)] lg:md:max-w-[calc(7*6.22rem-2px)] rounded-t-[0.5rem] text-titleMedium lg:text-titleSmall text-center text-tertiary2-light">
      <button
        onClick={handlePreviousMonth}
        aria-label="Previous Month"
        className="relative left-6 md:left-10 lg:left-18"
      >
        <img src="/icons/arrow-left-small.svg" className="w-4 h-4" />
      </button>
      {months[currentMonth - 1]} {currentYear}
      <button
        onClick={handleNextMonth}
        aria-label="Next Month"
        className="relative right-6 md:right-10 lg:right-18"
      >
        <img src="/icons/arrow-right-small.svg" className="w-4 h-4" />
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
