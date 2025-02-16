import React, { useState, useContext, useEffect } from "react";
import TextInputLoginScreen from "./TextInputLoginScreen";
import { CredentialsContext } from "../../context/credentialsContext";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "@/hooks/api/useFetch.js";
import { Formik, Form } from "formik";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md"; // Import your icons here
import Button from "../Button/Button.js";
import { logInfo } from "@/utils/logging";

const LoginForm = () => {
  const { translations } = useLanguage();
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleLogin = (values, setSubmitting) => {
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

  useEffect(() => {
    if (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      handleMessage({
        successStatus: false,
        msg: errorMessage,
      });
    }
  }, [error]);

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
    <div className="flex flex-col h-full" data-testid="login-container">
      <main className="w-full h-full flex flex-col justify-center items-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            // Call performFetch with user input
            performFetch({ body: values });
          }}
        >
          {({ handleChange, handleBlur, values, handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="w-full h-full space-y-5 flex flex-col items-center justify-center"
            >
              <TextInputLoginScreen
                name="email"
                placeholder={translations["logIn.mail"]}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<MdOutlineEmail />}
                data-testid="login-input-email"
                aria-label="Email"
              />

              <TextInputLoginScreen
                name="password"
                placeholder={translations["logIn.password"]}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<MdLockOutline />}
                data-testid="login-input-password"
                aria-label="Password"
              />

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              <Button
                text={translations["logIn.button"]}
                variant="redWide"
                data-testid="login-button"
                aria-label="Submit Log In"
                type="submit"
              />
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default LoginForm;
