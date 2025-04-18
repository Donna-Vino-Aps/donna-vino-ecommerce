import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

export default function MenuLink({ image, url, title, onClose }) {
  return (
    <Link
      className="flex w-full md:min-w-[10rem] gap-2 text-nowrap hover:bg-primary-light rounded-md p-2 transition duration-200"
      href={url}
      onClick={onClose}
    >
      <img src={image.src} alt={image.alt} className="w-3" />
      <span>{title}</span>
    </Link>
  );
}

MenuLink.propTypes = {
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};
