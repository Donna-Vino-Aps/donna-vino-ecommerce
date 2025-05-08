import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "../../hooks/api/useFetch";
import { logError } from "../../utils/logging";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import TermsAndPrivacyLabel from "./TermsAndPrivacyLabel";
import dayjs from "dayjs";
import { createSignUpSchema } from "@/validation/signUpSchema";
import { useRouter } from "next/navigation";
import { setSessionItem, SESSION_KEYS } from "@/utils/sessionStorage";

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

      // Store email in sessionStorage using the utility function
      if (responseData.pendingUser?.email) {
        setSessionItem(
          SESSION_KEYS.PENDING_USER_EMAIL,
          responseData.pendingUser.email,
        );
      }

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
    <section className="bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg">
      <div className="flex w-full flex-grow flex-col items-center justify-center p-2">
        <div className="my-8 w-full max-w-[47.75rem] items-center justify-center rounded-2xl bg-tertiary2-light p-5 shadow-lg sm:my-20 sm:p-8">
          <img
            src="/images/donna-vino-logo-transparent.png"
            alt="Donna Vino logo"
            className="mx-auto my-2 h-[4.31rem] w-[6.25rem]"
          />
          <h2
            className="mb-6 text-center font-barlow text-displaySmall text-tertiary1-darker md:text-displayMedium"
            aria-label="Sign Up"
          >
            {translations["signUp.heading"]}
          </h2>
          <p className="-mt-3 mb-8 text-center text-bodyMedium text-tertiary2-darker md:text-bodyLarge">
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
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <h3 className="mb-6 text-headlineMedium">
                  {translations["signUp.personal"]}
                </h3>

                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  <TextInput
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

                  <TextInput
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

                  <TextInput
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

                  <TextInput
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

                  <TextInput
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
                    hint={translations["signUp.validation.passwordFormat"]}
                  />

                  <TextInput
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

                  <TextInput
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
                    hint={translations["signUp.validation.birthdate"]}
                  />

                  <div className="group relative top-7 inline-block align-top">
                    <div className="relative z-30 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-primary-light transition-all duration-200 group-hover:h-[45px] group-hover:w-[45px]">
                      <span className="z-40 text-labelXLarge text-tertiary1-darker group-hover:text-titleLarge">
                        ?
                      </span>
                    </div>
                    <div className="invisible absolute left-0 top-0 z-10 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="h-[45px] rounded-full bg-primary-hover p-2 pl-12 text-labelSmall font-medium text-tertiary1-darker sm:min-w-[18rem]">
                        {translations["signUp.ageTooltip"]}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-3 text-bodyLarge text-tertiary1-darker">
                  {/* Terms of Use Checkbox */}
                  <label className="flex cursor-pointer items-center space-x-3">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={values.acceptTerms}
                      onChange={() =>
                        setFieldValue("acceptTerms", !values.acceptTerms)
                      }
                      onBlur={handleBlur}
                      className={`size-5 rounded accent-secondary-normal ${
                        touched.acceptTerms && errors.acceptTerms
                          ? "border-primary-normal text-primary-normal"
                          : "border-secondary-active text-secondary-active checked:border-secondary-dark checked:bg-secondary-active"
                      } rounded-md bg-white transition-all duration-200 focus:ring-2 focus:ring-secondary-hover`}
                    />
                    <TermsAndPrivacyLabel
                      textTemplate={translations["signUp.acceptTerms"]}
                      termsText={translations["signUp.terms"]}
                      privacyText={translations["signUp.privacy"]}
                      termsUrl="https://www.donnavino.dk/privacy-policy" // Update when we have a terms page
                      privacyUrl="https://www.donnavino.dk/privacy-policy"
                    />
                  </label>
                  {touched.acceptTerms && errors.acceptTerms && (
                    <div className="text-xs text-primary-normal">
                      {errors.acceptTerms}
                    </div>
                  )}

                  {/* Subscribe to Newsletter Checkbox */}
                  <label className="flex cursor-pointer items-center space-x-3">
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
                      className="size-5 rounded accent-secondary-normal"
                    />
                    <span className="text-bodyMedium text-secondary-dark sm:text-bodyLarge">
                      {translations["signUp.updates"]}
                    </span>
                  </label>
                </div>

                <div className="mt-4 w-full">
                  <Button
                    text={
                      isSubmitting
                        ? translations["common.submitting"]
                        : translations["signUp.create-button"]
                    }
                    onClick={handleSubmit}
                    variant="redWide"
                    disabled={isSubmitting}
                    data-testid="submit-button"
                    aria-label="Submit Sign Up"
                  />
                </div>

                {/* Error Message */}
                {!success && msg && (
                  <div className="mt-3 flex justify-center">
                    <p
                      className="text-center text-bodySmall text-primary-normal sm:text-bodyMedium"
                      aria-live="polite"
                      data-testid="message-status"
                    >
                      {msg}
                    </p>
                  </div>
                )}

                {/* Loading Indicator */}
                {(isSubmitting || isLoading) && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-solid border-primary-normal border-t-transparent" />
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
