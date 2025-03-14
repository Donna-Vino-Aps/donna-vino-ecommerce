import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import CalendarMonthPicker from "./CalendarMonthPicker";

const CalendarFrame = () => {
  const [currentMonth, setCurrentMonth] = useState(null);

  useEffect(() => {
    const month = new Date().getMonth() + 1; // Get the current month (1-12)
    setCurrentMonth(month); // Set month after component mounts
  }, []); // ensures this runs only once, after the first render

  if (currentMonth === null) {
    return null; // You can optionally render a loading state here while the month is being set
  }

  return (
    <div className="mb-12">
      <CalendarMonthPicker monthOfYear={currentMonth} />
      <Calendar />
    </div>
  );
};

export default CalendarFrame;
