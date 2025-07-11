import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseApiUrl } from "@/config/environment";
import { logInfo } from "@/utils/logging";

const useFetch = (
  initialRoute,
  method = "GET",
  body = null,
  customHeaders = {},
  onReceived = () => {},
) => {
  if (!initialRoute || initialRoute.includes("api/")) {
    throw new Error(
      "Invalid route provided. Routes cannot include 'api/' as part of the endpoint, to avoid conflicts and confusion in server routing.",
    );
  }

  if (typeof initialRoute !== "string") {
    throw new Error("useFetch: route must be a string");
  }

  if (typeof onReceived !== "function") {
    throw new Error("useFetch: onReceived must be a function");
  }

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [route, setRoute] = useState(initialRoute);
  const [data, setData] = useState(null);

  const cancelTokens = useRef({});

  const performFetch = async (options = {}, newUrl, newBody = null) => {
    if (newUrl) {
      cancelFetch(newUrl);
      setRoute(newUrl);
    }

    setError(null);
    setData(null);
    setIsLoading(true);

    if (!route || !/^\/[a-zA-Z0-9/_-]*(\?[a-zA-Z0-9=&]*)?$/.test(route)) {
      setError(new Error("Invalid URL"));
      setIsLoading(false);
      return;
    }

    let token = null;
    try {
      const data = JSON.parse(localStorage.getItem("userCredentials") || "{}");
      token = data.token;
    } catch (error) {
      console.error("Failed to retrieve token", error);
    }

    const requestBody = newBody ?? body;

    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders,
      ...(requestBody instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    };

    const baseOptions = {
      method,
      headers,
      withCredentials: true,
      cancelToken: new axios.CancelToken((cancel) => {
        cancelTokens.current[route] = cancel;
      }),
      ...(requestBody && { data: requestBody }),
      ...options,
    };

    try {
      const url = `${baseApiUrl}/api${route}`.replace("//api", "/api");
      const response = await axios(url, baseOptions);
      logInfo(`Request URL: ${url}`);

      if (!response || !response.data) {
        setError(new Error("Unexpected server error"));
        return;
      }

      if (Object.keys(response.data).length === 0) {
        setError(new Error("Empty response from server"));
        return;
      }

      const { success, msg, message, error: serverError } = response.data;

      logInfo(`Response Data: ${JSON.stringify(response.data, null, 2)}`);

      if (success) {
        setData(response.data);
        onReceived(response.data);
      } else {
        const errorMsg =
          serverError || msg || message || "Unexpected server error";
        setError(new Error(errorMsg));
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        setError(new Error("Fetch was canceled"));
      } else {
        const errorMsg =
          error.response?.data?.msg || error.message || "Unexpected error";
        setError(new Error(errorMsg));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cancelFetch = (url) => {
    if (cancelTokens.current[url]) {
      cancelTokens.current[url]("Fetch was canceled");
      delete cancelTokens.current[url];
    }
  };

  useEffect(() => {
    return () => {
      Object.values(cancelTokens.current).forEach((cancel) =>
        cancel("Fetch was canceled"),
      );
      cancelTokens.current = {};
    };
  }, []);

  return {
    isLoading,
    error,
    data,
    performFetch,
    cancelFetch,
  };
};

export default useFetch;
