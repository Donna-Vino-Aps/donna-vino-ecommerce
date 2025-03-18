import React from "react";
import PropTypes from "prop-types";
import CalendarItem from "./CalendarItem";
import { useLanguage } from "@/context/LanguageContext";

const Calendar = ({ currentYear, currentMonth }) => {
  const { translations } = useLanguage();
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

  // const randomSeatsTaken = calendarDaysCurrentMonth.map(() =>
  //   Math.floor(Math.random() * 20),
  // );

  const randomSeatsTotal = [
    0, 0, 0, 0, 0, 20, 20, 0, 0, 20, 0, 0, 0, 0, 20, 0, 20, 20, 20, 20, 0, 0, 0,
    0, 20, 20, 0, 0, 0, 0, 20,
  ];

  randomSeatsTotal.slice(0, calendarDaysCurrentMonth.length);

  const weekdayStyle =
    "flex bg-primary-normal h-16 justify-center items-center text-titleLarge text-tertiary2-light";

  return (
    <section className="grid grid-cols-7 grid-row-5 gap-0 justify-center w-full max-w-[calc(7*12.5rem)] mx-auto border-b-tertiary1-light border-[1px]">
      <div className={weekdayStyle}>{translations["calendar.weekday.1"]}</div>
      <div className={weekdayStyle}>{translations["calendar.weekday.2"]}</div>
      <div className={weekdayStyle}>{translations["calendar.weekday.3"]}</div>
      <div className={weekdayStyle}>{translations["calendar.weekday.4"]}</div>
      <div className={weekdayStyle}>{translations["calendar.weekday.5"]}</div>
      <div className={weekdayStyle}>{translations["calendar.weekday.6"]}</div>
      <div className={weekdayStyle}>{translations["calendar.weekday.7"]}</div>
      {calendarDaysCurrentMonth.map((day, index) => (
        <CalendarItem
          key={index}
          dayOfMonth={day.dayOfMonth}
          icon="./icons/users-2.svg"
          seatsTaken={day ? Math.floor(Math.random() * 20 + 1) : 0} // Set `0` if `null`
          seatsTotal={day ? randomSeatsTotal[day.dayOfMonth - 1] : 0} // Avoid index errors
          isOtherMonth={day.isOtherMonth}
          currentMonth={currentMonth}
        />
      ))}
    </section>
  );
};

Calendar.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
};

export default Calendar;
