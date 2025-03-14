import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import CalendarMonthPicker from "./CalendarMonthPicker";
import DateSelector from "./DateSelector";
import ColorInfo from "./ColorInfo";

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
    <div className="mb-12 flex flex-col items-center">
      <DateSelector />
      <CalendarMonthPicker monthOfYear={currentMonth} />
      <Calendar />
      <ColorInfo />
    </div>
  );
};

export default CalendarFrame;
