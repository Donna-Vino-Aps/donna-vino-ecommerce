import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useLanguage } from "../../context/LanguageContext";

const SignUpForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const years = Array.from(
    { length: new Date().getFullYear() - 1920 + 1 },
    (_, i) => 1920 + i,
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Sign Up
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="name"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="confirmPassword"
            >
              Password Check
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Confirm your password"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="dateofbirth"
            >
              Date of birth
            </label>
            <div className="relative w-full">
              <DatePicker
                id="dateofbirth"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
                renderCustomHeader={({ date, changeYear, changeMonth }) => (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {/* Removed the month change buttons */}
                    <select
                      value={date.getFullYear()}
                      onChange={({ target: { value } }) => changeYear(value)}
                    >
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <select
                      value={months[date.getMonth()]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }
                    >
                      {months.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <button className="w-full bg-secondary-normal text-white py-2 rounded-lg hover:bg-secondary-hover_normal transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
