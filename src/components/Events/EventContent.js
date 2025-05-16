"use client";

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useEvents } from "@/context/EventsContext";
import { useLanguage } from "@/context/LanguageContext";
import { useCalendar } from "@/context/CalendarContext";
import { formatDate, formatTime } from "@/utils/dateTimeFormatting";
import {
  filterEventsByMonth,
  sortEventsByDate,
  getSeatStatus,
} from "@/utils/eventUtils";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";

const EventContent = ({ children }) => {
  const { events, isLoading, error } = useEvents();
  const { language } = useLanguage();
  const { selectedMonth, selectedYear } = useCalendar();

  const processedEvents = useMemo(() => {
    const filteredEvents = filterEventsByMonth(
      events,
      selectedMonth,
      selectedYear,
    );
    const sortedEvents = sortEventsByDate(filteredEvents);

    return sortedEvents.map((event) => {
      const updatedEvent = {
        ...event,
        formattedDate: formatDate(event.date, language, "dd/MM"),
        formattedDateFull: formatDate(event.date, language),
        formattedTimeStart: formatTime(event.timeStart, language),
        formattedTimeEnd: formatTime(event.timeEnd, language),
        seatStatus: getSeatStatus(
          event.availableSeats,
          event.totalSeats,
          "list",
        ),
      };
      return updatedEvent;
    });
  }, [events, selectedMonth, selectedYear, language]);

  if (isLoading) {
    return (
      <div className="flex min-h-[25rem] items-center justify-center">
        <Spinner size="medium" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} className="my-8" />;
  }

  return children({
    processedEvents,
  });
};

EventContent.propTypes = {
  children: PropTypes.func.isRequired,
};

export default EventContent;
