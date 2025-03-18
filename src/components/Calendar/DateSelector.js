import React, { useState } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PickerWithButtonField from "./PickerWithButtonField";

const DateSelector = () => {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className="flex justify-center items-center mx-auto bg-primary-light w-full h-[4rem] max-w-[calc(7*12.5rem-2px)] mb-4 rounded-lg">
        <div className="flex gap-2 hover:cursor-pointer">
          <p
            className="text-headlineSmall text-tertiary1-darker"
            onClick={() => setOpen(true)}
          >
            Select date
          </p>
          <PickerWithButtonField
            value={value}
            onChange={(newValue) => setValue(newValue)}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </section>
    </LocalizationProvider>
  );
};

export default DateSelector;
