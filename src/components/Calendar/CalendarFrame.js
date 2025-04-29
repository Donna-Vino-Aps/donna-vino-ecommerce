import React, { useState, useEffect } from "react";
import { useEvents } from "@/context/EventsContext";
import { useLanguage } from "@/context/LanguageContext";
import Calendar from "./Calendar";
import CalendarMonthPicker from "./CalendarMonthPicker";
import DateSelector from "./DateSelector";
import ColorInfo from "./ColorInfo";

const CalendarFrame = () => {
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const { error, isLoading } = useEvents();
  const { translations } = useLanguage();

  const handleMonthChange = (newMonth, newYear) => {
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  useEffect(() => {
    const month = new Date().getMonth() + 1; // Get the current month (1-12)
    setCurrentMonth(month); // Set month after component mounts
    const year = new Date().getFullYear(); // Get the current year
    setCurrentYear(year); // Set year after component mounts
  }, []); // ensures this runs only once, after the first render

  if (currentMonth === null) {
    return null; // You can optionally render a loading state here while the month is being set
  }

  return (
    <div className="relative mx-10 mb-12 flex flex-col items-center md:mx-2 lg:mx-4">
      {error && (
        <div className="mb-4 text-center text-primary-normal">
          <p>{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white bg-opacity-70">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-normal border-t-transparent"></div>
            <p className="mt-4 font-medium text-primary-normal">
              {translations["calendar.loading"]}
            </p>
          </div>
        </div>
      )}

      <DateSelector
        currentMonth={currentMonth}
        currentYear={currentYear}
        onMonthChange={handleMonthChange}
      />
      <CalendarMonthPicker
        currentMonth={currentMonth}
        currentYear={currentYear}
        onMonthChange={handleMonthChange}
      />
      <Calendar currentYear={currentYear} currentMonth={currentMonth} />
      <ColorInfo />
    </div>
  );
};

export default CalendarFrame;
