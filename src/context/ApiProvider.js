"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import React from "react";
import PropTypes from "prop-types";
import { useSession } from "next-auth/react";
import { logError } from "@/utils/logging";
import { useLanguage } from "@/context/LanguageContext";

// Context to share API methods (get, post, put, del), loading state, and error handling
const APIProviderContext = createContext(null);

/**
 * Constructs a valid URL by combining a base URL and a path.
 * Handles redundant or missing slashes gracefully.
 *
 * @param {string} baseUrl - The base API host URL.
 * @param {string} path - The path to append to the base URL.
 * @returns {string} - A well-formed full URL.
 */
const makeUrl = (baseUrl, path) => {
  if (path.startsWith("http")) return path;

  if (baseUrl.endsWith("/") && path.startsWith("/")) {
    return `${baseUrl}${path.slice(1)}`;
  }
  if (baseUrl.endsWith("/") || path.startsWith("/")) {
    return `${baseUrl}${path}`;
  }

  return `${baseUrl}/${path}`;
};

/**
 * APIProvider component provides a context for making API requests and managing loading/errors.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Components that consume the API context.
 * @returns {JSX.Element}
 */
export const APIProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState();
  const { translations } = useLanguage();

  const { data: session, status } = useSession();

  /**
   * Sets the default API URL from environment variables on initial render.
   * useEffect is used here because it runs after the component mounts.
   */
  useEffect(() => {
    if (apiUrl) return;

    const apiHost =
      process.env.NEXT_PUBLIC_API_URL_LOCAL ||
      process.env.NEXT_PUBLIC_API_URL_HEROKU;

    setApiUrl(makeUrl(apiHost, "/api"));
  }, [apiUrl]); // Dependency ensures this runs only once unless apiUrl is changed.

  /**
   * Ensures that required headers like Authorization and Content-Type are added to each request.
   * useCallback is used to memoize the function so it doesn't get recreated on every render,
   * which helps avoid unnecessary re-renders of components that depend on it.
   *
   * @param {object} headers - Request headers object to update.
   * @returns {object} - Updated headers.
   */
  const updateMandatoryHeaders = useCallback(
    (headers, body) => {
      if (!headers["Authorization"] && status === "authenticated") {
        headers["Authorization"] = `Bearer ${session.accessToken}`;
      }

      // Only set Content-Type if not already set and body is not FormData
      if (!headers["Content-Type"] && !(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      return headers;
    },
    [session, status], // Dependencies ensure headers are updated correctly if session/status changes.
  );

  /**
   * Parses the API response and handles errors.
   *
   * @param {Response} response - The fetch response object.
   * @returns {Promise<any>} - The parsed JSON response.
   */
  const processResponse = async (response) => {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      if (!response.ok || data.status === "error") {
        const errorMessage = data.message || translations["api.error.default"];
        setError(errorMessage);
        return null;
      }
      setError(null);
      return data;
    } else {
      // Non-JSON response handling
      const text = await response.text();

      if (!response.ok) {
        setError(text || translations["api.error.default"]);
        return null;
      }
      setError(null);
      return text;
    }
  };

  /**
   * Executes an API request using the provided HTTP method, path, and options.
   *
   * @param {string} method - HTTP method (GET, POST, PUT, DELETE).
   * @param {string} path - API endpoint path.
   * @param {object} [options] - Request options.
   * @param {object} [options.payload] - JSON payload to send in POST or PUT requests.
   * @param {object} [options.body] - Alternative to `payload` if directly passing body.
   * @param {object} [options.headers] - Additional request headers.
   * @returns {Promise<any|null>} - API response or null on error.
   *
   * useCallback is used to avoid recreating the function on every render.
   */
  const execute = useCallback(
    async (method, path, options = {}) => {
      setIsLoading(true);
      setError(null);

      const body = options.payload || options.body;
      const headers = options.headers || {};

      updateMandatoryHeaders(headers, body);

      try {
        const res = await fetch(makeUrl(apiUrl, path), {
          method: method,
          body: body instanceof FormData ? body : JSON.stringify(body),
          headers,
        });

        return await processResponse(res);
      } catch (err) {
        logError(`API ${method} request to ${path} failed:`, err);

        let errorMessage;

        // Network connectivity issues
        if (!navigator.onLine) {
          errorMessage = translations["api.error.offline"];
        }
        // Server unreachable errors
        else if (
          err.message.includes("Failed to fetch") ||
          err.message.includes("NetworkError") ||
          err.message.includes("Network request failed")
        ) {
          errorMessage = translations["api.error.serverDown"];
        }
        // Any other network/connection errors
        else {
          errorMessage = translations["api.error.connectionFailed"];
        }

        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl, updateMandatoryHeaders], // Recreate only when apiUrl or header logic changes.
  );

  // Shorthand methods for common HTTP verbs
  const get = (path, options) => execute("GET", path, options);
  const post = (path, options) => execute("POST", path, options);
  const put = (path, options) => execute("PUT", path, options);
  const del = (path, options) => execute("DELETE", path, options);

  return (
    <APIProviderContext.Provider
      value={{ get, post, put, del, isLoading, error }}
    >
      {children}
    </APIProviderContext.Provider>
  );
};

APIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to access the APIProvider context.
 * Ensures that it is only used within an APIProvider.
 *
 * @throws Will throw an error if used outside of APIProvider.
 * @returns {object} - API methods and state.
 */
export const useAPI = () => {
  const context = useContext(APIProviderContext);
  if (!context) {
    throw new Error("useAPI must be used within an APIProvider");
  }
  return context;
};

export default APIProvider;
