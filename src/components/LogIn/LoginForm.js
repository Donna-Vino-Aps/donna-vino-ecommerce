import React from "react";
import TextInputLoginScreen from "./TextInputLoginScreen";
import { Formik, Form } from "formik";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md"; // Import your icons here
import Button from "../Button/Button.js";
import { logInfo } from "@/utils/logging";
import { useLanguage } from "@/context/LanguageContext";

const LoginForm = () => {
  const { translations } = useLanguage();

  return (
    <div className="flex flex-col h-full">
      <main className="p-8 w-full h-full flex flex-col justify-center items-center">
        {/* <h2
          className="text-displayMedium md:text-displayLarge font-barlow text-tertiary1-darker mb-6 text-center"
          aria-label="Log In"
        >
          Log In
        </h2> */}
        <Formik
          initialValues={{
            name: "",
            email: "",
          }}
          onSubmit={(values) => {
            // Handle login logic here (e.g., API request)
            logInfo("Form Submitted:", values);
          }}
        >
          {({ handleChange, handleBlur, values, handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="w-full h-full space-y-5 flex flex-col items-center justify-center"
            >
              <TextInputLoginScreen
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<MdOutlineEmail />}
                data-testid="login-input-email"
                aria-label="Email"
              />

              <TextInputLoginScreen
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                icon={<MdLockOutline />}
                data-testid="input-password"
                aria-label="Password"
              />

              <Button
                text={translations["signUp.button"]}
                variant="red"
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
