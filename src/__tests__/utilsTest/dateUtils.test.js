import { formatDate } from "../../utils/dateUtils";

describe("formatDate function", () => {
  it('should format a valid date to "EEE MMM dd yyyy"', () => {
    const testDates = [
      { input: new Date(2022, 1, 1), expected: "Tue Feb 01 2022" },
      { input: new Date(2023, 5, 12), expected: "Mon Jun 12 2023" },
      { input: new Date(2021, 11, 25), expected: "Sat Dec 25 2021" },
      { input: null, expected: null },
      { input: undefined, expected: null },
      { input: "", expected: null },
    ];

    testDates.forEach(({ input, expected }) => {
      const result = formatDate(input);
      expect(result).toBe(expected);
    });
  });
});
