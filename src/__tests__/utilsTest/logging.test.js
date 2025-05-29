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

      // Set environment to production
      process.env.NODE_ENV = "production";

      logInfo("This should not be logged");

      expect(consoleLogMock).not.toHaveBeenCalled();

      consoleLogMock.mockRestore();
    });
  });
});
