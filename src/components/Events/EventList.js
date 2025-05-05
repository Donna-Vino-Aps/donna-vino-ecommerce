"use client";

import React, { useState, useMemo } from "react";
import { useEvents } from "@/context/EventsContext";
import { useLanguage } from "@/context/LanguageContext";
import { useCalendar } from "@/context/CalendarContext";
import { format, parseISO } from "date-fns";
import { enUS, da } from "date-fns/locale";
import EventRegistrationModal from "@/components/EventRegistrationModal/EventRegistrationModal";
import EventRow from "./EventRow";

const EventList = () => {
  const { events, isLoading, error } = useEvents();
  const { language, translations } = useLanguage();
  const { selectedMonth, selectedYear } = useCalendar();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    if (!selectedMonth || !selectedYear) {
      return [];
    }

    return events.filter((event) => {
      if (!event.date) return false;

      const eventDate = new Date(event.date);
      const eventMonth = eventDate.getMonth() + 1;
      const eventYear = eventDate.getFullYear();

      return eventMonth === selectedMonth && eventYear === selectedYear;
    });
  }, [events, selectedMonth, selectedYear]);

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });
  }, [filteredEvents]);

  const getLocale = () => {
    switch (language) {
      case "dk":
        return da;
      case "en":
      default:
        return enUS;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = parseISO(dateString);
      return format(date, "dd/MM");
    } catch (error) {
      console.error("Error formatting date:", error.message);
      return String(dateString);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    try {
      if (timeString instanceof Date) {
        const formatString = language === "dk" ? "HH:mm" : "h:mm aaa";
        return format(timeString, formatString, { locale: getLocale() });
      }
      return String(timeString);
    } catch (error) {
      console.error("Error formatting time:", error.message);
      return String(timeString);
    }
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const getSeatStatus = (availableSeats, totalInventory) => {
    const isFull = availableSeats === 0 && totalInventory > 0;
    const percentageAvailable =
      totalInventory > 0 ? (availableSeats / totalInventory) * 100 : 0;

    if (isFull) {
      return {
        bgColor: "bg-calendar-full_light",
        textColor: "text-calendar-full",
        borderColor: "border-calendar-full",
      };
    } else if (percentageAvailable <= 50 && totalInventory !== 0) {
      return {
        bgColor: "bg-calendar-limited_light",
        textColor: "text-calendar-limited",
        borderColor: "border-calendar-limited",
      };
    } else {
      return {
        bgColor: "bg-calendar-open_light",
        textColor: "text-calendar-open_dark",
        borderColor: "border-calendar-open",
      };
    }
  };

  const renderMonthHeader = () => (
    <h2 className="mb-4 flex w-full items-baseline gap-1 rounded-[0.5rem] bg-[#FFF4F4] px-4 py-2 text-titleMedium font-medium">
      <span>{translations["events.upcomingTitle"]}</span>
      <span className="font-semibold">
        {format(new Date(selectedYear, selectedMonth - 1, 1), "MMMM", {
          locale: getLocale(),
        })}
      </span>
    </h2>
  );

  const renderLoading = () => (
    <div className="flex flex-col items-center py-10">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-normal border-t-transparent"></div>
      <p className="mt-4 font-medium text-primary-normal">
        {translations["calendar.loading"]}
      </p>
    </div>
  );

  const renderError = () => (
    <p className="py-8 text-center text-primary-normal">{error}</p>
  );

  const renderEmptyState = () => (
    <>
      {renderMonthHeader()}
      <p className="py-8 text-center">
        {translations["events.noEventsForMonth"]}
      </p>
    </>
  );

  const renderEventList = () => (
    <>
      {renderMonthHeader()}

      <div className="flex flex-row gap-2 rounded-t bg-tertiary2-active p-3 pb-7 text-titleMedium font-medium text-tertiary1-active_dark">
        <p className="w-[22%] text-center">
          {translations["events.dateHeader"]}
        </p>
        <p className="w-[56%] text-center">
          {translations["events.detailsHeader"]}
        </p>
        <p className="w-[22%] text-center">
          {translations["events.availableSeatsHeader"]}
        </p>
      </div>

      <div className="w-full overflow-y-auto rounded-b bg-tertiary2-active p-2 text-tertiary1-active_dark ">
        {sortedEvents.map((event) => {
          const formattedDate = formatDate(event.date);
          const formattedTimeStart = formatTime(event.timeStart);
          const formattedTimeEnd = formatTime(event.timeEnd);
          const seatStatus = getSeatStatus(
            event.availableSeats,
            event.totalInventory,
          );

          return (
            <EventRow
              key={event.id}
              event={event}
              formattedDate={formattedDate}
              formattedTimeStart={formattedTimeStart}
              formattedTimeEnd={formattedTimeEnd}
              seatStatus={seatStatus}
              showModal={handleOpenModal}
            />
          );
        })}
      </div>
    </>
  );

  const renderContent = () => {
    if (isLoading) return renderLoading();
    if (error) return renderError();
    if (sortedEvents.length === 0) return renderEmptyState();
    return renderEventList();
  };

  return (
    <div className="mx-auto mb-12 flex flex-col overflow-hidden sm:min-w-[37rem] xl:mx-0 xl:h-[31rem]">
      {renderContent()}

      {selectedEvent && (
        <EventRegistrationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default EventList;
