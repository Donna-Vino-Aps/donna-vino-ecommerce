import React from "react";
import PropTypes from "prop-types";

export default function DropdownButton({ onClick, ref }) {
  /* User Icon Button */
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="hidden cursor-pointer hover:opacity-85 lg:block"
      aria-label="User menu"
    >
      <img src="/icons/user-alt.svg" alt="User icon" aria-hidden="true" />
    </button>
  );
}

DropdownButton.propTypes = {
  onClick: PropTypes.func,
  ref: PropTypes.func,
};
