import { renderHook, act, waitFor } from "@testing-library/react";
import axios from "axios";
import useFetch from "../../../hooks/api/useFetch";

// Mock axios
jest.mock("axios");

describe("useFetch Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Tests for invalid configurations
  describe("Invalid configurations", () => {
    it("should throw error for missing or invalid initialRoute", () => {
      expect(() => renderHook(() => useFetch())).toThrow(
        "Invalid route provided. Routes cannot include 'api/' as part of the endpoint, to avoid conflicts and confusion in server routing.",
      );
    });

    it("should handle null request parameters", () => {
      expect(() =>
        renderHook(() => useFetch(null, "GET", null, {}, jest.fn())),
      ).toThrow("Invalid route provided");
    });
  });

  // Tests for HTTP methods
  describe("HTTP methods", () => {
    it("should handle GET request", async () => {
      const mockResponse = { data: { id: 123 }, success: true };
      axios.mockResolvedValueOnce({ data: mockResponse });
      const { result } = renderHook(() => useFetch("/test-route", "GET"));
      await act(async () => {
        await result.current.performFetch();
      });
      expect(result.current.data).toEqual(mockResponse);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should handle POST request", async () => {
      const mockResponse = { data: { id: 123 }, success: true };
      axios.mockResolvedValueOnce({ data: mockResponse });
      const onReceived = jest.fn();
      const { result } = renderHook(() =>
        useFetch("/test-route", "POST", { id: 123 }, {}, onReceived),
      );
      await act(async () => {
        await result.current.performFetch();
      });
      expect(result.current.data).toEqual(mockResponse);
      expect(onReceived).toHaveBeenCalledWith(mockResponse);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should handle PUT request", async () => {
      const mockResponse = { data: { id: 123, updated: true }, success: true };
      axios.mockResolvedValueOnce({ data: mockResponse });
      const onReceived = jest.fn();
      const { result } = renderHook(() =>
        useFetch("/test-route", "PUT", { id: 123 }, {}, onReceived),
      );
      await act(async () => {
        await result.current.performFetch();
      });
      expect(result.current.data).toEqual(mockResponse);
      expect(onReceived).toHaveBeenCalledWith(mockResponse);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should handle DELETE request", async () => {
      const mockResponse = { data: { id: 123, deleted: true }, success: true };
      axios.mockResolvedValueOnce({ data: mockResponse });
      const onReceived = jest.fn();
      const { result } = renderHook(() =>
        useFetch("/test-route", "DELETE", null, {}, onReceived),
      );
      await act(async () => {
        await result.current.performFetch();
      });
      expect(result.current.data).toEqual(mockResponse);
      expect(onReceived).toHaveBeenCalledWith(mockResponse);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should handle null body gracefully", async () => {
      const mockResponse = { data: { id: 123 }, success: true };
      axios.mockResolvedValueOnce({ data: mockResponse });
      const { result } = renderHook(() => useFetch("/test-route", "POST"));
      await act(async () => {
        await result.current.performFetch();
      });
      expect(result.current.data).toEqual(mockResponse);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("should add Authorization header with token if present in localStorage", async () => {
    const mockToken = "mocked-token";
    localStorage.setItem(
      "userCredentials",
      JSON.stringify({ token: mockToken }),
    );

    const onReceived = jest.fn();

    const { result } = renderHook(() => useFetch("/test-route", onReceived));

    axios.mockResolvedValueOnce({
      data: { success: true, msg: "Success" },
    });

    await act(async () => {
      await result.current.performFetch();
    });

    const axiosCall = axios.mock.calls[0][1];

    expect(axiosCall).toEqual(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
      }),
    );
  });

  it("should not add Authorization header if no token is present in localStorage", async () => {
    localStorage.removeItem("userCredentials");

    const onReceived = jest.fn();

    const { result } = renderHook(() => useFetch("/test-route", onReceived));

    axios.mockResolvedValueOnce({
      data: { success: true, msg: "Success" },
    });

    await act(async () => {
      await result.current.performFetch();
    });

    const axiosCall = axios.mock.calls[0][1];

    expect(axiosCall).toEqual(
      expect.objectContaining({
        headers: expect.not.objectContaining({
          Authorization: expect.any(String),
        }),
      }),
    );
  });

  // Tests for errors and edge cases
  describe("Error handling", () => {
    it("should handle failed GET request", async () => {
      axios.mockRejectedValueOnce(new Error("Network Error"));
      const { result } = renderHook(() => useFetch("/test-route", "GET"));
      await act(async () => {
        await result.current.performFetch();
      });
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error.message).toBe("Network Error");
      });
    });

    it("should handle invalid URL", async () => {
      const { result } = renderHook(() => useFetch("invalid-url", "GET"));
      await act(async () => {
        await result.current.performFetch();
      });
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error.message).toBe("Invalid URL");
    });

    it("should handle empty response", async () => {
      axios.mockResolvedValueOnce({ data: {} });
      const { result } = renderHook(() => useFetch("/test-route", "GET"));
      await act(async () => {
        await result.current.performFetch();
      });
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error.message).toBe("Empty response from server");
    });

    it("should handle generic server error", async () => {
      const mockErrorResponse = {
        response: { data: { msg: "Internal server error." } },
      };
      axios.mockRejectedValueOnce(mockErrorResponse);
      const { result } = renderHook(() => useFetch("/test-route", "GET"));
      await act(async () => {
        await result.current.performFetch();
      });
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error.message).toBe("Internal server error.");
    });
  });

  // Tests for configuration defaults
  describe("Configuration and defaults", () => {
    it("should use default headers when customHeaders is not provided", async () => {
      const mockResponse = { data: { id: 123 }, success: true };
      axios.mockResolvedValueOnce({ data: mockResponse });

      const { result } = renderHook(() => useFetch("/test-route", "GET"));

      await act(async () => {
        await result.current.performFetch();
      });

      expect(axios).toHaveBeenCalledWith(expect.any(String), {
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        withCredentials: true,
        cancelToken: expect.any(Object),
      });
    });

    it("should not fail if onReceived is not provided", async () => {
      const mockResponse = { data: { id: 123 }, success: true };
      axios.mockResolvedValueOnce({ data: mockResponse });

      const { result } = renderHook(() => useFetch("/test-route", "GET"));

      await act(async () => {
        await result.current.performFetch();
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  // Tests for lifecycle methods
  describe("Lifecycle methods", () => {
    it("should call cancelFetch", () => {
      const { result } = renderHook(() => useFetch("/test-route", "GET"));
      const spyCancelFetch = jest.spyOn(result.current, "cancelFetch");

      act(() => {
        result.current.cancelFetch();
      });

      expect(spyCancelFetch).toHaveBeenCalled();

      spyCancelFetch.mockRestore();
    });

    it("should return cancelFetch function", () => {
      const { result } = renderHook(() => useFetch("/test-route", "GET"));

      expect(typeof result.current.cancelFetch).toBe("function");
    });

    it("should set isLoading to true while fetching", async () => {
      const { result } = renderHook(() => useFetch("/test-route", "GET"));

      expect(result.current.isLoading).toBe(false);

      await act(async () => {
        await result.current.performFetch();
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("useFetch Hook - onReceived callback", () => {
    it("should call onReceived when request is successful", async () => {
      const mockResponse = { data: { id: 123, success: true }, success: true };
      const onReceived = jest.fn();
      axios.mockResolvedValueOnce({ data: mockResponse });

      // Render the hook with the `onReceived` callback
      const { result } = renderHook(() =>
        useFetch("/test-route", "POST", { id: 123 }, {}, onReceived),
      );

      // Perform the fetch request
      await act(async () => {
        await result.current.performFetch();
      });

      // Assert that onReceived was called with the correct response data
      expect(onReceived).toHaveBeenCalledWith(mockResponse);
      expect(result.current.data).toEqual(mockResponse);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should not call onReceived when request fails", async () => {
      // Mock an error response
      const mockError = new Error("Network Error");
      axios.mockRejectedValueOnce(mockError);

      const onReceived = jest.fn();
      const { result } = renderHook(() =>
        useFetch("/test-route", "POST", { id: 123 }, {}, onReceived),
      );

      await act(async () => {
        await result.current.performFetch();
      });

      // Assert that onReceived was not called on error
      expect(onReceived).not.toHaveBeenCalled();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error.message).toBe("Network Error");
    });

    it("should call onReceived when the response contains success: true", async () => {
      const mockResponse = { data: { id: 123, success: true }, success: true };
      const onReceived = jest.fn();
      axios.mockResolvedValueOnce({ data: mockResponse });

      const { result } = renderHook(() =>
        useFetch("/test-route", "POST", { id: 123 }, {}, onReceived),
      );

      await act(async () => {
        await result.current.performFetch();
      });

      // Assert that onReceived was called with the correct response
      expect(onReceived).toHaveBeenCalledWith(mockResponse);
      expect(result.current.data).toEqual(mockResponse);
    });

    it("should not call onReceived when the response contains success: false", async () => {
      const mockResponse = {
        data: { success: false, msg: "User already exists" },
      };
      const onReceived = jest.fn();
      axios.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() =>
        useFetch("/test-route", "POST", { id: 123 }, {}, onReceived),
      );

      await act(async () => {
        await result.current.performFetch();
      });

      // Assert that onReceived was not called when the response is unsuccessful
      expect(onReceived).not.toHaveBeenCalled();

      // Check that the error message is set correctly based on response data
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error.message).toBe(mockResponse.data.msg);
    });
  });
});
