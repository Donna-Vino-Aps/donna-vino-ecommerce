import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";

export default function Card({
  src,
  title,
  description1,
  description2,
  urlTitle,
  url,
}) {
  return (
    <div className="w-full h-full flex flex-col justify-between rounded-2xl px-4 pt-4 pb-6 bg-white border border-primary-active">
      <div className="flex gap-4 items-center px-4">
        <img className="size-12" src={src} alt="" />
        <p className="text-titleMedium md:text-headlineSmall">{title}</p>
      </div>
      <div className="flex flex-col text-tertiary1-darker px-4 my-8 gap-4 text-bodySmall md:text-bodyLarge">
        <p dangerouslySetInnerHTML={{ __html: description1 }} />
        <p dangerouslySetInnerHTML={{ __html: description2 }} />
      </div>
      <Link className="px-4 py-2 text-primary-normal" href={url}>
        {urlTitle}
      </Link>
    </div>
  );
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  description1: PropTypes.string.isRequired,
  description2: PropTypes.string.isRequired,
  urlTitle: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
