"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`mx-auto flex flex-col rounded-lg border border-solid border-tertiary2-hover_normal ${isOpen ? "bg-transparent" : "bg-tertiary2-normal"} w-full px-4 transition-all duration-700 ease-in-out sm:mx-8 sm:min-w-[18.5rem] sm:max-w-[48.125rem]`}
    >
      <div
        className={`${isOpen ? "mt-3" : "my-3"} flex w-full cursor-pointer items-center justify-between py-[3px] transition-all duration-300 ease-in-out`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h4 className="pr-2 text-labelLarge font-medium md:text-titleMedium">
          {question}
        </h4>
        <Image
          src={isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
          width={20}
          height={20}
          alt={isOpen ? "Close dropdown button" : "Open dropdown button"}
          className="h-5 w-5"
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "mb-4 mt-1 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-bodySmall sm:text-bodyMedium">{answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;

// Props validation
FaqItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};
