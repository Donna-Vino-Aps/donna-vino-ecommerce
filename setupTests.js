/**
 * This file will be imported in all tests automatically by Jest
 */

// For react-testing-library, it will be the DOM mock
import "@testing-library/jest-dom";

// Make it automatically mock fetch requests. Docs: https://www.npmjs.com/package/jest-fetch-mock
import jestFetchMock from "jest-fetch-mock";
jestFetchMock.enableMocks();

// Setup global date mocking for tests
import { advanceTo, clear } from "jest-date-mock";

// Reset date mock between tests
beforeEach(() => {
  advanceTo(new Date(2025, 3, 15));
});

afterEach(() => {
  clear();
});
