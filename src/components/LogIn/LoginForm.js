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
    <div
      className="flex min-h-[37.25rem] flex-col"
      data-testid="login-container"
    >
      <div className="mx-2 flex flex-col items-center justify-center pt-9 md:w-[18rem] md:pt-6 lg:w-[25rem]">
        <div className="flex w-[19.063rem] items-start justify-start md:w-[18rem] lg:w-[25rem]">
          <h2 className="mb-4 mt-5 text-titleLarge text-tertiary1-normal md:text-headlineMedium">
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
              <div className="mb-2 w-[19.063rem] md:w-[18rem] lg:w-[25rem]">
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
                  width="full"
                  testId="login-button"
                  ariaLabel="Submit Log In"
                />

                <GoogleAuth
                  setMsg={setMsg}
                  setSuccess={setSuccessStatus}
                  setLoading={setLoading}
                />
              </div>
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
              <div className="relative bottom-3 !mb-1 !mt-2 flex items-center space-x-1 text-labelMedium md:bottom-0">
                <Link
                  href="/forgotpassword"
                  data-testid="forget-password-link"
                  aria-label="Forgot Password"
                  className="text-left text-titleMedium font-medium hover:font-semibold hover:underline"
                >
                  {translations["logIn.forgot-link"]}
                </Link>
              </div>
              <div className="relative w-[19.063rem] md:top-4 md:w-[18rem] lg:w-[25rem]">
                <h2 className="mb-3 mt-1 self-center text-titleLarge font-normal text-tertiary1-normal sm:self-start md:text-headlineSmall md:font-normal">
                  {translations["logIn.no-account"]}
                </h2>
                <Button
                  text={translations["logIn.signup-button"]}
                  width="full"
                  color="secondary"
                  extraStyle="py-3"
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
      </div>
    </div>
  );
};

export default LoginForm;
