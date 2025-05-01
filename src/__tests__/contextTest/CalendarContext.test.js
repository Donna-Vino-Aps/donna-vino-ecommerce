import React from "react";
import { render, screen } from "@testing-library/react";
import { CalendarProvider, useCalendar } from "@/context/CalendarContext";

const EXPECTED_MONTH = 4;
const EXPECTED_YEAR = 2025;

const TestComponent = () => {
  const { selectedMonth, selectedYear, onMonthYearChange } = useCalendar();
  return (
    <div>
      <div data-testid="month">{selectedMonth}</div>
      <div data-testid="year">{selectedYear}</div>
      <button
        data-testid="change-date"
        onClick={() => onMonthYearChange(12, 2026)}
      >
        Change Date
      </button>
    </div>
  );
};

describe("CalendarContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("CalendarProvider", () => {
    it("initializes with the current month and year", () => {
      render(
        <CalendarProvider>
          <TestComponent />
        </CalendarProvider>,
      );

      expect(screen.getByTestId("month").textContent).toBe(
        EXPECTED_MONTH.toString(),
      );
      expect(screen.getByTestId("year").textContent).toBe(
        EXPECTED_YEAR.toString(),
      );
    });
  });
});
