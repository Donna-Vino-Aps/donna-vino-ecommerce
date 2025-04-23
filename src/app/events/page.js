"use client";

import CalendarFrame from "@/components/Calendar/CalendarFrame";
import EventsHeader from "@/components/Events/EventsHeader";
import { EventsProvider } from "@/context/EventsContext";
import React from "react";
import EventList from "@/components/Events/EventList";

const Events = () => {
  return (
    <EventsProvider>
      <EventsHeader />
      <section className="flex flex-col justify-center xl:flex-row xl:gap-8">
        <CalendarFrame />
        <EventList />
      </section>
    </EventsProvider>
  );
};

export default Events;
