import React from "react";
import PropTypes from "prop-types";

const CalendarMonthPicker = ({ monthOfYear }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex justify-between items-center mx-auto bg-primary-normal w-full h-[5rem] max-w-[calc(7*12.5rem-2px)] rounded-t-[1rem] text-headlineMedium text-center text-tertiary2-light">
      <img
        src="/icons/arrow-left-small.svg"
        className="relative top-[2px] left-16"
      />
      {months[monthOfYear - 1]}
      <img
        src="/icons/arrow-right-small.svg"
        className="relative top-[2px] right-16"
      />
    </div>
  );
};

CalendarMonthPicker.propTypes = {
  monthOfYear: PropTypes.number.isRequired,
};

export default CalendarMonthPicker;
