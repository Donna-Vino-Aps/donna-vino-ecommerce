import React, { useState } from "react";
import useFetch from "../../hooks/api/useFetch.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useLanguage } from "../../context/LanguageContext";

const SignUpForm = () => {
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const onReceived = (data) => {
    if (data.success) {
      logInfo("Signup successful:", data);
    } else {
      console.error("Signup failed:", data);
    }
  };

  // Fetch API for login request
  const { performFetch, isLoading, error } = useFetch(
    "/auth/sign-up",
    onReceived,
  );

  // Handle form submission
  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent default form reload

    performFetch({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        dateOfBirth,
      }),
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSignUp} className="signup-form">
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                placeholderText="Date of Birth"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
                renderCustomHeader={({ date, changeYear, changeMonth }) => (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
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
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-secondary-normal text-white py-2 rounded-lg hover:bg-secondary-hover_normal transition"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center mt-2">
              {
                typeof error === "object" && typeof error.message === "string" // Double check type and if it is a string
                  ? error.message
                  : error.toString() // Fallback to string conversion
              }
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
