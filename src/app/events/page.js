"use client";

import React, { useState } from "react";
import CalendarFrame from "@/components/Calendar/CalendarFrame";
import EventsHeader from "@/components/Events/EventsHeader";
import { EventsProvider } from "@/context/EventsContext";
import { CalendarProvider } from "@/context/CalendarContext";
import EventList from "@/components/Events/EventList";
import EventContent from "@/components/Events/EventContent";
import EventModal from "@/components/EventModal/EventModal";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <EventsProvider>
      <CalendarProvider>
        <EventsHeader />
        <EventContent>
          {({ processedEvents }) => (
            <>
              <section className="flex flex-col justify-center xl:flex-row xl:gap-8">
                <CalendarFrame
                  events={processedEvents}
                  onEventClick={handleOpenModal}
                />
                <EventList
                  events={processedEvents}
                  onEventClick={handleOpenModal}
                />
              </section>

              {selectedEvent && (
                <EventModal
                  event={selectedEvent}
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                />
              )}
            </>
          )}
        </EventContent>
      </CalendarProvider>
    </EventsProvider>
  );
};

export default Events;
