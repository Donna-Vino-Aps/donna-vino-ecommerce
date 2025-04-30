"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const defaultContextValue = {
  selectedMonth: null,
  selectedYear: null,
  onMonthYearChange: () => {},
};

const CalendarContext = createContext(defaultContextValue);

const getCurrentDateInfo = () => ({
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
});

export function CalendarProvider({ children }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const { month, year } = getCurrentDateInfo();
    setSelectedMonth(month);
    setSelectedYear(year);
  }, []);

  const handleMonthYearChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  return (
    <CalendarContext.Provider
      value={{
        selectedMonth,
        selectedYear,
        onMonthYearChange: handleMonthYearChange,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export const useCalendar = () => useContext(CalendarContext);

CalendarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
