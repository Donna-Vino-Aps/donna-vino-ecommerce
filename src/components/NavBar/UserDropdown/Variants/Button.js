import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

export default function MenuButton({ title, image, onClick, onClose }) {
  return (
    <Link
      onClick={(event) => {
        event.preventDefault();
        onClick();
        onClose();
      }}
      href="#"
      className="flex w-full gap-2 text-nowrap hover:bg-primary-light rounded-md p-2 transition duration-200"
    >
      {image && image.src && (
        <img src={image.src} alt={image.alt || ""} className="relative w-3" />
      )}
      <span>{title}</span>
    </Link>
  );
}

MenuButton.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
};
