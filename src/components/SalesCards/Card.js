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
    <div className="flex h-full w-full flex-col justify-between rounded-2xl border border-primary-active bg-white px-2 pb-4 pt-2 md:px-4 md:pb-6 md:pt-4">
      <div className="flex items-center gap-4 px-4">
        <img className="size-8 md:size-12" src={src} alt="cardImg" />
        <p className="py-2 text-titleMedium md:text-headlineSmall">{title}</p>
      </div>
      <div className="my-4 flex flex-col gap-4 px-4 text-bodySmall text-tertiary1-darker md:my-8 md:text-bodyLarge">
        <p dangerouslySetInnerHTML={{ __html: description1 }} />
        <p dangerouslySetInnerHTML={{ __html: description2 }} />
      </div>
      <Link
        className="px-4 py-2 text-bodyMedium text-primary-normal md:text-bodyLarge"
        href={url}
      >
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
