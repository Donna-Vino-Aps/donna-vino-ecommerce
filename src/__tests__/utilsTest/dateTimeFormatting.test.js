import { getLocale } from "@/utils/dateTimeFormatting";
import { enUS, da } from "date-fns/locale";

const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe("getLocale", () => {
  it("returns Danish locale for 'dk' language", () => {
    expect(getLocale("dk")).toBe(da);
  });

  it("returns English locale for 'en' language", () => {
    expect(getLocale("en")).toBe(enUS);
  });

  it("returns English locale as default for any other language", () => {
    expect(getLocale("fr")).toBe(enUS);
    expect(getLocale(null)).toBe(enUS);
    expect(getLocale(undefined)).toBe(enUS);
  });
});
