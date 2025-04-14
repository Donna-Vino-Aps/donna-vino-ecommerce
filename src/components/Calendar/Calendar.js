import React, { useState } from "react";
import PropTypes from "prop-types";
import CalendarItem from "./CalendarItem";
import { useLanguage } from "@/context/LanguageContext";
import { useEvents } from "@/context/EventsContext";
import EventRegistrationModal from "../EventRegistrationModal/EventRegistrationModal";

const Calendar = ({ currentYear, currentMonth }) => {
  const { events } = useEvents();

  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.innerWidth < 1024,
  );
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { translations } = useLanguage();

  // Function to get an event for a specific day
  const getEventForDay = (day, month, year) => {
    if (!events || events.length === 0) return [];

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
    "flex bg-primary-normal h-11 lg:h-16 justify-center items-center text-labelLarge md:text-titleMedium lg:text-labelLarge text-tertiary2-light";

  return (
    <section className="grid grid-cols-7 grid-row-5 justify-center w-full md:max-w-[calc(7*6.22rem-8px)] lg:md:max-w-[calc(7*6.22rem)] mx-auto border-b-tertiary1-light border-[1px] rounded-b-lg">
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
            icon="./icons/users-2.svg"
            availableSeats={event ? event.availableSeats : 0}
            totalInventory={event ? event.totalInventory : 0}
            isOtherMonth={day.isOtherMonth}
            currentMonth={currentMonth}
            hasEvents={!!event}
            onClick={() => event && handleOpenModal(event)}
          />
        );
      })}
      {selectedEvent && (
        <EventRegistrationModal
          onClose={handleCloseModal}
          isOpen={isModalOpen}
          event={selectedEvent}
        />
      )}
    </section>
  );
};

Calendar.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
};

export default Calendar;
