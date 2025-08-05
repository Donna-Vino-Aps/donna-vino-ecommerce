import React from "react";
import PropTypes from "prop-types";

export default function Pairing({ title, imageUrl, description }) {
  return (
    <div className="mx-2 flex h-[20rem] w-[17.25rem] flex-col items-center justify-center">
      <div className="relative flex h-52 w-52 items-center justify-center">
        <div className="absolute h-40 w-40 rotate-[23deg] rounded-2xl bg-primary-active_normal bg-opacity-30"></div>
        <img
          alt={title}
          src={imageUrl}
          className="z-20 size-40 rounded-2xl object-cover"
        />
      </div>
      <div>
        <p className="mb-4 mt-10 font-barlow text-labelXLarge text-tertiary1-active_dark">
          {title}
        </p>
        <p className="text-bodyLarge text-primary-text_color md:text-tertiary1-dark">
          {description}
        </p>
      </div>
    </div>
  );
}

Pairing.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
