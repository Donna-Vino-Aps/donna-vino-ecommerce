"use client";

import CalendarFrame from "@/components/Calendar/CalendarFrame";
import EventsHeader from "@/components/Events/EventsHeader";
import { EventsProvider } from "@/context/EventsContext";
import { CalendarProvider } from "@/context/CalendarContext";
import React from "react";
import EventList from "@/components/Events/EventList";

const Events = () => {
  return (
    <EventsProvider>
      <CalendarProvider>
        <EventsHeader />
        <section className="flex flex-col justify-center xl:flex-row xl:gap-8">
          <CalendarFrame />
          <EventList />
        </section>
      </CalendarProvider>
    </EventsProvider>
  );
};

export default Events;
