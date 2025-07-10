import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/Button/Button";
import TextInput from "@/components/TextInput/TextInput";
import TermsAndPrivacyLabel from "@/components/SignUpScreen/TermsAndPrivacyLabel";
import AgeTooltip from "@/components/SignUpScreen/AgeTooltip";
import CheckboxField from "@/components/FormFields/CheckboxField";
import dayjs from "dayjs";
import { createSignUpSchema } from "@/validation/signUpSchema";
import { useRouter } from "next/navigation";
import { useAPI } from "@/context/ApiProvider";
import { setSessionItem, SESSION_KEYS } from "@/utils/sessionStorage";
import Image from "next/image";

const SignUpScreen = () => {
  const { translations } = useLanguage();
  const router = useRouter();
  const { post, error: apiError, isLoading } = useAPI();
  const [msg, setMsg] = useState("");
  const [success, setSuccessStatus] = useState(false);
  const [userBirthDay, setUserBirthDay] = useState();

  useEffect(() => {
    if (apiError) {
      setMsg(
        typeof apiError === "string"
          ? apiError
          : apiError.message || "An unknown error occurred",
      );
      setSuccessStatus(false);
    }
  }, [apiError]);

  const validationSchema = createSignUpSchema(translations);

  const formatSignUpData = (values) => {
    const formattedBirthdate = values.birthdate
      ? dayjs(values.birthdate).format("YYYY-MM-DD")
      : null;

    return {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      dateOfBirth: formattedBirthdate,
      isSubscribed: values.subscribeToNewsletter,
      authProvider: "local",
    };
  };

  const handleSignup = async (values, setSubmitting) => {
    const formattedData = formatSignUpData(values);
    setMsg("");
    setSuccessStatus(false);

    const responseData = await post("register", { payload: formattedData });

    setSubmitting(false);

    if (responseData) {
      setSuccessStatus(true);
      setSessionItem(SESSION_KEYS.PENDING_USER_EMAIL, values.email);
      router.push("/signup/pending");
    }
  };

  return (
    <section className="my-4 bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg">
      <div className="flex w-full flex-grow flex-col items-center justify-center p-2">
        <div className="my-8 w-full max-w-[47.75rem] items-center justify-center rounded-2xl bg-tertiary2-light p-4 shadow-lg sm:my-20 sm:p-8">
          <Image
            src="/images/donna-vino-logo-transparent.png"
            alt="Donna Vino logo"
            width={100}
            height={69}
            className="mx-auto my-2 h-[4.31rem] w-[6.25rem]"
          />
          <h2
            className="mb-6 text-center text-displaySmall text-tertiary1-darker md:text-displayMedium"
            aria-label="Sign Up"
          >
            {translations["signUp.heading"]}
          </h2>
          <p className="-mt-3 mb-8 text-center text-bodySmall text-tertiary2-darker md:text-bodyLarge">
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
            validateOnMount={true}
            validateOnChange={true}
            validateOnBlur={true}
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
              isValid,
              dirty,
            }) => (
              <form onSubmit={handleSubmit}>
                <h3 className="mb-4 text-headlineSmall md:mb-6 md:text-headlineMedium">
                  {translations["signUp.personal"]}
                </h3>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <TextInput
                    type="text"
                    name="firstName"
                    label={translations["signUp.label.firstName"]}
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && errors.firstName}
                  />

                  <TextInput
                    type="text"
                    name="lastName"
                    label={translations["signUp.label.lastName"]}
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && errors.lastName}
                  />

                  <TextInput
                    type="email"
                    name="email"
                    label={translations["signUp.label.email"]}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                  />

                  <TextInput
                    type="email"
                    name="confirmEmail"
                    label={translations["signUp.label.confirmEmail"]}
                    value={values.confirmEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmEmail && errors.confirmEmail}
                    alternateBackground={true}
                  />

                  <TextInput
                    type="password"
                    name="password"
                    label={translations["signUp.label.password"]}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showPasswordToggle={true}
                    error={touched.password && errors.password}
                    hint={translations["signUp.validation.passwordFormat"]}
                  />

                  <TextInput
                    type="password"
                    name="confirmPassword"
                    label={translations["signUp.label.confirmPassword"]}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showPasswordToggle={true}
                    error={touched.confirmPassword && errors.confirmPassword}
                    alternateBackground={true}
                  />

                  <TextInput
                    name="birthdate"
                    isDate={true}
                    label={translations["signUp.label.birthdate"]}
                    placeholder="__ / __ / ____"
                    value={values.birthdate || userBirthDay}
                    onChange={(newValue) => {
                      setFieldValue("birthdate", newValue);
                      setUserBirthDay(newValue);
                    }}
                    onBlur={handleBlur}
                    error={touched.birthdate && errors.birthdate}
                    hint={translations["signUp.validation.birthdate"]}
                  />

                  <AgeTooltip text={translations["signUp.ageTooltip"]} />
                </div>

                <div className="flex flex-col gap-2 text-bodyLarge text-tertiary1-darker md:gap-4">
                  <CheckboxField
                    name="acceptTerms"
                    checked={values.acceptTerms}
                    onChange={() =>
                      setFieldValue("acceptTerms", !values.acceptTerms)
                    }
                    onBlur={handleBlur}
                    error={touched.acceptTerms && errors.acceptTerms}
                    labelComponent={
                      <TermsAndPrivacyLabel
                        textTemplate={translations["signUp.acceptTerms"]}
                        termsText={translations["signUp.terms"]}
                        privacyText={translations["signUp.privacy"]}
                        termsUrl="https://www.donnavino.dk/privacy-policy" // Update when we have a terms page
                        privacyUrl="https://www.donnavino.dk/privacy-policy"
                      />
                    }
                  />

                  <CheckboxField
                    name="subscribeToNewsletter"
                    checked={values.subscribeToNewsletter}
                    onChange={() =>
                      setFieldValue(
                        "subscribeToNewsletter",
                        !values.subscribeToNewsletter,
                      )
                    }
                    onBlur={handleBlur}
                    label={translations["signUp.updates"]}
                  />
                </div>

                <div className="mt-4 w-full">
                  <Button
                    text={
                      isSubmitting
                        ? translations["common.submitting"]
                        : translations["signUp.create-button"]
                    }
                    onClick={handleSubmit}
                    width="full"
                    disabled={isSubmitting || !(isValid && dirty)}
                    testId="submit-button"
                    ariaLabel="Submit Sign Up"
                  />
                </div>

                {/* Error Message */}
                {!success && msg && (
                  <div className="mt-3 flex justify-center">
                    <p
                      className="text-center text-bodySmall text-others-negative sm:text-bodyMedium"
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
