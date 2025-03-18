import React, { useState } from "react";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PickerWithButtonField from "./PickerWithButtonField";
import { useLanguage } from "@/context/LanguageContext";

const DateSelector = ({ currentMonth, currentYear, onMonthChange }) => {
  const { translations } = useLanguage();
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDateChange = (newDate) => {
    setValue(newDate);

    const newMonth = newDate ? newDate.month() + 1 : currentMonth; // Get the month (1-12)
    const newYear = newDate ? newDate.year() : currentYear; // Get the year
    onMonthChange(newMonth, newYear); // Update the parent with the new month and year
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className="flex justify-center items-center mx-auto bg-primary-light w-full h-[4rem] max-w-[calc(7*12.5rem-2px)] mb-4 rounded-lg">
        <div className="flex gap-2 hover:cursor-pointer">
          <p
            className="text-headlineSmall text-tertiary1-darker"
            onClick={() => setOpen(true)}
          >
            {translations["calendar.select-date"]}
          </p>
          <PickerWithButtonField
            value={value}
            onChange={handleDateChange}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </section>
    </LocalizationProvider>
  );
};

DateSelector.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired,
};

export default DateSelector;
