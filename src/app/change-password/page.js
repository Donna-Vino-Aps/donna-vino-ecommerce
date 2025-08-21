"use client";
import React, { useEffect, useState } from "react";
import SEO from "@/components/SEO/SEO";
import Image from "next/image";
import { Formik } from "formik";
import TextInput from "@/components/TextInput/TextInput";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter, useSearchParams } from "next/navigation";
import { passwordSchema } from "@/validation/passwordValidation";
import { useAPI } from "@/context/ApiProvider";
import { useApiError } from "@/hooks/api/useApiError";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";

const ChangePassword = () => {
  const { translations } = useLanguage();
  const router = useRouter();
  const { post, error: apiError, isLoading } = useAPI();
  const errorMsg = useApiError(apiError);
  const searchParams = useSearchParams();
  const [msg, setMsg] = useState();

  useEffect(() => {
    setMsg(errorMsg);
  }, [errorMsg]);

  const validationSchema = passwordSchema(translations);

  const handleChangePassword = async (values, setSubmitting) => {
    setSubmitting(true);
    const userToken = searchParams.get("token") || "";
    const responseData = await post("register/change-password", {
      payload: { password: values.password, token: userToken },
    });
    setSubmitting(false);
    if (responseData?.success) {
      setMsg("");
      router.push("/change-password/completed");
    }
  };
  return (
    <section className="my-4 bg-primary-light bg-dots-sm bg-dots-size-sm px-2 sm:bg-dots-lg sm:bg-dots-size-lg lg:px-0">
      <SEO
        title={translations["changePassword.title"]}
        description={translations["changePassword.description"]}
      />
      <div className="flex w-full flex-grow flex-col items-center justify-center p-2">
        <div className="my-8 w-full max-w-[47.75rem] items-center justify-center rounded-2xl bg-tertiary2-light p-4 shadow-lg sm:my-20 sm:p-10">
          <Image
            src="/images/donna-vino-logo-transparent.png"
            alt="Donna Vino logo"
            width={100}
            height={69}
            className="mx-auto mb-8  h-[4.31rem] w-[6.25rem]"
          />
          <h2
            className="mb-6 text-titleLarge font-medium sm:text-displaySmall"
            aria-label="Change password"
          >
            {translations["changePassword.heading"]}
          </h2>
          <p className="mb-10 text-bodyMedium sm:text-bodyLarge">
            {translations["changePassword.paragraph1"]}
            <br />
            <span>{translations["changePassword.paragraph2"]}</span>
          </p>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleChangePassword(values, setSubmitting);
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
                <div className="mb-10 grid grid-cols-1 gap-4">
                  <TextInput
                    type="password"
                    name="password"
                    label={translations["changePassword.label.password"]}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showPasswordToggle={true}
                    error={touched.password && errors.password}
                  />

                  <TextInput
                    type="password"
                    name="confirmPassword"
                    label={translations["changePassword.label.confirmPassword"]}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showPasswordToggle={true}
                    error={touched.confirmPassword && errors.confirmPassword}
                  />
                </div>

                <div className="mb-4 w-full">
                  <Button
                    text={translations["changePassword.button"]}
                    width="full"
                    onClick={handleSubmit}
                    extraStyle="h-[50px] font-medium"
                    testId="submit-button"
                    ariaLabel={translations["changePassword.button"]}
                  />
                </div>
                <div className="mt-4 w-full">
                  <Button
                    text={translations["changePassword.back.button"]}
                    width="full"
                    onClick={() => {
                      router.push("login");
                    }}
                    color="white"
                    variant="outline"
                    border="primaryNormal"
                    extraStyle="h-[50px] border-[1.5px] font-medium"
                    testId="back-to-login-button"
                    ariaLabel={translations["changePassword.back.button"]}
                  />
                </div>
                {msg && (
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

export default ChangePassword;
