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
      <CalendarFrame />
      <EventList />
    </EventsProvider>
  );
};

export default Events;
