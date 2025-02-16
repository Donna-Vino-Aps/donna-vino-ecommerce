import React, { useState, useContext, useEffect } from "react";
import TextInputLoginScreen from "./TextInputLoginScreen";
import { CredentialsContext } from "../../context/credentialsContext";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "@/hooks/api/useFetch.js";
import { Formik, Form } from "formik";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import Button from "../Button/Button.js";
import { logInfo } from "@/utils/logging";

const LoginForm = () => {
  const { translations } = useLanguage();
  const [msg, setMsg] = useState("");
  const [success, setSuccessStatus] = useState("");

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
      handleMessage({
        successStatus: false,
        msg: error.message || "An unexpected error occurred.",
      });
    }
  }, [error]);

  const handleLogin = (values, setSubmitting) => {
    setMsg("");
    setSuccessStatus("");

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
      handleMessage({
        successStatus: true,
        msg: "User credentials saved successfully",
      });
      setStoredCredentials(user);
      logInfo(
        `User found in localStorage: ${localStorage.getItem("userCredentials")}`,
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
          {({ handleChange, handleBlur, values, handleSubmit }) => (
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
                name="password"
                placeholder={translations["logIn.password"]}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<MdLockOutline />}
                dataTestId="login-input-password"
              />

              <div data-testid="login-message">{msg}</div>

              <Button
                text={translations["logIn.button"]}
                variant="redWide"
                data-testid="login-button"
                aria-label="Submit Log In"
                type="submit"
                disabled={isLoading}
              />
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default LoginForm;
