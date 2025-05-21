"use client";

import React from "react";
import PropTypes from "prop-types";

export default function Spinner({ size = "medium" }) {
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-10 w-10",
    large: "h-12 w-12",
  };

  const spinnerClass = `${sizeClasses[size] || sizeClasses.medium} animate-spin rounded-full border-4 border-primary-normal border-t-transparent`;

  return <div className={spinnerClass}></div>;
}

Spinner.propTypes = {
  size: PropTypes.string,
};
