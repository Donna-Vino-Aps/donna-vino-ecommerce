"use client";

import React, { useState } from "react";
import { useEvents } from "@/context/EventsContext";
import { useLanguage } from "@/context/LanguageContext";
import { format, parseISO } from "date-fns";
import { enUS, da } from "date-fns/locale";
import EventRegistrationModal from "@/components/EventRegistrationModal/EventRegistrationModal";
import EventRow from "./EventRow";

const EventList = () => {
  const { events, isLoading, error } = useEvents();
  const { language, translations } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedEvents = [...events].sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });

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

  const renderLoading = () => (
    <div className="flex flex-col items-center py-10">
      <div className="w-12 h-12 border-4 border-primary-normal border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-primary-normal font-medium">
        {translations["calendar.loading"]}
      </p>
    </div>
  );

  const renderError = () => (
    <p className="text-primary-normal text-center py-8">{error}</p>
  );

  const renderEmptyState = () => (
    <p className="text-center py-8">{translations["events.noEvents"]}</p>
  );

  const renderEventList = () => (
    <>
      <h2 className="text-titleMedium font-medium mb-4 px-4 py-2 bg-[#FFF4F4] rounded-[0.5rem] w-full">
        {translations["events.upcomingTitle"]}
        <span className="font-semibold">April</span>
      </h2>

      <div className="bg-tertiary2-active text-tertiary1-active_dark text-titleMedium font-medium rounded-t p-3 pb-7 flex flex-row ">
        <div className="w-[22%] text-center">
          {translations["events.dateHeader"]}
        </div>
        <div className="w-[56%] text-center">
          {translations["events.detailsHeader"]}
        </div>
        <div className="w-[22%] text-center">
          {translations["events.availableSeatsHeader"]}
        </div>
      </div>

      <div className="w-full bg-tertiary2-active text-tertiary1-active_dark p-2 overflow-y-auto">
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
    if (events.length === 0) return renderEmptyState();
    return renderEventList();
  };

  return (
    <div className="flex flex-col mb-12 mx-auto xl:mx-0 min-w-[37rem] xl:h-[36.5rem] overflow-hidden">
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
