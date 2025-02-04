import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AdapterDateFns from "@mui/x-date-pickers/AdapterDateFns"; // or any other adapter based on your preference

const TextInputSignUpScreen = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  icon,
  showPasswordToggle = false,
  isDate = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      {icon && !isDate && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {React.cloneElement(icon, { style: { color: "black" } })}
        </div>
      )}

      {!isDate ? (
        <input
          type={showPasswordToggle && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full p-3 ${icon ? "pl-12" : "pl-3"} border border-tertiary1-darker rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-light`}
        />
      ) : (
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
              {icon}
            </div>
          )}

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={value}
              onChange={onChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  placeholder={placeholder}
                  className="w-full p-3 pl-12 border border-tertiary1-darker rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                />
              )}
              inputFormat="MM/dd/yyyy"
            />
          </LocalizationProvider>
        </div>
      )}

      {showPasswordToggle && !isDate && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
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
  icon: PropTypes.element,
  showPasswordToggle: PropTypes.bool,
  isDate: PropTypes.bool,
};

TextInputSignUpScreen.defaultProps = {
  type: "text",
  onBlur: () => {},
  icon: null,
  showPasswordToggle: false,
  isDate: false,
};

export default TextInputSignUpScreen;
