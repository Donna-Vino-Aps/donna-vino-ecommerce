import React from "react";
import PropTypes from "prop-types";

export default function DropdownButton({ onClick, ref }) {
  {
    /* User Icon Button */
  }
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="cursor-pointer hidden lg:block hover:opacity-85"
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
