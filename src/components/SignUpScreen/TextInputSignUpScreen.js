import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
          <DatePicker
            selected={value}
            onChange={onChange}
            className="w-full p-3 pl-12 border border-tertiary1-darker rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
            placeholderText={placeholder}
            dateFormat="EEE MMM dd yyyy"
            isClearable
          />
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
