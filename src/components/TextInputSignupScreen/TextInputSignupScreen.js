import React, { useState } from "react";
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
  return (
    <div className="relative mb-6">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        {icon === "calendar" ? (
          <AiOutlineCalendar size={22} color="gray" />
        ) : (
          <i className={`icon-${icon} text-gray-600`} />
        )}
      </div>

      <label className="block text-sm font-semibold text-gray-600 mb-2">
        {label}
      </label>

      {!isDate ? (
        <input
          name={name}
          className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            touched[name] && errors[name] ? "border-red-500" : "border-gray-300"
          } transition duration-200 ease-in-out`}
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

      {touched[name] && errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );
};

// Validación de las props con PropTypes
TextInputSignupScreen.propTypes = {
  label: PropTypes.string.isRequired, // La etiqueta debe ser un string
  icon: PropTypes.string, // El icono puede ser un string (si se pasa un icono)
  isPassword: PropTypes.bool, // isPassword es un booleano
  hidePassword: PropTypes.bool, // hidePassword es un booleano
  setHidePassword: PropTypes.func, // setHidePassword debe ser una función
  isDate: PropTypes.bool, // isDate es un booleano
  showDatePicker: PropTypes.func, // showDatePicker debe ser una función
  name: PropTypes.string.isRequired, // name debe ser un string
  errors: PropTypes.object.isRequired, // errors debe ser un objeto
  touched: PropTypes.object.isRequired, // touched debe ser un objeto
};

// Propiedades opcionales con valores por defecto
TextInputSignupScreen.defaultProps = {
  icon: "",
  isPassword: false,
  hidePassword: true,
  setHidePassword: () => {},
  isDate: false,
  showDatePicker: () => {},
};

export default TextInputSignupScreen;
