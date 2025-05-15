"use client";
import React, { useState, useEffect } from "react";
import CalendarItem from "./CalendarItem";
import { useLanguage } from "@/context/LanguageContext";
import { useCalendar } from "@/context/CalendarContext";
import PropTypes from "prop-types";

const Calendar = ({ events, onEventClick }) => {
  const { selectedMonth: currentMonth, selectedYear: currentYear } =
    useCalendar();
  const { translations } = useLanguage();

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to get an event for a specific day
  const getEventForDay = (day, month, year) => {
    if (!events || events.length === 0) return null;

    // Format the date to match event.date format (YYYY-MM-DD)
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    // Get todays date in the same format (YYYY-MM-DD)
    const todayStr = new Date().toISOString().slice(0, 10);

    if (dateStr < todayStr) {
      return null; // Return null if the date is in the past
    }

    return events.find((event) => event.date === dateStr) || null;
  };

  const generateCalendarDays = (month, year) => {
    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
    const totalDaysInMonth = daysInMonth(month, year);
    const firstWeekdayOfMonth = new Date(year, month - 1, 1).getDay(); // 0 = sunday, 1 = monday etc...
    const adjustedFirstDay = (firstWeekdayOfMonth + 6) % 7; // 0 = monday, 1 = tuesday etc...

    // **PREVIOUS MONTH DAYS**
    const prevMonthDays = [];
    const prevMonthTotalDays = daysInMonth(month - 1, year);

    for (
      let i = prevMonthTotalDays - adjustedFirstDay + 1;
      i <= prevMonthTotalDays;
      i++
    ) {
      prevMonthDays.push({
        dayOfMonth: i,
        isOtherMonth: true, // Mark as from previous month
      });
    }

    // **CURRENT MONTH DAYS**
    const currentMonthDays = Array.from(
      { length: totalDaysInMonth },
      (_, i) => ({
        dayOfMonth: i + 1,
        isOtherMonth: false, // Mark as from the current month
      }),
    );

    // **NEXT MONTH DAYS** (fill until 35 or 42)
    let nextMonthDays = [];
    while (
      prevMonthDays.length + currentMonthDays.length + nextMonthDays.length <
      35
    ) {
      nextMonthDays.push({
        dayOfMonth: nextMonthDays.length + 1,
        isOtherMonth: true, // Mark as from next month
      });
    }

    if (
      prevMonthDays.length + currentMonthDays.length + nextMonthDays.length >
        35 &&
      prevMonthDays.length + currentMonthDays.length + nextMonthDays.length < 42
    ) {
      while (
        prevMonthDays.length + currentMonthDays.length + nextMonthDays.length <
        42
      ) {
        nextMonthDays.push({
          dayOfMonth: nextMonthDays.length + 1,
          isOtherMonth: true, // Mark as from next month
        });
      }
    }

    let calendarDays = [
      ...prevMonthDays,
      ...currentMonthDays,
      ...nextMonthDays,
    ];

    return calendarDays;
  };

  const calendarDaysCurrentMonth = generateCalendarDays(
    currentMonth,
    currentYear,
  );

  const weekdayStyle =
    "flex bg-primary-normal h-11 md:h-4 w-full justify-center items-center text-labelLarge md:text-labelMedium text-tertiary2-light";

  return (
    <section className="mx-auto grid w-full auto-rows-fr grid-cols-7 justify-center rounded-b-lg border-[1px] border-b-tertiary1-light [grid-template-rows:auto_repeat(5,minmax(0,1fr))] md:max-w-[calc(7*6.282rem-10px)] lg:max-w-[calc(7*6.282rem-2px)]">
      {[...Array(7)].map((_, i) => (
        <div key={i} className={weekdayStyle}>
          {isMobile
            ? translations[`calendar.weekday.${i + 1}-short`]
            : translations[`calendar.weekday.${i + 1}`]}
        </div>
      ))}
      {calendarDaysCurrentMonth.map((day, index) => {
        // Get event for this day
        const event = !day.isOtherMonth
          ? getEventForDay(day.dayOfMonth, currentMonth, currentYear)
          : null;

        return (
          <CalendarItem
            key={index}
            dayOfMonth={day.dayOfMonth}
            index={index}
            availableSeats={event ? event.availableSeats : 0}
            totalSeats={event ? event.totalSeats : 0}
            isOtherMonth={day.isOtherMonth}
            hasEvents={!!event}
            onClick={() => event && onEventClick(event)}
          />
        );
      })}
    </section>
  );
};

Calendar.propTypes = {
  events: PropTypes.array.isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default Calendar;
