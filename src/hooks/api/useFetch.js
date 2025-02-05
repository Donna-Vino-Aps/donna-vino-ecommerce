import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseApiUrl } from "../../config/environment";
import { logInfo, logError } from "../../utils/logging";

const useFetch = (initialRoute, onReceived) => {
  if (!initialRoute || initialRoute.includes("api/")) {
    throw new Error("Invalid route provided");
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
  const cancelTokenRef = useRef(null);

  const performFetch = async (options = {}, newUrl) => {
    if (newUrl) {
      cancelFetch();
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
      token = localStorage.getItem("zenTimerToken");
    } catch (error) {
      logError("Failed to retrieve token", error);
    }

    const baseOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      withCredentials: true,
      cancelToken: new axios.CancelToken((cancel) => {
        cancelTokenRef.current = cancel;
      }),
      ...options,
    };

    try {
      const url = `${baseApiUrl}/api${route}`;
      logInfo(`Request URL: ${url}`);

      const response = await axios(url, baseOptions);

      if (!response?.data) {
        throw new Error("Unexpected server error");
      }

      logInfo(`Response Data: ${JSON.stringify(response.data, null, 2)}`);

      if (response.data.success) {
        setData(response.data);
        onReceived(response.data);
      } else {
        throw new Error(
          response.data.error ||
            response.data.msg ||
            response.data.message ||
            "Unexpected server error",
        );
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        setError(new Error("Fetch was canceled"));
      } else {
        setError(
          new Error(
            error.response?.data?.msg || error.message || "Unexpected error",
          ),
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cancelFetch = () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current();
    }
  };

  useEffect(() => {
    return cancelFetch;
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
