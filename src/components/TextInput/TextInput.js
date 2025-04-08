import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash, FaCalendarAlt } from "react-icons/fa";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const TextInput = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  icon,
  showPasswordToggle = false,
  isDate = false,
  error,
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

  return (
    <div data-testid={`input-container-${name}`}>
      {/* Label for screen readers */}
      <label
        htmlFor={name}
        id={labelId}
        style={visuallyHiddenLabel ? visuallyHiddenLabelStyle : {}}
        className={visuallyHiddenLabel ? undefined : "block mb-1 font-medium"}
      >
        {placeholder || `Enter your ${name}`}
      </label>

      {/* Non-date input */}
      {!isDate ? (
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {React.cloneElement(icon, { style: { color: "black" } })}
            </div>
          )}

          <input
            type={getInputType()}
            name={name}
            id={name}
            placeholder=""
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-labelledby={labelId}
            aria-label={visuallyHiddenLabel ? undefined : placeholder}
            data-testid={`input-${name}`}
            className={`w-full py-3 px-5 border rounded-lg bg-white text-tertiary1-darker focus:outline-none focus:ring-1
              ${error ? "border-primary-normal focus:ring-primary-hover" : "border-tertiary2-active_normal focus:ring-tertiary1-active"}
              ${icon ? "pl-12" : ""}
              ${showPasswordToggle ? "pr-10" : ""}`}
          />

          {/* Password toggle */}
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              data-testid="toggle-password-visibility"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}

          {/* Error message */}
          {error && (
            <div className="text-xs text-primary-normal mt-1">{error}</div>
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
            data-testid={`datepicker-${name}`}
            slots={{
              openPickerIcon: () => <FaCalendarAlt size={16} color="#BFBEBE" />,
            }}
            slotProps={{
              textField: {
                placeholder: "DD/MM/YYYY",
                fullWidth: true,
                size: "medium",
                variant: "outlined",
                id: name,
                InputProps: {
                  id: name,
                },
                InputLabelProps: {
                  shrink: false,
                },
                sx: {
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: error ? "#ED1C24" : "#C1C1C1",
                      borderRadius: "0.5rem",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: error ? "#ED1C24" : "#C1C1C1",
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
            <div className="text-xs text-primary-normal mt-1">{error}</div>
          )}
        </div>
      )}
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
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
  error: PropTypes.string,
  visuallyHiddenLabel: PropTypes.bool,
};

TextInput.defaultProps = {
  type: "text",
  onBlur: () => {},
  icon: null,
  showPasswordToggle: false,
  isDate: false,
  error: null,
  visuallyHiddenLabel: false,
};

export default TextInput;
