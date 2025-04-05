import React, { useState, useEffect } from "react";
import { useEvents } from "@/context/EventsContext";
import Calendar from "./Calendar";
import CalendarMonthPicker from "./CalendarMonthPicker";
import DateSelector from "./DateSelector";
import ColorInfo from "./ColorInfo";

const CalendarFrame = () => {
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const { error } = useEvents();

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
    <div className="mb-12 flex flex-col items-center mx-10 md:mx-2 lg:mx-4">
      {error && (
        <div className="text-primary-normal text-center">
          <p>Error loading events: {error}</p>
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
