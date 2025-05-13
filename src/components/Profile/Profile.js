"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/api/useFetch";
import { Formik } from "formik";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import Spinner from "../UI/Spinner";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { useCredentials } from "@/context/CredentialsContext";
import Image from "next/image";

const Profile = () => {
  const { storedCredentials } = useCredentials();
  const userId = storedCredentials?.id;
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Check if we are in the browser environment
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("userCredentialsToken");
      setAuthToken(token);
    }
  }, []);

  const router = useRouter();
  const { translations } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
  });

  useEffect(() => {
    logInfo("Stored credentials:", storedCredentials);
  }, [storedCredentials]);

  const { performFetch } = useFetch(
    null, // don't pass URL until ready
    null, // don't pass method until ready
    null,
    {},
    (data) => {
      setInitialValues(data);
      setIsLoading(false);
    },
    { manual: true },
  );

  useEffect(() => {
    if (userId && authToken) {
      logInfo("Triggering fetch for userId:", userId);
      performFetch(`/user/profile/${userId}`, "GET", null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
      });
    }
  }, [userId, authToken]);

  // triggers fetch on mount
  useEffect(() => {
    performFetch();
  }, []);

  if (!userId || isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Redirects user to login if not authenticated
  useEffect(() => {
    if (!storedCredentials && !isLoading) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [storedCredentials, isLoading, router]);

  if (!storedCredentials) return null;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = performFetch(`/user/profile/${userId}`, "PUT", null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        contentType: "application/json",
        credentials: "include",
      });

      const json = await res.json();

      if (json.success) {
        setInitialValues(res.data.result);
        setIsEditing(false);
      } else {
        console.error("Error updating profile:", json.message || json.error);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
      setIsLoading(false);
    }
  }, [fetchError]);

  return (
    <div className="my-8 flex min-w-[22.5rem] flex-col items-center justify-center rounded-2xl bg-white px-6 py-8 shadow-lg md:min-w-[47.75rem] md:px-8">
      <img
        src="/images/donna-vino-logo-transparent.png"
        alt="Donna Vino logo"
        className="mb-8 h-[4.31rem] w-[6.25rem]"
      />
      <div>
        <Image
          src="/images/wineglass-avatar-min.png"
          alt="Profile picture"
          className="h-[9.375rem] w-[9.375rem] rounded-full"
        />
        <Image
          src="/icons/Edit profile pic.svg"
          className="relative bottom-[2.125rem] left-[6.8rem] h-6 w-6"
        />
      </div>
      <h2 className="text-displaySmall">
        {initialValues.firstName} {initialValues.lastName}
      </h2>
      <p className="mb-5 mt-2 text-labelLarge md:mb-7 md:mt-4">
        {initialValues.country}
      </p>
      <h3 className="mb-4 self-start text-headlineSmall">Personal Details</h3>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
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
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              <TextInput
                type="text"
                name="firstName"
                placeholder={translations["profile.placeholder.firstName"]}
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!isEditing}
                data-testid="input-first-name"
                aria-label="First Name"
                error={touched.firstName && errors.firstName}
              />

              <TextInput
                type="text"
                name="lastName"
                placeholder={translations["profile.placeholder.lastName"]}
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!isEditing}
                data-testid="input-last-name"
                aria-label="Last Name"
                error={touched.lastName && errors.lastName}
              />

              <TextInput
                type="email"
                name="email"
                placeholder={translations["profile.placeholder.email"]}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!isEditing}
                data-testid="input-email"
                aria-label="Email"
                error={touched.email && errors.email}
              />

              <TextInput
                name="address"
                type="text"
                placeholder={translations["profile.placeholder.address"]}
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!isEditing}
                data-testid="input-address"
                aria-label="Address"
                error={touched.address && errors.address}
              />

              <TextInput
                name="country"
                type="text"
                placeholder={translations["profile.placeholder.country"]}
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!isEditing}
                isDropdown={true}
                options={[
                  {
                    label: translations["profile.country.sweden"],
                    value: "se",
                  },
                  {
                    label: translations["profile.country.denmark"],
                    value: "dk",
                  },
                ]}
                data-testid="input-country"
                aria-label="Country"
                error={touched.country && errors.country}
              />
            </div>
            <div className="relative top-1 mt-4 w-full md:top-2">
              <Button
                type="submit"
                text={
                  isEditing
                    ? translations["common.save"]
                    : translations["profile.button.edit"]
                }
                onClick={() => {
                  if (!isEditing) {
                    setIsEditing(true);
                  }
                }}
                icon={
                  isEditing
                    ? "/icons/checkmark-circle.svg"
                    : "/icons/pencil.svg"
                }
                variant="greenEdit"
                disabled={isSubmitting}
                data-testid="edit-button"
                aria-label="Edit Profile Page"
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
