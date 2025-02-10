import React, { useState } from "react";
import TextInputLoginScreen from "./TextInputLoginScreen";
import { Formik, Form } from "formik";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md"; // Import your icons here
import Button from "../Button/Button.js";
import { logInfo } from "@/utils/logging";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "@/hooks/api/useFetch.js";

const LoginForm = () => {
  const { translations } = useLanguage();
  const [errorMessage, setErrorMessage] = useState("");

  const { performFetch } = useFetch(
    "/auth/login",
    "POST",
    null,
    {},
    (response) => {
      if (response.success) {
        // Handle successful login (e.g., redirect, store token, etc.)
        logInfo("Login successful:", response);
        setErrorMessage(""); // Clear error on success
      } else {
        setErrorMessage(response.message || "Login failed");
      }
    },
  );

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
