import React from "react";
import PropTypes from "prop-types";

const AgeTooltip = ({ text }) => {
  return (
    <div className="relative mt-3 flex items-center md:mt-0">
      <div className="group relative flex items-center">
        <span className="flex size-5 cursor-pointer items-center justify-center rounded-full bg-primary-active_normal text-labelSmall font-medium text-tertiary2-light">
          ?
        </span>
        <div className="pointer-events-none absolute left-full top-1/2 z-10 w-[18rem] -translate-y-1/2 p-2 text-labelSmall font-medium text-primary-darker opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:w-[20rem]">
          <p dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
    </div>
  );
};

AgeTooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default AgeTooltip;
