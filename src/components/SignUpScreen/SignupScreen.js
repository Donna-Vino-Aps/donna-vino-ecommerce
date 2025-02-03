import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import { CredentialsContext } from "../../context/credentialsContext";
import useFetch from "../../hooks/api/useFetch";
import { logError, logInfo } from "../../utils/logging";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import DatePicker from "react-datepicker";
import { formatDate } from "../../utils/dateUtils";
import "react-datepicker/dist/react-datepicker.css";

const SignUpScreen = () => {
  const { translations } = useLanguage();
  const { setStoredCredentials } = useContext(CredentialsContext);
  const [msg, setMsg] = useState("");
  const [birthdate, setBirthdate] = useState(null);

  const handleMessage = (msg) => setMsg(msg);

  const onReceived = (response) => {
    const { success, msg, user } = response;
    if (success) {
      saveLoginCredentials(user);
      dispatch(setActiveScreen("LinkVerificationScreen"));
      router.push("/link-verification");
    } else {
      handleMessage(msg);
    }
  };

  const { performFetch, isLoading, error } = useFetch(
    "/auth/sign-up",
    onReceived,
  );

  useEffect(() => {
    if (error) {
      handleMessage(error.message || "An unexpected error occurred.");
    }
  }, [error]);

  const handleSignup = (values) => {
    setMsg("");
    const formattedBirthdate = formatDate(birthdate);

    logInfo("sign up");
    performFetch({
      method: "POST",
      data: { user: { ...values, birthdate: formattedBirthdate } },
    });
  };

  const saveLoginCredentials = (user) => {
    try {
      localStorage.setItem("userCredentials", JSON.stringify(user));
      setStoredCredentials(user);
    } catch (error) {
      logError(error);
      handleMessage("Failed to save user credentials");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <main className="flex-grow p-8 max-w-lg mx-auto">
        <h2 className="text-displayMedium md:text-displayLarge font-barlow text-tertiary1-darker mb-6 text-center">
          Sign Up
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (
              !values.name ||
              !values.email ||
              !values.password ||
              !values.confirmPassword ||
              !birthdate
            ) {
              handleMessage("Please fill all the fields");
              setSubmitting(false);
            } else if (values.password !== values.confirmPassword) {
              handleMessage("Passwords do not match");
              setSubmitting(false);
            } else {
              setSubmitting(true);
              handleSignup(values);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className="w-full p-3 border border-tertiary1-darker rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
              />

              <input
                type="email"
                placeholder="your.email@example.com"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="w-full p-3 border border-tertiary1-darker rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="w-full p-3 border border-tertiary1-darker rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                className="w-full p-3 border border-tertiary1-darker rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
              />

              <div className="w-full">
                <DatePicker
                  selected={birthdate}
                  onChange={(date) => setBirthdate(date)}
                  className="w-full p-3 border border-tertiary1-darker rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                  placeholderText="Select your birthdate"
                  dateFormat="EEE MMM dd yyyy"
                  isClearable
                />
              </div>

              <div className="mt-4">
                {msg && <p className="text-red-500 text-xs">{msg}</p>}
                <Button
                  text={translations["signUp.button"]}
                  onClick={handleSubmit}
                  icon=""
                  variant="red"
                  ariaLabel="Sign-up button"
                  testId="sign-up-button"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-red text-white rounded-lg hover:bg-redLine focus:outline-none focus:ring-2 focus:ring-redLine"
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
            <a href="/login" className="text-primary-light">
              Login
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUpScreen;
