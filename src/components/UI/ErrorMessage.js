"use client";

import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ message, className = "" }) => {
  return (
    <div className={`text-center text-others-negative ${className}`}>
      <p>{message}</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ErrorMessage;
