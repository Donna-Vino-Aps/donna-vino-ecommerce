"use client";

import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";

const EventRow = ({
  event,
  formattedDate,
  formattedTimeStart,
  formattedTimeEnd,
  seatStatus,
  showModal,
}) => {
  const { wine, winery, availableSeats, totalInventory } = event;
  const isFull = availableSeats === 0 && totalInventory > 0;
  const { translations } = useLanguage();

  return (
    <>
      <div
        className={`mb-4 flex flex-row gap-1 border-l-4 pl-2 ${seatStatus.borderColor}`}
      >
        <div className="flex w-[22%] flex-col items-start">
          <p className="text-bodyMedium">{formattedDate}</p>
          <p className="text-bodySmall">
            {formattedTimeStart} - {formattedTimeEnd}
          </p>
        </div>

        <div className="flex w-[56%] flex-col items-start text-labelLarge">
          <p>
            <span className="font-medium">{translations["events.wines"]}:</span>{" "}
            <span dangerouslySetInnerHTML={{ __html: wine }} />
          </p>
          <p>
            <span className="font-medium">
              {translations["events.winery"]}:
            </span>{" "}
            <span dangerouslySetInnerHTML={{ __html: winery }} />
          </p>
        </div>
        <p className="w-[22%] text-center text-bodyMedium">
          {availableSeats} {translations["events.of"]} {totalInventory}
        </p>
      </div>
      <div className="mb-4 flex justify-end py-2 pr-2">
        <Button
          text={translations["events.bookSeats"]}
          variant="redSmall"
          onClick={() => showModal(event)}
          disabled={isFull}
          ariaLabel={translations["events.bookSeats"]}
          testId="book-seats"
        />
      </div>
    </>
  );
};

EventRow.propTypes = {
  event: PropTypes.shape({
    wine: PropTypes.string,
    winery: PropTypes.string,
    availableSeats: PropTypes.number,
    totalInventory: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  formattedDate: PropTypes.string.isRequired,
  formattedTimeStart: PropTypes.string,
  formattedTimeEnd: PropTypes.string,
  seatStatus: PropTypes.shape({
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    borderColor: PropTypes.string,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
};

export default EventRow;
