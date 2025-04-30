"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const defaultContextValue = {
  selectedMonth: null,
  selectedYear: null,
  onMonthYearChange: () => {},
};

const CalendarContext = createContext(defaultContextValue);

export function CalendarProvider({ children }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    setSelectedMonth(new Date().getMonth() + 1);
    setSelectedYear(new Date().getFullYear());
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
