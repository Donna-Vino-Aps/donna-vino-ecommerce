import React, { useState } from "react";
import PropTypes from "prop-types";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`mx-auto mb-3 flex cursor-pointer flex-col rounded-lg border border-solid border-tertiary2-hover_normal ${isOpen ? "bg-transparent" : "bg-tertiary2-normal"} w-[18.5rem] md:w-[42.125rem] lg:w-[48.125rem]`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="my-3 flex w-full items-center justify-between px-4 py-[3px]">
        <h4 className="pr-2 text-labelLarge font-semibold md:text-labelXLarge">
          {question}
        </h4>
        <img
          src={isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
          className="h-5 w-5"
        />
      </div>
      {isOpen && <p className="mb-4 px-4">{answer}</p>}
    </div>
  );
};

export default FaqItem;

// Props validation
FaqItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};
