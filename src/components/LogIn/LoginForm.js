import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import Button from "../Button/Button.js";
import Link from "next/link";
import TextInput from "../TextInput/TextInput";
// import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { mapBackendMessage } from "@/services/messageMap";
import { signIn } from "next-auth/react";

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
              <div className="w-[17.5rem] md:w-[18rem] lg:w-[25rem]">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    signIn("google", { callbackUrl: "/" });
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 shadow transition duration-150 hover:bg-gray-100"
                  aria-label="Sign in with Google"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 533.5 544.3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M533.5 278.4c0-17.4-1.4-34.1-4.1-50.3H272v95.3h146.9c-6.3 33.6-25 62-53.2 81.2v67h85.9c50.3-46.3 81.9-114.6 81.9-193.2z"
                      fill="#4285F4"
                    />
                    <path
                      d="M272 544.3c72.6 0 133.6-24.1 178.1-65.4l-85.9-67c-23.9 16.1-54.5 25.6-92.2 25.6-70.8 0-130.7-47.8-152.2-112.1H30.9v70.7c44.3 88.1 135.6 148.2 241.1 148.2z"
                      fill="#34A853"
                    />
                    <path
                      d="M119.8 325.4c-10.3-30.6-10.3-63.5 0-94.1V160.6H30.9c-41.6 81.4-41.6 176.6 0 258l88.9-69.2z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M272 107.7c39.5-.6 77.3 13.8 106.4 40.6l79.5-79.5C398.8 24.1 337.8 0 272 0 166.5 0 75.2 60.1 30.9 148.2l88.9 69.2C141.3 155.5 201.2 107.7 272 107.7z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    Sign in with Google
                  </span>
                </button>
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
