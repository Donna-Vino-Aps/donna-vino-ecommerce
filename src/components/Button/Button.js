"use client";

import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const BASE_BUTTON_CLASSES = `
  flex justify-center items-center h-[2.875rem] rounded-[0.3rem] text-bodyLarge 
`;

const SIZE = {
  sm: {
    small: "sm:w-[7.375rem]",
    medium: "sm:w-[8.3rem]",
    large: "sm:w-[10.8rem]",
  },
  md: {
    medium: "w-[8.3rem]",
    large: "w-[15.4rem]",
    wide: "w-full",
  },
};

const COLORS = {
  primary: "bg-primary-normal hover:bg-primary-hover_normal text-primary-light",
  primaryActive:
    "bg-primary-active hover:bg-primary-normal hover:bg-opacity-40 text-primary-active_dark font-semibold",
  transparent:
    "bg-transparent hover:bg-primary-hover text-primary-active_normal",
  secondaryDark: "bg-secondary-darker hover:bg-secondary-hover_dark text-white",
  secondaryLight:
    "bg-secondary-light hover:bg-secondary-hover text-secondary-darker",
  green: "bg-[#183F27] hover:bg-[#153823] text-white font-barlow font-semibold",
  tertiary: "bg-tertiary1-normal hover:bg-tertiary1-dark text-tertiary1-light",
  yellow: "bg-[#F59E0B] opacity-85 hover:opacity-100 text-primary-light",
  disabled:
    "bg-primary-disabled hover:bg-primary-disabled text-primary-disabled_dark cursor-not-allowed",
};

const VARIANT = {
  outlineRed: "border-2 border-primary-active_normal",
  radiuslg: "rounded-lg",
  outlineGreen: "border-2 border-[#183F27]",
  solid: "rounded-[0rem]",
};

const Button = ({
  text,
  icon,
  color = "primary",
  size = {},
  variant = "",
  extraStyle = "",
  onClick,
  disabled = false,
  ariaLabel,
  testId,
  isLoading = false,
  linkUrl,
  linkWidth,
}) => {
  const buttonClass = `
  ${BASE_BUTTON_CLASSES} 
  ${COLORS[color] || ""}
  ${SIZE.md[size.md] || ""}
  ${SIZE.sm[size.sm] || ""}
  ${VARIANT[variant] || ""}
  ${extraStyle || ""}
  ${disabled || isLoading ? COLORS.disabled : ""}
`.trim();

  const buttonContent = (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      data-testid={linkUrl ? undefined : testId}
      //type={variant === "submit" ? "submit" : "button"}
    >
      {isLoading ? (
        "Submitting..."
      ) : (
        <>
          {icon && (
            <img src={icon} alt="Icon" className="mr-2" loading="lazy" />
          )}
          {text}
        </>
      )}
    </button>
  );

  return linkUrl ? (
    <Link
      href={linkUrl}
      data-testid={testId}
      className={linkWidth || "w-full sm:w-[10.8rem]"}
    >
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.object,
  variant: PropTypes.string,
  extraStyle: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  testId: PropTypes.string,
  isLoading: PropTypes.bool,
  linkUrl: PropTypes.string,
  linkWidth: PropTypes.string,
};

export default Button;
