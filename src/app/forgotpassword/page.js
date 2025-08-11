"use client";
import React from "react";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import SEO from "@/components/SEO/SEO";

import Link from "next/link";
import TextInput from "@/components/TextInput/TextInput";
const ForgotPassword = () => {
  const { translations } = useLanguage();

  return (
    <div className="relative flex h-screen items-center justify-center bg-[#FDE8E9]">
      <SEO
        title={translations["forgotPassword.title"]}
        description={translations["forgotPassword.description"]}
      />
      <img
        src="/vector.svg"
        alt="Background Vector"
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
      <div className="relative w-[560px] rounded-2xl bg-white pb-10 pl-20 pr-20 pt-10 text-center  shadow-lg">
        <section className="mb-8 sm:!w-[133px]">
          <Button
            text={translations["button.go-back"]}
            icon="/icons/arrow-left.svg"
            variant="outline"
            border="primary"
            color="transparent"
            width="medium"
            ariaLabel="Go back"
            testId="go-back-button"
            onClick={() => {
              history.go(-1);
            }}
          />
        </section>
        <h1 className="mb-4 text-left text-headlineLarge">
          {translations["forgotPassword.heading"]}
        </h1>
        <p className="mb-4 w-[400px] text-left">
          {" "}
          {translations["forgotPassword.paragraph"]}
        </p>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Handle form submission
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
            isValid,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <p className="text-left">Email Address</p>
              <TextInput
                type="email"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.email && errors.email}
                placeholder={translations["forgotPassword.input"]}
                className="mb-4 mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mb-4 mt-2 w-full">
                <Link href="/check-in-box">
                  <Button
                    text={translations["forgotPassword.button"]}
                    width="full"
                    data-testid="forgot-password-send-reset-link-button"
                    aria-label="forgot password send reset link button"
                  />{" "}
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>{" "}
    </div>
  );
};

export default ForgotPassword;
