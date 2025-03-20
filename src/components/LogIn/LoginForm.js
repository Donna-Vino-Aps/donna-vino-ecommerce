import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import { CredentialsContext } from "../../context/credentialsContext";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "@/hooks/api/useFetch.js";
import { useRouter } from "next/navigation";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import Button from "../Button/Button.js";
import Link from "next/link";
import TextInputLoginScreen from "../SignUpScreen/TextInputSignUpScreen";
import { logInfo, logError } from "../../utils/logging";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

const LoginForm = () => {
  const { translations } = useLanguage();
  const router = useRouter();
  // States for handling messages and loading
  const [msg, setMsg] = useState("");
  const [success, setSuccessStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setStoredCredentials } = useContext(CredentialsContext);

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
    setSuccessStatus(successStatus);
    setMsg(msg);
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
    <div className="flex flex-col h-full" data-testid="login-container">
      <main className="md:w-[18rem] lg:w-[25rem] flex flex-col justify-center items-center">
        <div className=" w-[17.5rem] md:w-[18rem] lg:w-[25rem] flex justify-start items-start">
          <h2 className="mb-4 text-headlineMedium text-tertiary1-normal">
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
              className="w-full h-auto space-y-2 flex flex-col items-center justify-center"
              data-testid="login-form"
            >
              <div className="space-y-2 mb-1 w-[17.5rem] md:w-[18rem] lg:w-[25rem]">
                <label className="text-labelLarge text-tertiary1-normal font-medium font-barlow self-start">
                  {translations["logIn.label-mail"]}
                </label>
                <TextInputLoginScreen
                  name="email"
                  placeholder={translations["logIn.placeholder-mail"]}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={<MdOutlineEmail />}
                  dataTestId="login-input-email"
                />
              </div>
              <div className="space-y-1 w-[17.5rem] md:w-[18rem] lg:w-[25rem]">
                <label className="text-labelLarge text-tertiary1-normal font-barlow font-medium self-start">
                  {translations["logIn.label-password"]}
                </label>
                <TextInputLoginScreen
                  type="password"
                  name="password"
                  placeholder={translations["logIn.placeholder-password"]}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={<MdLockOutline />}
                  showPasswordToggle={true}
                  data-testid="login-input-password"
                  aria-label="Password"
                />
              </div>
              <div className="w-[17.5rem] md:w-[18rem] lg:w-[25rem] flex flex-col space-y-4">
                <Button
                  text={translations["logIn.button"]}
                  onClick={handleSubmit}
                  variant="redWide"
                  data-testid="login-button"
                  aria-label="Submit Log In"
                />
              </div>
              {/* Pass setMsg, setSuccess, and setLoading so GoogleAuth updates global state */}
              <GoogleAuth
                setMsg={setMsg}
                setSuccess={setSuccessStatus}
                setLoading={setLoading}
              />
              {/* Message container with fixed height to prevent inputs from moving */}
              <div
                className="flex justify-center min-h-[2rem]"
                data-testid="login-message"
              >
                <p
                  className={`text-labelLarge text-center ${loading ? "text-black" : success ? "text-green-500" : "text-red-500"}`}
                  aria-live="polite"
                  data-testid="message-status"
                >
                  {loading ? "Loading..." : msg}
                </p>
              </div>
              <div className="flex !mt-1 !mb-1 space-x-1 items-center text-labelMedium relative bottom-1">
                <Link
                  href="/forgotpassword"
                  data-testid="forget-password-link"
                  aria-label="Forgot Password"
                  className="text-left font-medium hover:underline hover:font-semibold"
                >
                  {translations["logIn.forgot-link"]}
                </Link>
              </div>
              <div className="relative bottom-5 w-[17.5rem] md:w-[18rem] lg:w-[25rem]">
                <h2 className="mb-1 mt-1 text-headlineMedium self-center sm:self-start text-tertiary1-normal">
                  {translations["logIn.no-account"]}
                </h2>
                <Button
                  text={translations["logIn.signup-button"]}
                  variant="greenSubmit"
                  data-testid="login-button"
                  aria-label="Submit Log In"
                  type="submit"
                  onClick={() => router.push("/signup")}
                />
              </div>
              {isLoading && (
                <div className="flex justify-center items-center !mt-1">
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
