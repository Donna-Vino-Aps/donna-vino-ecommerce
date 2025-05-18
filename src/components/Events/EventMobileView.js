"use client";

import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";

const EventMobileView = ({ event, showModal, activeView = "date" }) => {
  const {
    wine,
    winery,
    availableSeats,
    totalSeats,
    formattedDate,
    formattedTimeStart,
    formattedTimeEnd,
    seatStatus,
  } = event;

  const isFull = availableSeats === 0 && totalSeats > 0;
  const { translations } = useLanguage();

  return (
    <div
      className={`min-h-[7.8rem] border-l-4 bg-white shadow-sm ${seatStatus.borderColor}`}
    >
      {activeView === "date" && (
        <div className="p-4">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-titleSmall font-medium">{formattedDate}</p>
              <p className="text-bodyMedium">
                {formattedTimeStart} - {formattedTimeEnd}
              </p>
            </div>

            <div className="text-right">
              <p className="mb-1 text-bodyMedium font-medium">
                {translations["events.availableSeatsHeader"] ||
                  "Seats available"}
              </p>
              <div
                className={`inline-block rounded-full px-3 py-1 text-center ${seatStatus.bgColor} ${seatStatus.textColor}`}
              >
                {availableSeats} {translations["events.of"]} {totalSeats}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              text={translations["events.bookSeats"] || "Book seats"}
              variant="redSmall"
              onClick={() => showModal(event)}
              disabled={isFull}
              ariaLabel={translations["events.bookSeats"]}
              testId="book-seats-mobile"
            />
          </div>
        </div>
      )}

      {activeView === "details" && (
        <div className="p-4">
          <div className="mb-3">
            <p className="text-bodyMedium">
              <span className="font-medium">
                {translations["events.wines"] || "Wines served: "}
              </span>
              <span dangerouslySetInnerHTML={{ __html: wine }} />
            </p>
          </div>

          <div>
            <p className="text-bodyMedium">
              <span className="font-medium">
                {translations["events.winery"] || "Winery: "}
              </span>
              <span dangerouslySetInnerHTML={{ __html: winery }} />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

EventMobileView.propTypes = {
  event: PropTypes.shape({
    wine: PropTypes.string,
    winery: PropTypes.string,
    availableSeats: PropTypes.number,
    totalSeats: PropTypes.number,
    formattedDate: PropTypes.string,
    formattedTimeStart: PropTypes.string,
    formattedTimeEnd: PropTypes.string,
    seatStatus: PropTypes.shape({
      bgColor: PropTypes.string,
      textColor: PropTypes.string,
      borderColor: PropTypes.string,
    }).isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  showModal: PropTypes.func.isRequired,
  activeView: PropTypes.oneOf(["date", "details"]),
};

export default EventMobileView;
