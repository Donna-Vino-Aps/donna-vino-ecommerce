import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

export default function MenuLink({ image, url, title, onClose }) {
  return (
    <>
      <img
        src={image.src}
        alt={image.alt}
        className="relative bottom-[1px]"
      ></img>
      <Link href={url} onClick={onClose}>
        {title}
      </Link>
    </>
  );
}

MenuLink.propTypes = {
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
