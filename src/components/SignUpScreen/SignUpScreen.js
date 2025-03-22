import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "../../hooks/api/useFetch";
import { logError } from "../../utils/logging";
import Button from "../Button/Button";
import TextInputSignUpScreen from "../SignUpScreen/TextInputSignUpScreen";
import dayjs from "dayjs";
import { createSignUpSchema } from "@/validation/signUpSchema";
import { useRouter } from "next/navigation";

const SignUpScreen = () => {
  const { translations } = useLanguage();
  const router = useRouter();
  const [userBirthDay, setUserBirthDay] = useState();

  const [msg, setMsg] = useState("");
  const [success, setSuccessStatus] = useState("");

  const validationSchema = createSignUpSchema(translations);

  const onReceived = (response) => {
    const responseData = response.data || response;
    const { success, msg } = responseData;

    if (success) {
      handleMessage({ successStatus: true, msg: msg });
      router.push("/signup/welcome");
    } else {
      logError(`API Error: ${msg}`);
      handleMessage({ successStatus: false, msg: msg });
    }
  };

  const { performFetch, isLoading, error } = useFetch(
    "/auth/pre-sign-up",
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

  const handleSignup = (values, setSubmitting) => {
    setMsg("");
    setSuccessStatus("");

    const formattedBirthdate = values.birthdate
      ? dayjs(values.birthdate).format("YYYY-MM-DD")
      : null;

    const credentials = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      dateOfBirth: formattedBirthdate,
      isSubscribed: values.subscribeToNewsletter,
      authProvider: "local",
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

  return (
    <section className="bg-primary-light sm:bg-dots-lg sm:bg-dots-size-lg bg-dots-sm bg-dots-size-sm">
      <div className="flex flex-col items-center justify-center flex-grow p-2 w-full">
        <div className="bg-tertiary2-light my-8 sm:my-20 items-center justify-center rounded-2xl shadow-lg p-5 sm:p-8 max-w-[47.75rem] w-full">
          <img
            src="/images/donna-vino-logo-transparent.png"
            alt="Donna Vino logo"
            className="w-[6.25rem] h-[4.31rem] mx-auto my-2"
          />
          <h2
            className="text-displaySmall md:text-displayMedium font-barlow text-tertiary1-darker mb-6 text-center"
            aria-label="Sign Up"
          >
            {translations["signUp.heading"]}
          </h2>
          <p className="text-bodyMedium md:text-bodyLarge text-tertiary2-darker text-center -mt-3 mb-8">
            {translations["signUp.paragraph"]}
          </p>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              confirmEmail: "",
              birthdate: "",
              password: "",
              confirmPassword: "",
              subscribeToNewsletter: false,
              acceptTerms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSignup(values, setSubmitting);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <h3 className="text-headlineMedium mb-6">
                  {translations["signUp.personal"]}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                  <TextInputSignUpScreen
                    type="text"
                    name="firstName"
                    placeholder={translations["signUp.placeholder.firstName"]}
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    data-testid="input-first-name"
                    aria-label="First Name"
                    error={touched.firstName && errors.firstName}
                  />

                  <TextInputSignUpScreen
                    type="text"
                    name="lastName"
                    placeholder={translations["signUp.placeholder.lastName"]}
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    data-testid="input-last-name"
                    aria-label="Last Name"
                    error={touched.lastName && errors.lastName}
                  />

                  <TextInputSignUpScreen
                    type="email"
                    name="email"
                    placeholder={translations["signUp.placeholder.email"]}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    data-testid="input-email"
                    aria-label="Email"
                    error={touched.email && errors.email}
                  />

                  <TextInputSignUpScreen
                    type="email"
                    name="confirmEmail"
                    placeholder={
                      translations["signUp.placeholder.confirmEmail"]
                    }
                    value={values.confirmEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    data-testid="input-confirm-email"
                    aria-label="Confirm Email"
                    error={touched.confirmEmail && errors.confirmEmail}
                  />

                  <TextInputSignUpScreen
                    type="password"
                    name="password"
                    placeholder={translations["signUp.placeholder.password"]}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showPasswordToggle={true}
                    data-testid="input-password"
                    aria-label="Password"
                    error={touched.password && errors.password}
                  />

                  <TextInputSignUpScreen
                    type="password"
                    name="confirmPassword"
                    placeholder={
                      translations["signUp.placeholder.confirmPassword"]
                    }
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showPasswordToggle={true}
                    data-testid="input-confirm-password"
                    aria-label="Confirm Password"
                    error={touched.confirmPassword && errors.confirmPassword}
                  />

                  <TextInputSignUpScreen
                    type="text"
                    name="birthdate"
                    id="birthdate"
                    placeholder={translations["signUp.placeholder.birthdate"]}
                    value={values.birthdate || userBirthDay}
                    onChange={(newValue) => {
                      setFieldValue("birthdate", newValue);
                      setUserBirthDay(newValue);
                    }}
                    isDate={true}
                    showDatePicker={() =>
                      document.getElementById("datePicker").focus()
                    }
                    data-testid="input-birthdate"
                    aria-label="Birthdate"
                    error={touched.birthdate && errors.birthdate}
                  />

                  <div className="relative group inline-block align-top">
                    <div className="relative w-[30px] h-[30px] z-30 rounded-full bg-primary-light flex items-center justify-center group-hover:w-[45px] group-hover:h-[45px] transition-all duration-200 cursor-pointer">
                      <span className="z-40 text-tertiary1-darker text-labelXLarge group-hover:text-titleLarge">
                        ?
                      </span>
                    </div>
                    <div className="absolute z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 left-0 top-0">
                      <div className="bg-primary-hover text-tertiary1-darker font-medium p-2 pl-12 rounded-full text-labelSmall sm:min-w-[18rem] h-[45px]">
                        {translations["signUp.ageTooltip"]}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-3 text-tertiary1-darker text-bodyLarge">
                  {/* Terms of Use Checkbox */}
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={values.acceptTerms}
                      onChange={() =>
                        setFieldValue("acceptTerms", !values.acceptTerms)
                      }
                      onBlur={handleBlur}
                      className={`w-6 h-6 border-2 ${
                        touched.acceptTerms && errors.acceptTerms
                          ? "border-primary-normal ring-1 ring-primary-normal text-primary-normal checked:bg-primary-normal checked:border-primary-active"
                          : "border-secondary-active text-secondary-active checked:bg-secondary-active checked:border-secondary-dark"
                      } rounded-md bg-white focus:ring-2 focus:ring-secondary-hover transition-all duration-200`}
                    />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: translations["signUp.acceptTerms"]
                          .replace(
                            "{terms}",
                            `<strong>${translations["signUp.terms"]}</strong>`,
                          )
                          .replace(
                            "{privacy}",
                            `<strong>${translations["signUp.privacy"]}</strong>`,
                          ),
                      }}
                      className="text-bodyMedium sm:text-bodyLarge text-secondary-dark"
                    />
                  </label>
                  {touched.acceptTerms && errors.acceptTerms && (
                    <div className="text-xs text-primary-normal">
                      {errors.acceptTerms}
                    </div>
                  )}

                  {/* Subscribe to Newsletter Checkbox */}
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="subscribeToNewsletter"
                      checked={values.subscribeToNewsletter}
                      onChange={() =>
                        setFieldValue(
                          "subscribeToNewsletter",
                          !values.subscribeToNewsletter,
                        )
                      }
                      className="w-6 h-6 border-2 border-secondary-active rounded-md bg-white text-secondary-active focus:ring-2 focus:ring-secondary-hover checked:bg-secondary-active checked:border-secondary-dark transition-all duration-200"
                    />
                    <span className="text-bodyMedium sm:text-bodyLarge text-secondary-dark">
                      {translations["signUp.updates"]}
                    </span>
                  </label>
                </div>

                <div className="w-full mt-4">
                  <Button
                    text={translations["signUp.create-button"]}
                    onClick={handleSubmit}
                    variant="redWide"
                    data-testid="submit-button"
                    aria-label="Submit Sign Up"
                  />
                </div>

                {/* Error Message */}
                {!success && msg && (
                  <div className="flex justify-center mt-3">
                    <p
                      className="text-bodySmall sm:text-bodyMedium text-primary-normal text-center"
                      aria-live="polite"
                      data-testid="message-status"
                    >
                      {msg}
                    </p>
                  </div>
                )}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex justify-center items-center mt-4">
                    <div className="w-8 h-8 border-t-transparent border-solid animate-spin rounded-full border-primary-normal border-2" />
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default SignUpScreen;
