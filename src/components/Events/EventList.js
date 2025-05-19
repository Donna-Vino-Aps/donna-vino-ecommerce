"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";
import { useCalendar } from "@/context/CalendarContext";
import { format } from "date-fns";
import { getLocale } from "@/utils/dateTimeFormatting";
import EventRow from "./EventRow";
import EventMobileView from "./EventMobileView";
import useIsMobile from "@/hooks/useIsMobile";

const EventList = ({ events, onEventClick }) => {
  const { language, translations } = useLanguage();
  const { selectedMonth, selectedYear } = useCalendar();
  const isMobile = useIsMobile(768);
  const [activeTab, setActiveTab] = useState("date");

  const tabs = [
    { id: "date", labelKey: "events.dateHeader" },
    { id: "details", labelKey: "events.detailsHeader-mobile" },
  ];

  const MonthHeader = () => (
    <h2 className="mb-4 flex w-full items-baseline gap-1 rounded-[0.5rem] bg-tertiary2-normal px-4 py-2 text-titleMedium font-medium">
      <span>{translations["events.upcomingTitle"]}</span>
      <span className="font-semibold">
        {format(new Date(selectedYear, selectedMonth - 1, 1), "MMMM", {
          locale: getLocale(language),
        })}
      </span>
    </h2>
  );

  const renderEventList = () => {
    if (events.length === 0) {
      return (
        <div
          className={`flex flex-col items-center ${
            isMobile ? "" : "mx-auto sm:min-w-[34rem] xl:mx-0"
          }`}
        >
          {!isMobile && <MonthHeader />}
          <p className="text-center">
            {translations["events.noEventsForMonth"]}
          </p>
        </div>
      );
    }

    if (isMobile) {
      const dateTabId = `tab-date`;
      const detailsTabId = `tab-details`;
      const dateContentId = `tabpanel-date`;
      const detailsContentId = `tabpanel-details`;

      return (
        <div className="flex flex-col items-center text-tertiary1-active_dark md:mx-2 lg:mx-4">
          <div
            role="tablist"
            aria-label={translations["events.tabsLabel"]}
            className="mb-1 flex w-full bg-tertiary2-light"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                className={`w-1/2 rounded-t-[0.5rem] border-b-2 px-4 py-2 text-left text-titleSmall font-medium sm:text-titleMedium ${
                  activeTab === tab.id
                    ? "border-primary-active_normal bg-tertiary2-normal"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {translations[tab.labelKey]}
              </button>
            ))}
          </div>

          <div className="flex w-full flex-col gap-1">
            {events.map((event) => (
              <EventMobileView
                key={event.id}
                event={event}
                showModal={() => onEventClick(event)}
                activeView={activeTab}
                dateTabId={dateTabId}
                detailsTabId={detailsTabId}
                dateContentId={dateContentId}
                detailsContentId={detailsContentId}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto flex flex-col overflow-hidden sm:min-w-[34rem] xl:mx-0 xl:h-[31rem]">
        <MonthHeader />

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

        <div className="w-full overflow-y-auto rounded-b bg-tertiary2-active p-2 text-tertiary1-active_dark">
          {events.map((event) => (
            <EventRow
              key={event.id}
              event={event}
              showModal={() => onEventClick(event)}
            />
          ))}
        </div>
      </div>
    );
  };

  return renderEventList();
};

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default EventList;
