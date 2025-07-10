/**
 * Utility functions for safely working with localStorage
 */

import { logError } from "./logging";

/**
 * Check if localStorage is available
 * @returns {boolean} - Whether localStorage is available
 */
const isLocalStorageAvailable = () => {
  return typeof window !== "undefined" && window.localStorage;
};

/**
 * Save a value to localStorage with error handling
 * @param {string} key - The key to store the value under
 * @param {any} value - The value to store (will be JSON.stringified if not a string)
 * @returns {boolean} - Whether the operation was successful
 */
export const setLocalItem = (key, value) => {
  if (!isLocalStorageAvailable()) return false;

  try {
    const valueToStore =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
    return true;
  } catch (error) {
    logError(`Error storing data in localStorage for key '${key}': ${error}`);
    return false;
  }
};

/**
 * Retrieve a value from localStorage with error handling
 * @param {string} key - The key to retrieve
 * @param {boolean} parseJson - Whether to parse the value as JSON
 * @returns {any} - The retrieved value or null if not found or error
 */
export const getLocalItem = (key, parseJson = false) => {
  if (!isLocalStorageAvailable()) return null;

  try {
    const item = localStorage.getItem(key);
    if (item === null) return null;

    return parseJson ? JSON.parse(item) : item;
  } catch (error) {
    logError(
      `Error retrieving data from localStorage for key '${key}': ${error}`,
    );
    return null;
  }
};

/**
 * Remove an item from localStorage
 * @param {string} key - The key to remove
 * @returns {boolean} - Whether the operation was successful
 */
export const removeLocalItem = (key) => {
  if (!isLocalStorageAvailable()) return false;

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    logError(
      `Error removing data from localStorage for key '${key}': ${error}`,
    );
    return false;
  }
};

/**
 * Clear all items from localStorage
 * @returns {boolean} - Whether the operation was successful
 */
export const clearLocalStorage = () => {
  if (!isLocalStorageAvailable()) return false;

  try {
    localStorage.clear();
    return true;
  } catch (error) {
    logError(`Error clearing localStorage: ${error}`);
    return false;
  }
};

// Constants for commonly used keys to avoid string duplication
export const LOCAL_KEYS = {
  SHOPPING_CART: "donnaVinoCart",
};
