import React from "react";

import Button from "@/components/Button/Button.js";
import { useLanguage } from "@/context/LanguageContext";
import PropTypes from "prop-types";

const ComingSoonModal = ({ isOpen, onClose }) => {
  const { translations } = useLanguage();

  if (!isOpen) return null;
  return (
    <div className="fixed left-1/2 top-1/2 z-[500] flex w-[22rem] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-y-4 rounded-[20px] bg-primary-light sm:h-[26.25rem] sm:w-[33.125rem]">
      <div className="relative top-2 mt-4 flex h-[3rem] w-[3rem] items-center justify-center rounded-[37px] bg-[#FF95004D] sm:top-0 sm:mt-0 sm:h-[3.75rem] sm:w-[3.75rem]">
        <img src="/icons/warning.svg" />
      </div>
      <h1 className="font-roboto text-headlineLarge sm:text-displaySmall">
        {translations["modal.h1"]}
      </h1>
      <p className="relative bottom-2 px-6 text-center text-bodySmall sm:bottom-0 sm:px-14 sm:text-bodyLarge">
        {translations["modal.p"]}
      </p>
      <div className="relative bottom-8 mt-8 flex justify-center gap-4 sm:bottom-2">
        <Button
          text={translations["modal.button-left"]}
          icon="/icons/close-white.svg"
          size={{ md: "wide", sm: "small" }}
          extraStyle="min-w-[5.6rem] h-[2.4rem] text-bodyMedium sm:text-bodyLarge sm:h-[3rem]"
          testId="modal-button-close"
          ariaLabel={translations["modal.button-left"]}
          onClick={onClose}
        ></Button>
        <Button
          text={translations["modal.button-right"]}
          icon="/icons/phone-ring.svg"
          color="secondaryDark"
          size={{ md: "wide", sm: "large" }}
          extraStyle="h-[2.4rem] text-bodyMedium sm:text-bodyLarge sm:h-[3rem] sm:h-100 min-w-[8.8rem]"
          testId="modal-button-contact"
          ariaLabel={translations["modal.button-right"]}
          linkUrl="https://www.donnavino.dk/contact"
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
