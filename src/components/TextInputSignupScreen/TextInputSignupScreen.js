import React from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";

const TextInputSignupScreen = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isDate,
  showDatePicker,
  name,
  errors,
  touched,
  ...textInputProps
}) => {
  const hasError = touched[name] && errors[name]; // Error logic

  return (
    <div className="relative mb-6">
      {/* Icon */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        {icon === "calendar" ? (
          <AiOutlineCalendar size={22} color="gray" />
        ) : (
          <i className={`icon-${icon} text-gray-600`} />
        )}
      </div>

      {/* Label */}
      <label className="block text-sm font-semibold text-gray-600 mb-2">
        {label}
      </label>

      {/* Input or Button for Date Picker */}
      {!isDate ? (
        <input
          name={name}
          className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${hasError ? "border-red-500" : "border-gray-300"} transition duration-200 ease-in-out`}
          {...textInputProps}
        />
      ) : (
        <button
          className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          onClick={showDatePicker}
        >
          {textInputProps.value || "Select Date"}
        </button>
      )}

      {/* Show Password Toggle */}
      {isPassword && (
        <div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setHidePassword(!hidePassword)}
        >
          {hidePassword ? (
            <FaEyeSlash size={22} color="gray" />
          ) : (
            <FaEye size={22} color="gray" />
          )}
        </div>
      )}

      {/* Error Message */}
      {hasError && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );
};

TextInputSignupScreen.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isPassword: PropTypes.bool,
  hidePassword: PropTypes.bool,
  setHidePassword: PropTypes.func,
  isDate: PropTypes.bool,
  showDatePicker: PropTypes.func,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

TextInputSignupScreen.defaultProps = {
  icon: "",
  isPassword: false,
  hidePassword: true,
  setHidePassword: () => {},
  isDate: false,
  showDatePicker: () => {},
};

export default TextInputSignupScreen;
