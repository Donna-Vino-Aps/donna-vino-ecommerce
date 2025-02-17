import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import { CredentialsContext } from "../../context/credentialsContext";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "@/hooks/api/useFetch.js";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import Button from "../Button/Button.js";
import TextInputLoginScreen from "../SignUpScreen/TextInputSignUpScreen";
import { logInfo, logError } from "@/utils/logging";

const LoginForm = () => {
  const { translations } = useLanguage();
  const [msg, setMsg] = useState("");
  const [success, setSuccessStatus] = useState(null);

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
    "/auth/log-in",
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

  const handleLogin = (values, setSubmitting) => {
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
    setSuccessStatus(successStatus);
    setMsg(msg);
  };

  const saveLoginCredentials = (user) => {
    try {
      localStorage.setItem("userCredentials", JSON.stringify(user));
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
    <div className="flex flex-col h-full" data-testid="login-container">
      <main className="w-full h-full flex flex-col justify-center items-center">
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
              className="w-full h-full space-y-5 flex flex-col items-center justify-center"
              data-testid="login-form"
            >
              <TextInputLoginScreen
                name="email"
                placeholder={translations["logIn.mail"]}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<MdOutlineEmail />}
                dataTestId="login-input-email"
              />

              <TextInputLoginScreen
                type="password"
                name="password"
                placeholder={translations["logIn.password"]}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<MdLockOutline />}
                showPasswordToggle={true}
                data-testid="login-input-password"
                aria-label="Password"
              />

              <div
                className="flex justify-center pb-4"
                data-testid="login-message"
              >
                <p
                  className={`text-xs ${success ? "text-green-500" : "text-red-500"}`}
                  aria-live="polite"
                  data-testid="message-status"
                >
                  {msg}
                </p>
              </div>

              <Button
                text={translations["logIn.button"]}
                onClick={handleSubmit}
                variant="redWide"
                data-testid="login-button"
                aria-label="Submit Log In"
              />

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-center items-center mt-4">
                  <div className="w-8 h-8 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default LoginForm;
