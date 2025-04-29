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
      <section className="mx-auto mb-4 flex h-[3.125rem] w-full max-w-[calc(7*6.282rem-4px)] items-center justify-center rounded-lg bg-primary-light lg:h-[4rem]">
        <div className="flex justify-between gap-2 hover:cursor-pointer lg:justify-center">
          <p
            className="ml-6 text-titleMedium text-tertiary1-darker md:text-headlineSmall lg:ml-0"
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
