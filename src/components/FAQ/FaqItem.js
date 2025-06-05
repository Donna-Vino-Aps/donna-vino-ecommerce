import React, { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import PropTypes from "prop-types";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile(768);
  return (
    <div
      className={`mx-auto mb-3 flex cursor-pointer flex-col rounded-lg border-tertiary2-hover_normal bg-tertiary2-normal ${isMobile ? "h-[4.5rem] w-[18.5rem]" : "h-[3.25rem] w-[48.125rem]"}`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="mt-4 flex w-full items-center justify-between px-4">
        <h4 className="text-labelXLarge font-semibold">{question}</h4>
        <img src="/icons/chevron-down.svg" className="h-5 w-5" />
      </div>
      {isOpen && <p className=" mt-2">{answer}</p>}
    </div>
  );
};

export default FaqItem;

// Props validation
FaqItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};
