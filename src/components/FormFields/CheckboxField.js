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
    <>
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-center space-x-3"
      >
        <input
          id={inputId}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          className={`size-4 rounded accent-secondary-normal md:size-5 ${
            error
              ? "border-primary-normal text-primary-normal"
              : "border-secondary-active text-secondary-active checked:border-secondary-dark checked:bg-secondary-active"
          } rounded-md bg-white transition-all duration-200 focus:ring-2 focus:ring-secondary-hover`}
        />
        {labelComponent || (
          <span className="text-bodyMedium text-secondary-dark sm:text-bodyLarge">
            {label}
          </span>
        )}
      </label>
      {error && <div className="text-xs text-primary-normal">{error}</div>}
    </>
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
