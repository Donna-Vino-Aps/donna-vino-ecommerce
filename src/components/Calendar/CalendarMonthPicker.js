"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCalendar } from "@/context/CalendarContext";

const CalendarMonthPicker = () => {
  const { translations } = useLanguage();
  const {
    selectedMonth: currentMonth,
    selectedYear: currentYear,
    onMonthYearChange: onChange,
  } = useCalendar();

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
      onChange(12, currentYear - 1); // Move to December of previous year
    } else {
      onChange(currentMonth - 1, currentYear);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      onChange(1, currentYear + 1); // Move to January of next year
    } else {
      onChange(currentMonth + 1, currentYear);
    }
  };

  return (
    <div className="mx-auto flex h-[3.438rem] w-[calc(100%-2px)] items-center justify-between rounded-t-[0.5rem] bg-primary-active_normal text-center text-titleMedium text-tertiary2-light md:h-[2.25rem] md:max-w-[calc(7*6.282rem-12px)] lg:max-w-[calc(7*6.282rem-2px)] lg:text-titleSmall">
      <button
        onClick={handlePreviousMonth}
        aria-label="Previous Month"
        className="relative left-6 md:left-10 lg:left-20"
      >
        <img src="/icons/arrow-left-small.svg" className="h-4 w-4" />
      </button>
      {months[currentMonth - 1]} {currentYear}
      <button
        onClick={handleNextMonth}
        aria-label="Next Month"
        className="relative right-6 md:right-10 lg:right-20"
      >
        <img src="/icons/arrow-right-small.svg" className="h-4 w-4" />
      </button>
    </div>
  );
};

export default CalendarMonthPicker;
