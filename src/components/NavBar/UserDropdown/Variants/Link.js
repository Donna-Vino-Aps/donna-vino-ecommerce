import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

export default function MenuLink({ image, url, title, onClose }) {
  return (
    <Link
      className="flex w-full gap-2 text-nowrap rounded-md p-2 transition duration-200 hover:bg-primary-light md:min-w-[10rem]"
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
