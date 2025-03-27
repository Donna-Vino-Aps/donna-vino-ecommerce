/**
 * Utility functions for safely working with sessionStorage
 */

import { logError } from "./logging";

/**
 * Check if sessionStorage is available
 * @returns {boolean} - Whether sessionStorage is available
 */
const isSessionStorageAvailable = () => {
  return typeof window !== "undefined" && window.sessionStorage;
};

/**
 * Save a value to sessionStorage with error handling
 * @param {string} key - The key to store the value under
 * @param {any} value - The value to store (will be JSON.stringified if not a string)
 * @returns {boolean} - Whether the operation was successful
 */
export const setSessionItem = (key, value) => {
  if (!isSessionStorageAvailable()) return false;

  try {
    const valueToStore =
      typeof value === "string" ? value : JSON.stringify(value);
    sessionStorage.setItem(key, valueToStore);
    return true;
  } catch (error) {
    logError(`Error storing data in sessionStorage for key '${key}': ${error}`);
    return false;
  }
};

/**
 * Retrieve a value from sessionStorage with error handling
 * @param {string} key - The key to retrieve
 * @param {boolean} parseJson - Whether to parse the value as JSON
 * @returns {any} - The retrieved value or null if not found or error
 */
export const getSessionItem = (key, parseJson = false) => {
  if (!isSessionStorageAvailable()) return null;

  try {
    const item = sessionStorage.getItem(key);
    if (item === null) return null;

    return parseJson ? JSON.parse(item) : item;
  } catch (error) {
    logError(
      `Error retrieving data from sessionStorage for key '${key}': ${error}`,
    );
    return null;
  }
};

/**
 * Remove an item from sessionStorage
 * @param {string} key - The key to remove
 * @returns {boolean} - Whether the operation was successful
 */
export const removeSessionItem = (key) => {
  if (!isSessionStorageAvailable()) return false;

  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    logError(
      `Error removing data from sessionStorage for key '${key}': ${error}`,
    );
    return false;
  }
};

/**
 * Clear all items from sessionStorage
 * @returns {boolean} - Whether the operation was successful
 */
export const clearSessionStorage = () => {
  if (!isSessionStorageAvailable()) return false;

  try {
    sessionStorage.clear();
    return true;
  } catch (error) {
    logError(`Error clearing sessionStorage: ${error}`);
    return false;
  }
};

// Constants for commonly used keys to avoid string duplication
export const SESSION_KEYS = {
  PENDING_USER_EMAIL: "pendingUserEmail",
  // Add more keys as needed
};
