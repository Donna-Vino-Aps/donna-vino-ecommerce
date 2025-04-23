import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";

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

  return (
    <>
      <div
        className={`flex flex-row pl-2 mb-4 border-l-4 ${seatStatus.borderColor}`}
      >
        <div className="w-[22%] flex flex-col items-start">
          <div className="text-bodyMedium">{formattedDate}</div>
          <div className="text-bodySmall">
            {formattedTimeStart} - {formattedTimeEnd}
          </div>
        </div>

        <div className="w-[56%] flex flex-col items-start text-labelLarge">
          <div>
            <span className="font-medium">Wines:</span>{" "}
            <span dangerouslySetInnerHTML={{ __html: wine }} />
          </div>
          <div>
            <span className="font-medium">Winery:</span> {winery}
          </div>
        </div>
        <div className="w-[22%] flex flex-col items-center text-bodyMedium">
          {availableSeats} of {totalInventory}
        </div>
      </div>
      <div className="flex justify-end py-2 mb-4 pr-2">
        <Button
          text="Book seats"
          variant="eventButton"
          onClick={() => showModal(event)}
          disabled={isFull}
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
