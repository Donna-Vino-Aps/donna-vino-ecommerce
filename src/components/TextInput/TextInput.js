import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiEye, FiEyeOff, FiCalendar } from "react-icons/fi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";

const TextInput = ({
  type = "text",
  name,
  label,
  placeholder = "",
  value,
  onChange,
  onBlur,
  disabled,
  icon,
  showPasswordToggle = false,
  isDate = false,
  hasDatePicker = false,
  isDropdown = false,
  options = [],
  error,
  hint,
  alternateBackground = false,
  visuallyHiddenLabel = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const labelId = `${name}-label`;

  const visuallyHiddenLabelStyle = {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    width: "1px",
    whiteSpace: "nowrap",
  };

  const getInputType = () => {
    if (showPasswordToggle && showPassword) return "text";
    return type;
  };

  const displayLabel =
    label || (name ? name.charAt(0).toUpperCase() + name.slice(1) : "");

  const renderError = () => {
    if (!error) return null;
    return (
      <div className="mx-0.5 mt-1 text-labelSmall text-others-negative sm:text-labelMedium">
        {error}
      </div>
    );
  };

  const renderHint = () => {
    if (!hint || error) return null;
    return (
      <div className="mx-0.5 mt-1 text-labelSmall text-tertiary2-dark sm:text-labelMedium">
        {hint}
      </div>
    );
  };

  return (
    <div data-testid={`input-container-${name}`}>
      <label
        htmlFor={name}
        id={labelId}
        style={visuallyHiddenLabel ? visuallyHiddenLabelStyle : {}}
        className={
          visuallyHiddenLabel
            ? undefined
            : "mb-2 block text-labelMedium font-medium"
        }
      >
        {displayLabel}
      </label>

      {/* Regular input (not date or dropdown) */}
      {!isDate && !hasDatePicker && !isDropdown ? (
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 transform">
              {React.cloneElement(icon, { style: { color: "black" } })}
            </div>
          )}
          <div className="relative">
            <input
              type={getInputType()}
              name={name}
              id={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              aria-labelledby={labelId}
              aria-label={visuallyHiddenLabel ? displayLabel : undefined}
              data-testid={`input-${name}`}
              autoComplete={
                type === "password" && name === "confirmPassword"
                  ? "new-password"
                  : type === "password"
                    ? "current-password"
                    : name === "email" || name === "confirmEmail"
                      ? "email"
                      : name === "firstName"
                        ? "given-name"
                        : name === "lastName"
                          ? "family-name"
                          : name === "birthdate"
                            ? "bday"
                            : "on"
              }
              className={`relative w-full rounded-lg border px-4 py-3 text-bodyLarge text-tertiary1-normal focus:outline-none
              ${value && value.toString().trim() !== "" ? "bg-white" : alternateBackground ? "bg-tertiary2-normal" : "bg-tertiary2-light"}
              ${error ? "border-others-negative focus:border-others-negative" : "border-tertiary2-normal focus:border-tertiary2-darker"}
              ${icon ? "pl-12" : ""} ${showPasswordToggle ? "pr-10" : ""}`}
            />

            {/* Password toggle */}
            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                data-testid="toggle-password-visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-tertiary2-active_dark"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            )}
          </div>
          {renderError()}
          {renderHint()}
        </div>
      ) : isDropdown ? (
        // Dropdown input
        <div className="relative">
          <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            aria-labelledby={labelId}
            aria-label={visuallyHiddenLabel ? displayLabel : undefined}
            data-testid={`dropdown-${name}`}
            className={`w-full rounded-lg border px-5 py-[14px] font-barlow text-tertiary1-normal focus:outline-none
              ${alternateBackground ? "bg-tertiary2-normal" : "bg-tertiary2-light"}
              ${error ? "border-others-negative focus:border-others-negative" : "border-tertiary2-normal focus:border-tertiary2-darker"}`}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {renderError()}
          {renderHint()}
        </div>
      ) : isDate ? (
        <div>
          <DateField
            name={name}
            value={value ? dayjs(value) : null}
            onChange={onChange}
            onBlur={onBlur}
            disableFuture
            format="DD/MM/YYYY"
            aria-labelledby={labelId}
            aria-label={visuallyHiddenLabel ? displayLabel : undefined}
            data-testid={`datefield-${name}`}
            slotProps={{
              textField: {
                placeholder: placeholder,
                fullWidth: true,
                variant: "outlined",
                error: Boolean(error),
                id: name,
                sx: {
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0.5rem",
                    backgroundColor: alternateBackground
                      ? "#f1f1f1"
                      : "#fefefe",
                    height: "3.125rem",
                    "& fieldset": {
                      borderColor: error ? "#FF3B30" : "#F1F1F1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: error ? "#FF3B30" : "#bfbebe",
                      borderWidth: "1px !important",
                    },
                    "&.Mui-error fieldset": {
                      borderColor: "#FF3B30 !important",
                      borderWidth: "1px !important",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "0.75rem 1rem",
                      fontFamily: "inherit",
                      fontSize: "16px",
                      color: "#2F2E2E",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#B5B5B5",
                    fontFamily: "inherit",
                    fontSize: "16px",
                  },
                },
              },
              field: {
                shouldRespectLeadingZeros: true,
              },
            }}
          />
          {renderError()}
          {renderHint()}
        </div>
      ) : (
        // DatePicker (with calendar popup)
        <div>
          <DatePicker
            value={value ? dayjs(value) : null}
            onChange={(newValue) => onChange(newValue)}
            disableFuture
            format="DD/MM/YYYY"
            aria-labelledby={labelId}
            aria-label={visuallyHiddenLabel ? displayLabel : undefined}
            data-testid={`datepicker-${name}`}
            slots={{
              openPickerIcon: () => <FiCalendar size={16} color="#6C6C6C" />,
            }}
            slotProps={{
              textField: {
                placeholder: placeholder,
                fullWidth: true,
                size: "medium",
                variant: "outlined",
                id: name,
                error: Boolean(error),
                InputProps: {
                  id: name,
                  "aria-labelledby": labelId,
                  "aria-label": visuallyHiddenLabel ? displayLabel : undefined,
                },
                InputLabelProps: {
                  shrink: false,
                },
                sx: {
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: error ? "#FF3B30" : "#F1F1F1",
                      borderRadius: "0.5rem",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: error ? "#FF3B30" : "#F1F1F1",
                      boxShadow: error
                        ? "0 0 0 1px #FCA5A5"
                        : "0 0 0 1px #BFBEBE",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "0.75rem 1rem 0.75rem 1.25rem",
                      fontFamily: "inherit",
                      fontSize: "16px",
                      color: "#101010",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    opacity: 0.45,
                    color: "#101010",
                    fontFamily: "inherit",
                    fontSize: "16px",
                  },
                  "& .MuiInputLabel-root": {
                    display: "none",
                  },
                },
              },
              popper: {
                sx: {
                  "& .MuiPaper-root": {
                    borderRadius: "0.5rem",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  },
                  "& .MuiPickersDay-root.Mui-selected": {
                    color: "#101010",
                    backgroundColor: "#F9B9BB",
                    "&:hover, &:focus": {
                      backgroundColor: "#F9B9BB",
                    },
                  },
                  "& .MuiPickersDay-root.Mui-focused": {
                    backgroundColor: "transparent",
                    border: "1px solid #F9B9BB",
                  },
                },
              },
            }}
          />
          {renderError()}
          {renderHint()}
        </div>
      )}
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object, // For date objects and dayjs objects
  ]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.element,
  showPasswordToggle: PropTypes.bool,
  isDate: PropTypes.bool,
  hasDatePicker: PropTypes.bool,
  isDropdown: PropTypes.bool,
  options: PropTypes.array,
  error: PropTypes.string,
  hint: PropTypes.string,
  alternateBackground: PropTypes.bool,
  visuallyHiddenLabel: PropTypes.bool,
};

TextInput.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  value: "",
  onBlur: () => {},
  disabled: false,
  icon: null,
  showPasswordToggle: false,
  isDate: false,
  hasDatePicker: false,
  isDropdown: false,
  options: [],
  error: null,
  hint: null,
  alternateBackground: false,
  visuallyHiddenLabel: false,
};

export default TextInput;
