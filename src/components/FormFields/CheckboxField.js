import React from "react";
import PropTypes from "prop-types";

const CheckboxField = ({
  name,
  checked,
  onChange,
  onBlur,
  label,
  error,
  labelComponent,
}) => {
  const inputId = `checkbox-${name}`;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-center gap-2"
      >
        <div className="relative flex items-center justify-center">
          <input
            id={inputId}
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            className="peer sr-only"
          />

          {/* Custom checkbox appearance */}
          <div
            className={`relative flex h-4 w-4 items-center justify-center rounded border transition-all duration-200 md:h-5 md:w-5 ${
              error
                ? "border-others-negative peer-focus:border-others-negative"
                : checked
                  ? "border-secondary-normal bg-secondary-normal peer-focus:border-tertiary2-darker"
                  : "border-tertiary1-light peer-focus:border-tertiary2-darker"
            }`}
          >
            {/* Checkmark */}
            {checked && (
              <svg
                className="h-3 w-3 text-tertiary2-light md:h-3.5 md:w-3.5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 10L8 15L17 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>

        {labelComponent || (
          <span className="text-labelSmall text-secondary-dark sm:text-bodyLarge">
            {label}
          </span>
        )}
      </label>

      {error && (
        <div className="text-labelSmall text-others-negative sm:text-labelMedium">
          {error}
        </div>
      )}
    </div>
  );
};

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.string,
  labelComponent: PropTypes.node,
};

CheckboxField.defaultProps = {
  checked: false,
  onBlur: () => {},
  label: "",
  error: null,
  labelComponent: null,
};

export default CheckboxField;
