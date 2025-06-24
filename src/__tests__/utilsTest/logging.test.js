jest.unmock("@/utils/logging");

import { logInfo, logWarning, logError } from "@/utils/logging";

describe("Logging Utilities", () => {
  // Store original NODE_ENV
  const originalNodeEnv = process.env.NODE_ENV;

  // Set environment to development before tests
  beforeEach(() => {
    process.env.NODE_ENV = "development";
  });

  // Reset NODE_ENV after tests
  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe("logInfo", () => {
    it("logInfo should log to the console.log", () => {
      const consoleLogMock = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      expect(consoleLogMock).toHaveBeenCalledTimes(0);

      logInfo("Some message");

      expect(consoleLogMock).toHaveBeenCalledTimes(1);

      consoleLogMock.mockRestore();
    });

    it("logInfo should support multiple arguments", () => {
      const consoleLogMock = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      const user = { id: 123, name: "John Doe" };
      logInfo("User logged in:", user);

      expect(consoleLogMock).toHaveBeenCalledTimes(1);
      expect(consoleLogMock).toHaveBeenLastCalledWith("User logged in:", user);

      consoleLogMock.mockRestore();
    });

    it("logInfo should support object and primitive arguments", () => {
      const consoleLogMock = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      logInfo("Request processed in", 250, "ms", { status: "success" });

      expect(consoleLogMock).toHaveBeenCalledTimes(1);
      expect(consoleLogMock).toHaveBeenLastCalledWith(
        "Request processed in",
        250,
        "ms",
        { status: "success" },
      );

      consoleLogMock.mockRestore();
    });

    it("logInfo should not log in production environment", () => {
      const consoleLogMock = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      process.env.NODE_ENV = "production";

      logInfo("This should not be logged");

      expect(consoleLogMock).not.toHaveBeenCalled();

      consoleLogMock.mockRestore();
    });
  });

  describe("logWarning", () => {
    it("logWarning should log to the console.warn", () => {
      const consoleWarnMock = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      expect(consoleWarnMock).toHaveBeenCalledTimes(0);

      logWarning("Some warning");

      expect(consoleWarnMock).toHaveBeenCalledTimes(1);

      consoleWarnMock.mockRestore();
    });

    it("logWarning should support multiple arguments", () => {
      const consoleWarnMock = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      const limit = { current: 95, max: 100 };
      logWarning("API rate limit approaching:", limit);

      expect(consoleWarnMock).toHaveBeenCalledTimes(1);
      expect(consoleWarnMock).toHaveBeenLastCalledWith(
        "API rate limit approaching:",
        limit,
      );

      consoleWarnMock.mockRestore();
    });

    it("logWarning should support mixed argument types", () => {
      const consoleWarnMock = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      logWarning("Database connection slow", 1500, "ms", { action: "retry" });

      expect(consoleWarnMock).toHaveBeenCalledTimes(1);
      expect(consoleWarnMock).toHaveBeenLastCalledWith(
        "Database connection slow",
        1500,
        "ms",
        { action: "retry" },
      );

      consoleWarnMock.mockRestore();
    });

    it("logWarning should not log in production environment", () => {
      const consoleWarnMock = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      process.env.NODE_ENV = "production";

      logWarning("This warning should not be logged");

      expect(consoleWarnMock).not.toHaveBeenCalled();

      consoleWarnMock.mockRestore();
    });
  });

  describe("logError", () => {
    it("logError should log simple messages to the console.error", () => {
      const consoleErrorMock = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(consoleErrorMock).toHaveBeenCalledTimes(0);

      logError("Some error message");

      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenLastCalledWith(
        "ERROR: ",
        "Some error message",
      );

      consoleErrorMock.mockRestore();
    });

    it("logError should log Error objects with stack to the console.error", () => {
      const consoleErrorMock = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(consoleErrorMock).toHaveBeenCalledTimes(0);

      const errMessage = "My error";
      const err = new Error(errMessage);
      logError(err);

      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenLastCalledWith(errMessage, err.stack);

      consoleErrorMock.mockRestore();
    });

    it("logError should support multiple arguments", () => {
      const consoleErrorMock = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const additionalInfo = { code: 500, details: "Server error" };
      logError("Connection failed", additionalInfo);

      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenLastCalledWith(
        "ERROR: ",
        "Connection failed",
        additionalInfo,
      );

      consoleErrorMock.mockRestore();
    });

    it("logError should support multiple arguments with Error objects", () => {
      const consoleErrorMock = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const err = new Error("Database error");
      const additionalInfo = { table: "users", operation: "insert" };

      logError(err, additionalInfo);

      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenLastCalledWith(
        err.message,
        err.stack,
        additionalInfo,
      );

      consoleErrorMock.mockRestore();
    });

    it("logError should handle inner errors", () => {
      const consoleErrorMock = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const innerError = new Error("Inner error");
      const error = new Error("Main error");
      error.innerError = innerError;

      logError(error);

      expect(consoleErrorMock).toHaveBeenCalledTimes(2);
      expect(consoleErrorMock).toHaveBeenNthCalledWith(
        1,
        error.message,
        error.stack,
      );
      expect(consoleErrorMock).toHaveBeenNthCalledWith(
        2,
        "Inner Error: ",
        innerError,
      );

      consoleErrorMock.mockRestore();
    });

    it("logError should not log in production environment", () => {
      const consoleErrorMock = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      process.env.NODE_ENV = "production";

      logError(new Error("This error should not be logged"));

      expect(consoleErrorMock).not.toHaveBeenCalled();

      consoleErrorMock.mockRestore();
    });
  });
});
