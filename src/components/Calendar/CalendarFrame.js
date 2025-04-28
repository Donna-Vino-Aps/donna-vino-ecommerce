import React, { useState, useEffect } from "react";
import { useEvents } from "@/context/EventsContext";
import { useLanguage } from "@/context/LanguageContext";
import Calendar from "./Calendar";
import CalendarMonthPicker from "./CalendarMonthPicker";
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
    <div className="mb-12 flex flex-col items-center mx-10 md:mx-2 lg:mx-4 relative">
      {error && (
        <div className="text-primary-normal text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-primary-normal border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-primary-normal font-medium">
              {translations["calendar.loading"]}
            </p>
          </div>
        </div>
      )}

      <CalendarMonthPicker />
      <Calendar />
      <ColorInfo />
    </div>
  );
};

export default CalendarFrame;
