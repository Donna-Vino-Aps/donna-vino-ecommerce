import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";

import TextInputSignupScreen from "../../components/TextInputSignupScreen/TextInputSignupScreen";

// Context and hooks
import { CredentialsContext } from "../../context/credentialsContext";
import useFetch from "../../hooks/api/useFetch";

// Redux
import { useDispatch } from "react-redux";
import { setActiveScreen } from "../../actions/counterActions";
import { useRouter } from "next/router";

const SignupScreen = () => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date(2000, 0, 1));
  const [msg, setMsg] = useState("");
  const [success, setSuccessStatus] = useState("");

  // credentials
  const { setStoredCredentials } = useContext(CredentialsContext);

  // Redux state and actions
  const dispatch = useDispatch();
  const router = useRouter();

  const handleMessage = ({ successStatus, msg }) => {
    setSuccessStatus(successStatus);
    setMsg(msg);
  };

  const onReceived = (response) => {
    const { success, msg, user } = response;
    if (success) {
      saveLoginCredentials(user);
      dispatch(setActiveScreen("LinkVerificationScreen"));
      router.push("/link-verification");
    } else {
      handleMessage({ successStatus: false, msg });
    }
  };

  const { performFetch, isLoading, error } = useFetch(
    `/auth/sign-up`,
    onReceived,
  );

  useEffect(() => {
    if (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      handleMessage({ successStatus: false, msg: errorMessage });
    }
  }, [error]);

  const handleSignup = (values) => {
    setMsg("");
    setSuccessStatus("");

    const credentials = {
      name: values.name,
      email: values.email,
      password: values.password,
      dateOfBirth: values.dateOfBirth,
    };

    performFetch({
      method: "POST",
      data: { user: credentials },
    });
  };

  const saveLoginCredentials = (user) => {
    try {
      localStorage.setItem("userCredentials", JSON.stringify(user));
      handleMessage({
        successStatus: true,
        msg: "User credentials saved successfully",
      });
      setStoredCredentials(user);
    } catch (error) {
      console.error(error);
      handleMessage({
        successStatus: false,
        msg: "Failed to save user credentials",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow p-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Account Sign Up
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            dateOfBirth: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            values = { ...values, dateOfBirth: dateOfBirth };
            const dateOfBirthString = values.dateOfBirth
              ? values.dateOfBirth.toDateString()
              : "";

            if (
              !values.name ||
              !values.email ||
              !values.dateOfBirth ||
              !values.password ||
              !values.confirmPassword
            ) {
              handleMessage({ msg: "Please fill all the fields" });
              setSubmitting(false);
            } else if (values.password !== values.confirmPassword) {
              handleMessage({ msg: "Passwords do not match" });
              setSubmitting(false);
            } else {
              setSubmitting(true);
              handleSignup({
                name: values.name,
                email: values.email,
                password: values.password,
                dateOfBirth: dateOfBirthString,
              });
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextInputSignupScreen
                label="Name"
                placeholder="Your Name"
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                name="name"
                errors={errors}
                touched={touched}
              />

              <TextInputSignupScreen
                label="Email Address"
                placeholder="your.email@example.com"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                name="email"
                errors={errors}
                touched={touched}
                keyboardType="email-address"
              />

              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Date of Birth
              </label>
              <DatePicker
                selected={dateOfBirth}
                onChange={setDateOfBirth}
                dateFormat="MMMM d, yyyy"
                className="mb-4 p-2 border rounded-lg w-full"
              />

              <TextInputSignupScreen
                label="Password"
                placeholder="********"
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                type="password"
                name="password"
                errors={errors}
                touched={touched}
              />

              <TextInputSignupScreen
                label="Confirm Password"
                placeholder="********"
                onChange={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                type="password"
                name="confirmPassword"
                errors={errors}
                touched={touched}
              />

              <div className="mt-4">
                {msg && <p className="text-red-500 text-xs">{msg}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg focus:outline-none"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </Formik>

        {isLoading && <p className="text-center">Loading...</p>}

        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
        <p>&copy; 2025 Your Company</p>
      </footer>
    </div>
  );
};

export default SignupScreen;
