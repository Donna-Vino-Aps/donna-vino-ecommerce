import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { logInfo, logError } from "@/utils/logging";

const Profile = () => {
  const { translations } = useLanguage();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Failed to fetch profile.");

        setInitialValues({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          password: "", // don't prefill passwords
          address: data.address || "",
          country: data.country || "",
        });
      } catch (err) {
        logError("Failed to fetch profile", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (values, setSubmitting) => {
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // adjust if you store token elsewhere
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to update profile.");
      }

      logInfo("Profile updated!", data);
      // Optionally show a success message here
    } catch (error) {
      logError("Update failed:", error.message);
      // Optionally show an error message
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading profile...</p>;
  }

  if (!initialValues) {
    return (
      <p className="text-center py-10 text-red-500">Failed to load profile.</p>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl justify-center items-center py-8 px-6 min-w-[22.5rem] md:px-8 md:min-w-[47.75rem] shadow-lg my-8">
      <img
        src="/images/donna-vino-logo-transparent.png"
        alt="Donna Vino logo"
        className="w-[6.25rem] h-[4.31rem] mb-8"
      />
      <div>
        <img
          src="/images/Avatar.jpg"
          alt="Profile picture"
          className="w-[9.375rem] h-[9.375rem] rounded-full"
        />
        <img
          src="/icons/Edit profile pic.svg"
          className="relative w-6 h-6 bottom-[2.125rem] left-[6.8rem]"
        />
      </div>
      <h2 className="text-displaySmall">Davide Rossi</h2>
      <p className="text-labelLarge mt-2 mb-5 md:mt-4 md:mb-7">Denmark</p>
      <h3 className="text-headlineSmall self-start mb-4">Personal Details</h3>
      <Formik
        initialValues={
          initialValues || {
            firstName: "Davide",
            lastName: "Rossi",
            email: "daviderossi@emailadress.com",
            password: "password",
            address: "Kirkesvinget 1, 2610 Rødovre",
            country: "Denmark",
          }
        }
        onSubmit={(values, { setSubmitting }) => {
          updateProfile(values, setSubmitting);
        }}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8">
              <TextInput
                type="text"
                name="firstName"
                placeholder={translations["profile.placeholder.firstName"]}
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
                placeholder={translations["profile.placeholder.lastName"]}
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
                placeholder={translations["profile.placeholder.email"]}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                data-testid="input-email"
                aria-label="Email"
                error={touched.email && errors.email}
              />
              {/* 
              <TextInput
                type="password"
                name="password"
                placeholder={translations["profile.placeholder.password"]}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                showPasswordToggle={true}
                data-testid="input-password"
                aria-label="Password"
                error={touched.password && errors.password}
              /> */}

              <TextInput
                name="address"
                type="text"
                placeholder={translations["profile.placeholder.address"]}
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
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
            <div className="relative top-1 md:top-2 w-full mt-4">
              <Button
                text={
                  isSubmitting
                    ? translations["common.submitting"]
                    : translations["profile.button.edit"]
                }
                onClick={handleSubmit}
                icon="/icons/pencil.svg"
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
