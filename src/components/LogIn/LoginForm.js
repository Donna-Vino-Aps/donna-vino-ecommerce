import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useCredentials } from "@/context/CredentialsContext";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "@/hooks/api/useFetch.js";
import { useRouter } from "next/navigation";
import Button from "../Button/Button.js";
import Link from "next/link";
import TextInput from "../TextInput/TextInput";
import { logInfo, logError } from "@/utils/logging";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { mapBackendMessage } from "@/services/messageMap";

const LoginForm = () => {
  const { translations } = useLanguage();
  const router = useRouter();
  // States for handling messages and loading
  const [msg, setMsg] = useState("");
  const [success, setSuccessStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setStoredCredentials } = useCredentials();

  const onReceived = (response) => {
    const responseData = response.data || response;
    const { success, msg, user } = responseData;

    if (success) {
      saveLoginCredentials(user);
      handleMessage({ successStatus: true, msg });
      router.push("/");
    } else {
      logInfo(msg);
      handleMessage({ successStatus: false, msg });
    }
  };

  const { performFetch, isLoading, error } = useFetch(
    "/auth/log-in",
    "POST",
    {},
    {},
    onReceived,
  );

  useEffect(() => {
    if (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      handleMessage({ successStatus: false, msg: errorMessage });
    }
  }, [error]);

  const handleLogin = (values, setSubmitting) => {
    // Clear previous messages
    setMsg("");
    setSuccessStatus(null);

    const credentials = {
      email: values.email,
      password: values.password,
    };

    performFetch({
      method: "POST",
      data: { user: credentials },
    }).finally(() => setSubmitting(false));
  };

  const handleMessage = ({ successStatus, msg }) => {
    const friendlyMsg = mapBackendMessage(msg);
    setSuccessStatus(successStatus);
    setMsg(friendlyMsg);
  };

  const saveLoginCredentials = async (
    user,
    token = null,
    msg = "",
    successStatus = true,
  ) => {
    try {
      await localStorage.setItem("userCredentials", JSON.stringify(user));
      if (token) {
        await localStorage.setItem("userCredentialsToken", token);
      }
      handleMessage({
        successStatus: successStatus,
        msg: msg || "User credentials saved successfully",
      });
      setStoredCredentials(user);
      logInfo(
        `User saved in localStorage: ${localStorage.getItem("userCredentials")}`,
      );
    } catch (error) {
      logError(error);
      handleMessage({
        successStatus: false,
        msg: "Failed to save user credentials",
      });
    }
  };

  return (
    <div
      className="flex min-h-[37.25rem] flex-col"
      data-testid="login-container"
    >
      <div className="mx-2 mt-9 flex flex-col items-center justify-center md:mt-6 md:w-[18rem] lg:w-[25rem]">
        <div className="flex w-[19.063rem] items-start justify-start md:w-[18rem] lg:w-[25rem]">
          <h2 className="mb-4 mt-5 text-titleLarge text-tertiary1-normal md:text-headlineMedium">
            {translations["logIn.button"]}
          </h2>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            if (!values.email || !values.password) {
              handleMessage({
                successStatus: false,
                msg: "Please fill all the fields",
              });
              setSubmitting(false);
            } else {
              setSubmitting(true);
              handleLogin(values, setSubmitting);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex h-auto w-full flex-col items-center justify-center space-y-3"
              data-testid="login-form"
            >
              <div className="mb-1 w-[19.063rem] md:w-[18rem] lg:w-[25rem]">
                <TextInput
                  name="email"
                  label={translations["logIn.label.email"]}
                  placeholder=""
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="w-[19.063rem] md:w-[18rem] lg:w-[25rem]">
                <TextInput
                  type="password"
                  name="password"
                  label={translations["logIn.label.password"]}
                  placeholder=""
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  showPasswordToggle={true}
                />
              </div>
              <div className="relative top-3 flex w-[19.063rem] flex-col space-y-4 md:top-5 md:w-[18rem] lg:w-[25rem]">
                <Button
                  text={translations["logIn.button"]}
                  onClick={handleSubmit}
                  variant="redWide"
                  testId="login-button"
                  ariaLabel="Submit Log In"
                />
                {/* Pass setMsg, setSuccess, and setLoading so GoogleAuth updates global state */}
                <GoogleAuth
                  setMsg={setMsg}
                  setSuccess={setSuccessStatus}
                  setLoading={setLoading}
                />
                {/* Message container with fixed height to prevent inputs from moving */}
                <div
                  className="flex min-h-[2rem] justify-center"
                  data-testid="login-message"
                >
                  <p
                    className={`text-center text-labelLarge ${loading ? "text-black" : success ? "text-green-500" : "text-red-500"}`}
                    aria-live="polite"
                    data-testid="message-status"
                  >
                    {loading ? "Loading..." : msg}
                  </p>
                </div>
              </div>
              <div className="relative bottom-5 !mb-1 !mt-1 flex items-center space-x-1 text-labelMedium md:bottom-0">
                <Link
                  href="/forgotpassword"
                  data-testid="forget-password-link"
                  aria-label="Forgot Password"
                  className="text-left text-titleMedium font-medium hover:font-semibold hover:underline"
                >
                  {translations["logIn.forgot-link"]}
                </Link>
              </div>
              <div className="relative bottom-2 w-[19.063rem] md:top-2 md:w-[18rem] lg:w-[25rem]">
                <h2 className="mb-3 mt-1 self-center text-titleMedium font-medium text-tertiary1-normal sm:self-start md:text-headlineSmall md:font-normal">
                  {translations["logIn.no-account"]}
                </h2>
                <Button
                  text={translations["logIn.signup-button"]}
                  variant="greenSubmit"
                  testId="signup-button"
                  ariaLabel="Go to Sign Up"
                  type="button"
                  onClick={() => router.push("/signup")}
                />
              </div>
              {isLoading && (
                <div className="!mt-1 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-solid border-blue-500" />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
