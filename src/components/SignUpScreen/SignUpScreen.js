import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import { CredentialsContext } from "../../context/credentialsContext";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "../../hooks/api/useFetch";
import { logError, logInfo } from "../../utils/logging";
import Button from "../Button/Button";
// import Link from "next/link";
import TextInputSignUpScreen from "../SignUpScreen/TextInputSignUpScreen";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
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
      name: values.name,
      email: values.email,
      password: values.password,
      dateOfBirth: formattedBirthdate,
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
    <div className="flex flex-col min-h-screen bg-primary-light sm:bg-dots-lg sm:bg-dots-size-lg bg-dots-sm bg-dots-size-sm">
      <main className="flex flex-col items-center justify-center flex-grow p-8 w-full max-h-[61rem]">
        <div className="bg-tertiary2-light mt-24 mb-24 items-center justify-center rounded-2xl shadow-lg p-8 max-w-[47.75rem] w-full">
          <img
            src="/images/donna-vino-logo-transparent.png"
            alt="Donna Vino logo"
            className="w-[6.25rem] h-[4.31rem] mx-auto my-2"
          />
          <h2
            className="text-displaySmall md:text-displayLarge font-barlow text-tertiary1-darker mb-6 text-center"
            aria-label="Sign Up"
          >
            Join Donna Vino
          </h2>
          <p className="text-bodyLarge text-tertiary2-darker text-center -mt-3">
            Create a profile for your future orders to have all your information
            saved and ready for use. Registering on our Donna Vino website is
            quick and easy, allowing you to streamline your shopping experience
            and enjoy a faster checkout every time.
          </p>
          <Formik
            initialValues={{
              name: "",
              email: "",
              birthdate: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (
                !values.name ||
                !values.email ||
                !values.birthdate ||
                !values.password ||
                !values.confirmPassword
              ) {
                handleMessage({
                  successStatus: false,
                  msg: "Please fill all the fields",
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
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 bg-tertiary2-light p-6"
              >
                <h4 className="text-headlineSmall mb-2">Personal Details</h4>
                <div className="flex space-x-6 flex-col md:flex-row md:items-start justify-center">
                  <div className="flex flex-col space-y-2 pr-[1.5rem] md:pr-0 md:w-[50%]">
                    <TextInputSignUpScreen
                      type="text"
                      name="firstname"
                      placeholder="First name*"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      icon={<FaRegUser />}
                      data-testid="input-first-name"
                      aria-label="First Name"
                    />
                    <TextInputSignUpScreen
                      type="email"
                      name="email"
                      placeholder="Email*"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      icon={<MdOutlineEmail />}
                      data-testid="input-email"
                      aria-label="Email"
                    />
                    <TextInputSignUpScreen
                      type="password"
                      name="password"
                      placeholder="Password*"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      icon={<MdLockOutline />}
                      showPasswordToggle={true}
                      data-testid="input-password"
                      aria-label="Password"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 md:w-[50%] relative top-2 right-6 md:top-0 md:right-0">
                    <TextInputSignUpScreen
                      type="text"
                      name="lastname"
                      placeholder="Last name*"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      icon={<FaRegUser />}
                      data-testid="input-last-name"
                      aria-label="Last Name"
                    />
                    <TextInputSignUpScreen
                      type="email"
                      name="email"
                      placeholder="Confirm Email*"
                      value={values.confirmEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      icon={<MdOutlineEmail />}
                      data-testid="input-confirm-email"
                      aria-label="Confirm Email"
                    />
                    <TextInputSignUpScreen
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password*"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      icon={<MdLockOutline />}
                      showPasswordToggle={true}
                      data-testid="input-confirm-password"
                      aria-label="Confirm Password"
                    />
                  </div>
                </div>
                <div className="relative items-center md:bottom-1 justify-between">
                  <label
                    className="text-tertiary2-darker text-labelXLarge"
                    htmlFor="birthdate"
                  >
                    Date of birth
                  </label>
                  <TextInputSignUpScreen
                    type="text"
                    name="birthdate"
                    id="birthdate"
                    placeholder="Select your birthdate"
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
                </div>

                <div className="inline-flex relative bottom-2 left-1 text-bodySmall sm:text-bodyMedium md:text-bodyLarge ">
                  <input type="checkbox" className="w-[1.25rem] mr-1 mb-1 " />
                  <p>I accept &nbsp;</p>
                  <u>Terms of use </u>
                  <p>&nbsp; and &nbsp;</p>
                  <u>Privacy Policy</u>
                  <img
                    src="/icons/date-of-birth.svg"
                    alt="date of birth info-popup"
                    className="ml-2 hidden md:flex relative w-[1.875rem] bottom-[4.2rem] right-[2rem] md:bottom-[4.5rem] md:left-[1.25rem] cursor-pointer"
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="flex justify-center pb-4">
                    <p
                      className={`text-xs ${success ? "text-green-500" : "text-red-500"}`}
                      aria-live="polite"
                      data-testid="message-status"
                    >
                      {msg}
                    </p>
                  </div>
                  <div className="w-full mt-2">
                    <Button
                      text={translations["signUp.create-button"]}
                      onClick={handleSubmit}
                      variant="redWide"
                      data-testid="submit-button"
                      aria-label="Submit Sign Up"
                    />
                  </div>
                </div>

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
      </main>
    </div>
  );
};

export default SignUpScreen;
