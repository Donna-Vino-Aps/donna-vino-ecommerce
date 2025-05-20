"use client";

import React from "react";
import CalendarFrame from "@/components/Calendar/CalendarFrame";
import EventsHeader from "@/components/Events/EventsHeader";
import { EventsProvider } from "@/context/EventsContext";
import { CalendarProvider } from "@/context/CalendarContext";
import EventList from "@/components/Events/EventList";
import EventContent from "@/components/Events/EventContent";
import EventModalManager from "@/components/EventModal/EventModalManager";

const Events = () => {
  return (
    <EventsProvider>
      <CalendarProvider>
        <EventsHeader />
        <EventContent>
          {({ processedEvents }) => (
            <>
              <section className="mx-8 mb-8 flex flex-col justify-center gap-8 xl:mb-12 xl:flex-row xl:gap-12">
                <EventModalManager>
                  {({ onEventClick }) => (
                    <>
                      <CalendarFrame
                        events={processedEvents}
                        onEventClick={onEventClick}
                      />
                      <EventList
                        events={processedEvents}
                        onEventClick={onEventClick}
                      />
                    </>
                  )}
                </EventModalManager>
              </section>
            </>
          )}
        </EventContent>
      </CalendarProvider>
    </EventsProvider>
  );
};

export default Events;
