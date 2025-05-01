import React from "react";
import { render, screen, renderHook, act } from "@testing-library/react";
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
    it("should initialize with the current month and year", () => {
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

    it("should update month and year when onMonthYearChange is called", () => {
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

      act(() => {
        screen.getByTestId("change-date").click();
      });
      expect(screen.getByTestId("month").textContent).toBe("12");
      expect(screen.getByTestId("year").textContent).toBe("2026");
    });
  });

  describe("useCalendar hook", () => {
    it("should provide the calendar context when used within a provider", () => {
      const { result } = renderHook(() => useCalendar(), {
        wrapper: ({ children }) => (
          <CalendarProvider>{children}</CalendarProvider>
        ),
      });

      expect(result.current).toMatchObject({
        selectedMonth: EXPECTED_MONTH,
        selectedYear: EXPECTED_YEAR,
        onMonthYearChange: expect.any(Function),
      });
    });

    it("should handle the month/year change function correctly", () => {
      const { result } = renderHook(() => useCalendar(), {
        wrapper: ({ children }) => (
          <CalendarProvider>{children}</CalendarProvider>
        ),
      });

      act(() => {
        result.current.onMonthYearChange(3, 2030);
      });

      expect(result.current.selectedMonth).toBe(3);
      expect(result.current.selectedYear).toBe(2030);
    });
  });

  describe("Edge cases", () => {
    it("should handle year transitions correctly", () => {
      const { result } = renderHook(() => useCalendar(), {
        wrapper: ({ children }) => (
          <CalendarProvider>{children}</CalendarProvider>
        ),
      });

      act(() => {
        result.current.onMonthYearChange(12, 2025);
      });

      expect(result.current.selectedMonth).toBe(12);
      expect(result.current.selectedYear).toBe(2025);

      act(() => {
        result.current.onMonthYearChange(1, 2026);
      });

      expect(result.current.selectedMonth).toBe(1);
      expect(result.current.selectedYear).toBe(2026);
    });

    it("should handle out-of-range months gracefully", () => {
      const { result } = renderHook(() => useCalendar(), {
        wrapper: ({ children }) => (
          <CalendarProvider>{children}</CalendarProvider>
        ),
      });

      act(() => {
        result.current.onMonthYearChange(0, 2025);
      });
      expect(result.current.selectedMonth).toBe(0);

      act(() => {
        result.current.onMonthYearChange(13, 2025);
      });
      expect(result.current.selectedMonth).toBe(13);
    });
  });
});
