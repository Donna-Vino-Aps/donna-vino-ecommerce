import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import { CredentialsContext } from "../../context/credentialsContext";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "../../hooks/api/useFetch";
import { logError, logInfo } from "../../utils/logging";
import Button from "../Button/Button";
// import Link from "next/link";
import TextInputSignUpScreen from "../SignUpScreen/TextInputSignUpScreen";
import dayjs from "dayjs";

const SignUpScreen = () => {
  const { translations } = useLanguage();
  const [userBirthDay, setUserBirthDay] = useState();

  const [msg, setMsg] = useState("");
  const [success, setSuccessStatus] = useState("");

  // Context
  const { setStoredCredentials } = useContext(CredentialsContext);

  const onReceived = (response) => {
    const responseData = response.data || response;
    const { success, msg, user } = responseData;

    if (success) {
      saveLoginCredentials(user);
      handleMessage({ successStatus: true, msg: msg });
    } else {
      logInfo(msg);
      handleMessage({ successStatus: false, msg: msg });
    }
  };

  const { performFetch, isLoading, error } = useFetch(
    "/auth/sign-up",
    "POST",
    {},
    {},
    onReceived,
  );

  useEffect(() => {
    if (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      handleMessage({
        successStatus: false,
        msg: errorMessage,
      });
    }
  }, [error]);

  const handleSignup = (values, setSubmitting) => {
    setMsg("");
    setSuccessStatus("");

    const formattedBirthdate = values.birthdate
      ? dayjs(values.birthdate).format("YYYY-MM-DD")
      : null;

    const credentials = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      dateOfBirth: formattedBirthdate,
      // Map the form field "subscribeToNewsletter" to DB field "isSubscribed"
      isSubscribed: values.subscribeToNewsletter,
    };

    performFetch({
      method: "POST",
      data: { user: credentials },
    }).finally(() => setSubmitting(false));
  };

  const handleMessage = ({ successStatus, msg }) => {
    setSuccessStatus(successStatus);
    setMsg(msg);
  };

  const saveLoginCredentials = (user) => {
    try {
      localStorage.setItem("userCredentials", JSON.stringify(user));
      handleMessage({
        successStatus: true,
        msg: "User credentials saved successfully",
      });
      setStoredCredentials(user);
      const storedUser = localStorage.getItem("userCredentials");
      logInfo(`User found in localStorage: ${storedUser}`);
    } catch (error) {
      logError(error);
      handleMessage({
        successStatus: false,
        msg: "Failed to save user credentials",
      });
    }
  };

  return (
    <section className="bg-primary-light sm:bg-dots-lg sm:bg-dots-size-lg bg-dots-sm bg-dots-size-sm">
      <div className="flex flex-col items-center justify-center flex-grow p-2 w-full">
        <div className="bg-tertiary2-light my-8 sm:my-20 items-center justify-center rounded-2xl shadow-lg p-8 max-w-[47.75rem] w-full">
          <img
            src="/images/donna-vino-logo-transparent.png"
            alt="Donna Vino logo"
            className="w-[6.25rem] h-[4.31rem] mx-auto my-2"
          />
          <h2
            className="text-displaySmall md:text-displayMedium font-barlow text-tertiary1-darker mb-6 text-center"
            aria-label="Sign Up"
          >
            {translations["signUp.heading"]}
          </h2>
          <p className="text-bodyMedium md:text-bodyLarge text-tertiary2-darker text-center -mt-3 mb-8">
            {translations["signUp.paragraph"]}
          </p>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              confirmEmail: "",
              birthdate: "",
              password: "",
              confirmPassword: "",
              subscribeToNewsletter: false, // Added missing field for newsletter subscription
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (
                !values.firstName ||
                !values.lastName ||
                !values.email ||
                !values.confirmEmail ||
                !values.birthdate ||
                !values.password ||
                !values.confirmPassword
              ) {
                handleMessage({
                  successStatus: false,
                  msg: "Please fill all the fields",
                });
                setSubmitting(false);
              } else if (values.email !== values.confirmEmail) {
                handleMessage({
                  successStatus: false,
                  msg: "Emails do not match",
                });
                setSubmitting(false);
              } else if (values.password !== values.confirmPassword) {
                handleMessage({
                  successStatus: false,
                  msg: "Passwords do not match",
                });
                setSubmitting(false);
              } else {
                setSubmitting(true);
                handleSignup(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <h3 className="text-headlineMedium mb-6">
                  {translations["signUp.personal"]}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                  <TextInputSignUpScreen
                    type="text"
                    name="firstName"
                    placeholder={translations["signUp.placeholder.firstName"]}
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    data-testid="input-first-name"
                    aria-label="First Name"
                  />

                  <TextInputSignUpScreen
                    type="text"
                    name="lastName"
                    placeholder={translations["signUp.placeholder.lastName"]}
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    data-testid="input-last-name"
                    aria-label="Last Name"
                  />

                  <TextInputSignUpScreen
                    type="email"
                    name="email"
                    placeholder={translations["signUp.placeholder.email"]}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    data-testid="input-email"
                    aria-label="Email"
                  />

                  <TextInputSignUpScreen
                    type="email"
                    name="confirmEmail"
                    placeholder={
                      translations["signUp.placeholder.confirmEmail"]
                    }
                    value={values.confirmEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    data-testid="input-confirm-email"
                    aria-label="Confirm Email"
                  />

                  <TextInputSignUpScreen
                    type="password"
                    name="password"
                    placeholder={translations["signUp.placeholder.password"]}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showPasswordToggle={true}
                    data-testid="input-password"
                    aria-label="Password"
                  />

                  <TextInputSignUpScreen
                    type="password"
                    name="confirmPassword"
                    placeholder={
                      translations["signUp.placeholder.confirmPassword"]
                    }
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showPasswordToggle={true}
                    data-testid="input-confirm-password"
                    aria-label="Confirm Password"
                  />

                  <TextInputSignUpScreen
                    type="text"
                    name="birthdate"
                    id="birthdate"
                    placeholder={translations["signUp.placeholder.birthdate"]}
                    value={values.birthdate || userBirthDay}
                    onChange={(newValue) => {
                      setFieldValue("birthdate", newValue);
                      setUserBirthDay(newValue);
                    }}
                    isDate={true}
                    showDatePicker={() =>
                      document.getElementById("datePicker").focus()
                    }
                    data-testid="input-birthdate"
                    aria-label="Birthdate"
                  />

                  <div className="relative group flex items-center justify-start">
                    <img
                      src="/icons/date-of-birth.svg"
                      alt="date of birth info-popup"
                      className="cursor-pointer md:block relative z-20"
                    />
                    <div className="absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 left-0 top-0 flex items-center">
                      <div className="bg-primary-hover text-tertiary1-darker font-medium p-2 pl-12 rounded-full text-labelSmall sm:min-w-[18rem] h-[45px] flex items-center">
                        {translations["signUp.ageTooltip"]}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-3 text-tertiary1-darker text-bodyLarge">
                  {/* Terms of Use Checkbox */}
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border-2 border-secondary-active rounded-md bg-white text-secondary-active focus:ring-2 focus:ring-secondary-hover checked:bg-secondary-active checked:border-secondary-dark transition-all duration-200"
                    />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: translations["signUp.acceptTerms"]
                          .replace(
                            "{terms}",
                            `<strong>${translations["signUp.terms"]}</strong>`,
                          )
                          .replace(
                            "{privacy}",
                            `<strong>${translations["signUp.privacy"]}</strong>`,
                          ),
                      }}
                      className="text-bodyLarge text-secondary-dark"
                    />
                  </label>

                  {/* Subscribe to Newsletter Checkbox */}
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="subscribeToNewsletter"
                      checked={values.subscribeToNewsletter}
                      onChange={() =>
                        setFieldValue(
                          "subscribeToNewsletter",
                          !values.subscribeToNewsletter,
                        )
                      }
                      className="w-6 h-6 border-2 border-secondary-active rounded-md bg-white text-secondary-active focus:ring-2 focus:ring-secondary-hover checked:bg-secondary-active checked:border-secondary-dark transition-all duration-200"
                    />
                    <span className="text-bodyLarge text-secondary-dark">
                      {translations["signUp.updates"]}
                    </span>
                  </label>
                </div>

                <div className="w-full mt-4">
                  <Button
                    text={translations["signUp.create-button"]}
                    onClick={handleSubmit}
                    variant="redWide"
                    data-testid="submit-button"
                    aria-label="Submit Sign Up"
                  />
                </div>

                {/* Error Message */}
                {!success && msg && (
                  <div className="flex justify-center mt-3">
                    <p
                      className="text-xs text-red-500"
                      aria-live="polite"
                      data-testid="message-status"
                    >
                      {msg}
                    </p>
                  </div>
                )}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex justify-center items-center mt-4">
                    <div className="w-8 h-8 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default SignUpScreen;
