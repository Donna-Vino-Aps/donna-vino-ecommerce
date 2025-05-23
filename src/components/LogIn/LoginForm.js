import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import Button from "../Button/Button.js";
import Link from "next/link";
import TextInput from "../TextInput/TextInput";
import { mapBackendMessage } from "@/services/messageMap";
import { signIn } from "next-auth/react";
import GoogleAuth from "@/components/GoogleAuth/GoogleAuth";

const LoginForm = () => {
  const { translations } = useLanguage();
  const router = useRouter();

  // States for handling messages and loading
  const [msg, setMsg] = useState("");
  const [success, setSuccessStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleMessage = ({ successStatus, msg }) => {
    const friendlyMsg = mapBackendMessage(msg);
    setSuccessStatus(successStatus);
    setMsg(friendlyMsg);
  };

  return (
    <div className="flex h-full flex-col" data-testid="login-container">
      <main className="flex flex-col items-center justify-center md:w-[18rem] lg:w-[25rem]">
        <div className=" flex w-[17.5rem] items-start justify-start md:w-[18rem] lg:w-[25rem]">
          <h2 className="mb-4 text-headlineMedium text-tertiary1-normal">
            {translations["logIn.button"]}
          </h2>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            if (!values.email || !values.password) {
              handleMessage({
                successStatus: false,
                msg: "Please fill all the fields",
              });
              setSubmitting(false);
              return;
            }

            setLoading(true);
            const res = await signIn("credentials", {
              email: values.email,
              password: values.password,
              callbackUrl: "/",
              redirect: false,
            });

            if (res?.error) {
              handleMessage({
                successStatus: false,
                msg: res.error,
              });
            } else {
              router.push("/");
            }

            setLoading(false);
            setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <Form
              className="flex h-auto w-full flex-col items-center justify-center space-y-2"
              data-testid="login-form"
            >
              <div className="mb-1 w-[17.5rem] space-y-2 md:w-[18rem] lg:w-[25rem]">
                <TextInput
                  name="email"
                  label={translations["logIn.label.email"]}
                  placeholder=""
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="w-[17.5rem] space-y-1 md:w-[18rem] lg:w-[25rem]">
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
              <div className="flex w-[17.5rem] flex-col space-y-4 md:w-[18rem] lg:w-[25rem]">
                <Button
                  text={translations["logIn.button"]}
                  onClick={handleSubmit}
                  variant="redWide"
                  testId="login-button"
                  ariaLabel="Submit Log In"
                />
              </div>
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
              <div className="relative bottom-1 !mb-1 !mt-1 flex items-center space-x-1 text-labelMedium">
                <Link
                  href="/forgotpassword"
                  data-testid="forget-password-link"
                  aria-label="Forgot Password"
                  className="text-left font-medium hover:font-semibold hover:underline"
                >
                  {translations["logIn.forgot-link"]}
                </Link>
              </div>
              <div className="relative bottom-5 w-[17.5rem] md:w-[18rem] lg:w-[25rem]">
                <h2 className="mb-1 mt-1 self-center text-headlineMedium text-tertiary1-normal sm:self-start">
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
              {loading && (
                <div className="!mt-1 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-solid border-blue-500" />
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
