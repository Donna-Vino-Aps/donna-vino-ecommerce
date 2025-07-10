import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`mx-auto flex flex-col rounded-lg border border-solid border-tertiary2-hover_normal ${isOpen ? "bg-transparent" : "bg-tertiary2-normal"} w-full sm:max-w-[48.125rem] max-w-[18.5rem] sm:min-w-[18.5rem] sm:mx-8 px-4`}
    >
      <article
        className="my-3 flex w-full cursor-pointer items-center justify-between py-[3px]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h4 className="pr-2 text-labelLarge font-semibold md:text-labelXLarge">
          {question}
        </h4>
        <Image
          src={isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
          width={20}
          height={20}
          alt={isOpen ? "Close dropdown button" : "Open dropdown button"}
          className="h-5 w-5"
        />
      </article>
      {isOpen && <p className="mb-4">{answer}</p>}
    </div>
  );
};

export default FaqItem;

// Props validation
FaqItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};
