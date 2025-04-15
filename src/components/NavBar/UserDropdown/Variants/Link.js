import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

export default function MenuLink({ image, url, title, onClose }) {
  return (
    <div className="flex gap-2 hover:bg-primary-light rounded-md p-2 transition duration-200">
      <img src={image.src} alt={image.alt} className="relative"></img>
      <Link href={url} onClick={onClose}>
        {title}
      </Link>
    </div>
  );
}

MenuLink.propTypes = {
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};
