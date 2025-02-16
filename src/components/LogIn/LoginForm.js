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

  const onReceived = (response) => {
    const { success, msg, user } = response.data || response;

    if (success) {
      saveLoginCredentials(user);
    }

    logInfo(msg);
    handleMessage({ successStatus: success, msg });
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
      handleMessage({
        successStatus: false,
        msg: error.message || "An unexpected error occurred.",
      });
    }
  }, [error]);

  const handleLogin = (values, setSubmitting) => {
    setMsg("");
    setSuccessStatus(null);

    performFetch({
      method: "POST",
      data: { user: { email: values.email, password: values.password } },
    }).finally(() => setSubmitting(false));
  };

  return (
    <div className="flex flex-col h-full" data-testid="login-container">
      <main className="w-full h-full flex flex-col justify-center items-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "Email is required";
            }
            if (!values.password) {
              errors.password = "Password is required";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (!values.email || !values.password) {
              handleMessage({
                successStatus: false,
                msg: "Please fill in both email and password.",
              });
              setSubmitting(false);
            } else {
              setSubmitting(true);
              handleLogin(values, setSubmitting);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            values,
            handleSubmit,
            touched,
            isSubmitting,
          }) => (
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

              {/* Display error message only if user has clicked login and has errors */}
              {(touched.email || touched.password) && msg && (
                <div
                  data-testid="login-message"
                  className={success ? "text-green-600" : "text-red-600"}
                >
                  {msg}
                </div>
              )}

              <Button
                text={translations["logIn.button"]}
                variant="redWide"
                data-testid="login-button"
                aria-label="Submit Log In"
                type="submit"
                disabled={isSubmitting || isLoading}
                onClick={handleSubmit}
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
