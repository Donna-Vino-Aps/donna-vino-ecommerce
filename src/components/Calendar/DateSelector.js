import React from "react";

const DateSelector = () => {
  return (
    <section className="flex justify-center items-center mx-auto bg-primary-light w-full h-[4rem] max-w-[calc(7*12.5rem-2px)] mb-4 rounded-lg">
      <div className="flex gap-2">
        <p className="text-headlineSmall text-tertiary1-darker">Select date</p>
        <img
          src="/icons/calender-alt-1-gray.svg"
          className="relative bottom-[2px]"
        />
      </div>
    </section>
  );
};

export default DateSelector;
