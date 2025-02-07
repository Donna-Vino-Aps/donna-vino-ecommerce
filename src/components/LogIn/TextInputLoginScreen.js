import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const TextInputLoginScreen = ({
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative" data-testid={`input-container-${name}`}>
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {React.cloneElement(icon, { style: { color: "black" } })}
        </div>
      )}

      {name === "password" ? (
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-label={placeholder || `Enter your ${name}`}
            data-testid={`input-${name}`}
            className={`w-full p-3 ${icon ? "pl-12" : "pl-3"} border border-tertiary1-darker rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-light`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            data-testid="toggle-password-visibility"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      ) : (
        <input
          type="email"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-label={placeholder || `Enter your ${name}`}
          data-testid={`input-${name}`}
          className={`w-full p-3 ${icon ? "pl-12" : "pl-3"} border border-tertiary1-darker rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-light`}
        />
      )}
    </div>
  );
};

TextInputLoginScreen.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  icon: PropTypes.element,
};

TextInputLoginScreen.defaultProps = {
  onBlur: () => {},
  icon: null,
};

export default TextInputLoginScreen;
