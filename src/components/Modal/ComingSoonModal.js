import React from "react";

import Button from "@/components/Button/Button.js";
import { useLanguage } from "@/context/LanguageContext";
import PropTypes from "prop-types";

const ComingSoonModal = ({ isOpen, onClose }) => {
  const { translations } = useLanguage();

  if (!isOpen) return null;
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-500 flex flex-col gap-y-4 justify-center items-center w-[22rem] sm:h-[26.25rem] sm:w-[33.125rem] bg-primary-light rounded-[20px]">
      <div className="bg-[#FF95004D] rounded-[37px] w-[3rem] h-[3rem] mt-4 sm:mt-0 sm:w-[3.75rem] sm:h-[3.75rem] justify-center items-center flex relative top-2 sm:top-0">
        <img src="/icons/warning.svg" />
      </div>
      <h1 className="text-headlineLarge sm:text-displaySmall text-roboto">
        {translations["modal.h1"]}
      </h1>
      <p className="px-6 sm:px-14 text-center text-bodySmall sm:text-bodyLarge relative bottom-2 sm:bottom-0">
        {translations["modal.p"]}
      </p>
      <div className="flex justify-center gap-4 mt-8 relative bottom-8 sm:bottom-2">
        <Button
          text={translations["modal.button-left"]}
          icon="/icons/close-white.svg"
          variant="redModal"
          testId="modal-button-close"
          ariaLabel={translations["modal.button-left"]}
          onClick={onClose}
        ></Button>
        <Button
          text={translations["modal.button-right"]}
          icon="/icons/phone-ring.svg"
          variant="darkGreenModal"
          testId="modal-button-contact"
          ariaLabel={translations["modal.button-right"]}
          linkUrl="/contact"
        ></Button>
      </div>
    </div>
  );
};

ComingSoonModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ComingSoonModal;
