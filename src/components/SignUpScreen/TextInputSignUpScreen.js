import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash, FaCalendarAlt } from "react-icons/fa";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const TextInputSignUpScreen = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  showPasswordToggle = false,
  isDate = false,
  error,
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

  return (
    <div data-testid={`input-container-${name}`}>
      <label htmlFor={name} id={labelId} style={visuallyHiddenLabelStyle}>
        {placeholder || `Enter your ${name}`}
      </label>

      {!isDate ? (
        <div>
          <div className="relative">
            <input
              type={showPasswordToggle && showPassword ? "text" : type}
              name={name}
              id={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              aria-labelledby={labelId}
              data-testid={`input-${name}`}
              className={`w-full py-3 px-5 border ${
                error
                  ? "border-primary-normal focus:ring-primary-hover"
                  : "border-tertiary2-active_normal focus:ring-tertiary1-active"
              } rounded-lg bg-white text-tertiary1-darker focus:outline-none focus:ring-1 ${
                showPasswordToggle ? "pr-10" : ""
              }`}
            />
            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                data-testid="toggle-password-visibility"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <FaEyeSlash color="#BFBEBE" />
                ) : (
                  <FaEye color="#BFBEBE" />
                )}
              </button>
            )}
          </div>
          {error && (
            <div className="text-xs text-primary-normal mt-1">{error}</div>
          )}
        </div>
      ) : (
        <div>
          <DatePicker
            value={value ? dayjs(value) : null}
            onChange={(newValue) => onChange(newValue)}
            disableFuture
            format="DD/MM/YYYY"
            aria-labelledby={labelId}
            inputProps={{
              id: name,
            }}
            data-testid={`datepicker-${name}`}
            slots={{
              openPickerIcon: () => <FaCalendarAlt size={16} color="#BFBEBE" />,
            }}
            slotProps={{
              textField: {
                placeholder,
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
                      borderWidth: "1px",
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
                    "&:hover": {
                      backgroundColor: "#F9B9BB",
                    },
                    "&:focus": {
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
          {error && (
            <div className="text-xs text-primary-normal mt-1">{error}</div>
          )}
        </div>
      )}
    </div>
  );
};

TextInputSignUpScreen.propTypes = {
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
  showPasswordToggle: PropTypes.bool,
  isDate: PropTypes.bool,
  error: PropTypes.string,
};

TextInputSignUpScreen.defaultProps = {
  type: "text",
  onBlur: () => {},
  showPasswordToggle: false,
  isDate: false,
  error: null,
};

export default TextInputSignUpScreen;
