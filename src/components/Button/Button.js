"use client";

import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import clsx from "clsx";

const BASE_BUTTON_CLASSES = `
  flex justify-center items-center rounded-[0.3rem]
`;

const SIZES = {
  sm: "h-[2rem] text-bodyMedium",
  md: "h-[2.5rem] text-titleMedium",
  lg: "h-[3rem] text-titleLarge",
};

const WIDTHS = {
  small: "w-[7.375rem]",
  medium: "w-[8.3rem]",
  large: "w-[10.8rem]",
  wide: "w-[15.4rem]",
  auto: "w-auto",
  full: "w-full",
};

const COLORS = {
  primary: "bg-primary-normal hover:bg-primary-hover_normal text-primary-light",
  primaryActive:
    "bg-primary-active hover:bg-primary-normal hover:bg-opacity-40 text-primary-active_dark font-semibold",
  transparent:
    "bg-transparent hover:bg-primary-hover text-primary-active_normal",
  secondaryDark: "bg-secondary-darker hover:bg-secondary-hover_dark text-white",
  secondary:
    "bg-secondary-normal hover:bg-secondary-hover_normal text-white font-barlow font-semibold",
  disabled:
    "bg-primary-disabled hover:bg-primary-disabled text-primary-disabled_dark cursor-not-allowed",
};

const VARIANT = {
  outline: "border-2",
  rounded: "rounded-lg",
  roundedSmall: "rounded-[0.375rem]",
  solid: "rounded-[0rem]",
};

const BORDERS = {
  primary: "border-primary-active_normal",
  secondary: "border-secondary-normal",
};

const Button = ({
  text,
  icon,
  color = "primary",
  size = "md",
  width = "medium",
  variant = "",
  border = "",
  extraStyle = "font-medium",
  onClick,
  disabled = false,
  ariaLabel,
  testId,
  isLoading = false,
  linkUrl,
  linkWidth,
}) => {
  const buttonClass = clsx(
    BASE_BUTTON_CLASSES,
    SIZES[size],
    WIDTHS[width],
    VARIANT[variant],
    BORDERS[border],
    extraStyle,
    disabled || isLoading ? COLORS.disabled : COLORS[color],
  );
  const buttonContent = (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      data-testid={linkUrl ? undefined : testId}
      type={variant === "submit" ? "submit" : "button"}
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
    <Link href={linkUrl} data-testid={testId} className={linkWidth}>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(COLORS)),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  width: PropTypes.oneOf(["small", "medium", "large", "wide", "auto", "full"]),
  variant: PropTypes.oneOf(Object.keys(VARIANT)),
  border: PropTypes.oneOf(Object.keys(BORDERS)),
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
