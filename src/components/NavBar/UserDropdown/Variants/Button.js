import React from "react";
import PropTypes from "prop-types";

export default function MenuButton({ title, onClick, onClose }) {
  return (
    <div className="w-full flex justify-center">
      <button
        onClick={() => {
          onClick();
          onClose();
        }}
        className="w-fit max-w-max inline-block px-4 py-2 bg-primary-normal text-primary-light rounded hover:bg-primary-hover_normal"
      >
        {title}
      </button>
    </div>
  );
}

MenuButton.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
};
