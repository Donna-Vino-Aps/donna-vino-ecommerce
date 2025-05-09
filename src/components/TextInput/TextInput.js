import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiEye, FiEyeOff, FiCalendar } from "react-icons/fi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const TextInput = ({
  type = "text",
  name,
  label,
  placeholder = "",
  value,
  onChange,
  onBlur,
  icon,
  showPasswordToggle = false,
  isDate = false,
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
      <div className="mt-1 text-labelMedium text-others-negative">{error}</div>
    );
  };

  const renderHint = () => {
    if (!hint || error) return null;
    return (
      <div className="mt-1 text-labelMedium text-tertiary2-dark">{hint}</div>
    );
  };

  return (
    <div data-testid={`input-container-${name}`}>
      {/* Label for screen readers */}
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

      {/* Non-date or dropdown input */}
      {!isDate && !isDropdown ? (
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
              aria-labelledby={labelId}
              aria-label={visuallyHiddenLabel ? displayLabel : undefined}
              data-testid={`input-${name}`}
              className={`relative w-full rounded-lg border px-5 py-3 text-bodyLarge text-tertiary1-normal focus:outline-none focus:ring-1
              ${alternateBackground ? "bg-tertiary2-normal" : "bg-tertiary2-light"}
              ${error ? "border-others-negative focus:ring-primary-hover" : "border-tertiary2-normal focus:ring-tertiary2-darker"}
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
          {/* Error message */}
          {error && (
            <div className="mt-1 text-labelMedium text-others-negative">
              {error}
            </div>
          )}
          {hint && !error && (
            <div className="mt-1 text-labelMedium text-tertiary2-dark">
              {hint}
            </div>
          )}
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
            aria-labelledby={labelId}
            aria-label={visuallyHiddenLabel ? displayLabel : undefined}
            data-testid={`dropdown-${name}`}
            className={`w-full rounded-lg border px-5 py-[14px] font-barlow text-tertiary1-normal focus:outline-none focus:ring-1
              ${alternateBackground ? "bg-tertiary2-normal" : "bg-tertiary2-light"}
              ${error ? "border-others-negative focus:ring-primary-hover" : "border-tertiary2-normal focus:ring-tertiary1-active"}`}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Error message for dropdown */}
          {error && (
            <div className="mt-1 text-xs text-others-negative">{error}</div>
          )}
        </div>
      ) : (
        // DatePicker block
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
                      borderColor: error ? "#ED1C24" : "#F1F1F1",
                      borderRadius: "0.5rem",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: error ? "#ED1C24" : "#F1F1F1",
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

          {/* Error message for date input */}
          {error && (
            <div className="mt-1 text-labelMedium text-others-negative">
              {error}
            </div>
          )}
          {hint && !error && (
            <div className="mt-1 text-labelMedium text-tertiary2-dark">
              {hint}
            </div>
          )}
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
    PropTypes.instanceOf(Date),
  ]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  icon: PropTypes.element,
  showPasswordToggle: PropTypes.bool,
  isDate: PropTypes.bool,
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
  icon: null,
  showPasswordToggle: false,
  isDate: false,
  isDropdown: false,
  options: [],
  error: null,
  hint: null,
  alternateBackground: false,
  visuallyHiddenLabel: false,
};

export default TextInput;
