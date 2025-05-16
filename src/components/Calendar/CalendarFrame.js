"use client";

import React from "react";
import PropTypes from "prop-types";
import { useCalendar } from "@/context/CalendarContext";
import Calendar from "./Calendar";
import CalendarMonthPicker from "./CalendarMonthPicker";
import ColorInfo from "./ColorInfo";

const CalendarFrame = ({ events, onEventClick }) => {
  const calendar = useCalendar();

  if (!calendar.selectedMonth || !calendar.selectedYear) {
    return null;
  }

  return (
    <div className="relative mx-10 mb-12 flex flex-col items-center md:mx-2 lg:mx-4">
      <CalendarMonthPicker />
      <Calendar events={events} onEventClick={onEventClick} />
      <ColorInfo />
    </div>
  );
};

CalendarFrame.propTypes = {
  events: PropTypes.array.isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default CalendarFrame;
