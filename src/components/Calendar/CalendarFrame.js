"use client";
import React from "react";
import { useEvents } from "@/context/EventsContext";
import { useLanguage } from "@/context/LanguageContext";
import { useCalendar } from "@/context/CalendarContext";
import Calendar from "./Calendar";
import CalendarMonthPicker from "./CalendarMonthPicker";
import ColorInfo from "./ColorInfo";

const CalendarFrame = () => {
  const { error, isLoading } = useEvents();
  const { translations } = useLanguage();
  const calendar = useCalendar();

  if (!calendar.selectedMonth || !calendar.selectedYear) {
    return null;
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

      <CalendarMonthPicker />
      <Calendar />
      <ColorInfo />
    </div>
  );
};

export default CalendarFrame;
