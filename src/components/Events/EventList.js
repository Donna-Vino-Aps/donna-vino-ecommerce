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
        text: translations["events.seatStatus.full"] || "Full",
      };
    } else if (percentageAvailable <= 50 && totalInventory !== 0) {
      return {
        bgColor: "bg-calendar-limited_light",
        textColor: "text-calendar-limited",
        text: translations["events.seatStatus.limited"] || "Limited",
      };
    } else {
      return {
        bgColor: "bg-calendar-open_light",
        textColor: "text-calendar-open_dark",
        text: translations["events.seatStatus.available"] || "Available",
      };
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary-normal border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-primary-normal font-medium">
            {translations["calendar.loading"]}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-primary-normal text-center py-8">
        <p>{error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p>
          {translations["events.noEvents"] || "No upcoming events available."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mb-12 px-4">
      <h2 className="text-titleLarge font-medium mb-4">
        {translations["events.upcomingTitle"] ||
          "Upcoming wine tasting events:"}{" "}
        {language === "en" ? "April" : "april"}
      </h2>

      <div className="mb-6 bg-primary-normal text-tertiary2-light rounded-t p-3 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="font-medium">
          {translations["events.dateHeader"] || "Date"}
        </div>
        <div className="font-medium md:col-span-2">
          {translations["events.detailsHeader"] || "Details"}
        </div>
        <div className="font-medium text-center">
          {translations["events.availableSeatsHeader"] || "Available seats"}
        </div>
      </div>

      <div className="w-full">
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
              onBookClick={handleOpenModal}
            />
          );
        })}
      </div>

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
