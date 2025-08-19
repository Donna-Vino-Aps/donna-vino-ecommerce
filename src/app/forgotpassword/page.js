"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import SEO from "@/components/SEO/SEO";
import { emailValidation } from "@/validation/emailValidation";
import TextInput from "@/components/TextInput/TextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAPI } from "@/context/ApiProvider";
import { useRouter } from "next/navigation";
import { useApiError } from "@/hooks/api/useApiError";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";

const ForgotPassword = () => {
  const { translations } = useLanguage();
  const router = useRouter();
  const { post, error: apiError, isLoading } = useAPI();
  const errorMsg = useApiError(apiError);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (errorMsg) {
      setMsg(errorMsg);
    }
  }, [errorMsg]);

  const handleForgotPassword = async (values, setSubmitting) => {
    setSubmitting(true);
    const responseData = await post("register/reset-password", {
      payload: { email: values.email },
    });
    setSubmitting(false);
    if (responseData?.success) {
      setMsg("");
      sessionStorage.setItem("forgotEmail", values.email);
      router.push(`/check-in-box`);
    } else {
      setMsg(responseData?.message);
    }
  };

  const validationSchema = Yup.object({
    email: emailValidation(translations),
  });

  return (
    <section className="my-4 bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg md:py-8">
      <SEO
        title={translations["forgotPassword.title"]}
        description={translations["forgotPassword.description"]}
      />
      <div className="mx-2 flex flex-col items-center justify-center py-8 sm:py-24">
        <div className="relative mx-3 w-full max-w-[560px] rounded-2xl bg-white px-6 py-10 shadow-lg sm:px-20">
          <section className="mb-8">
            <Button
              text={translations["button.go-back"]}
              icon="/icons/arrow-left.svg"
              variant="outline"
              border="primary"
              color="transparent"
              width="medium"
              ariaLabel="Go back"
              testId="go-back-button"
              extraStyle="sm:h-[50px] h-[40px] w-[117px]"
              onClick={() => {
                history.go(-1);
              }}
            />
          </section>
          <h1 className="mb-4 text-left text-titleLarge sm:text-headlineMedium">
            {translations["forgotPassword.heading"]}
          </h1>
          <p className="mb-4 text-left text-bodyLarge">
            {translations["forgotPassword.paragraph"]}
          </p>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleForgotPassword(values, setSubmitting);
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
              errors,
              touched,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextInput
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  className="mb-4 mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mb-4 mt-4 w-full">
                  <Button
                    text={translations["forgotPassword.button"]}
                    width="full"
                    variant="submit"
                    data-testid="forgot-password-send-reset-link-button"
                    aria-label="forgot password send reset link button"
                  />
                </div>
                {msg && !isSubmitting && (
                  <div className="mt-3 flex justify-center">
                    <ErrorMessage message={msg} />
                  </div>
                )}
                {isSubmitting && isLoading && (
                  <div className="mt-4 flex items-center justify-center">
                    <Spinner size="small" />
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

export default ForgotPassword;
