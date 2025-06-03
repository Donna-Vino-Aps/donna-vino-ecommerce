import React from "react";
import { Formik } from "formik";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";

const Profile = () => {
  const { translations } = useLanguage();
  return (
    <div className="my-8 flex min-w-[22.5rem] flex-col items-center justify-center rounded-2xl bg-white px-6 py-8 shadow-lg md:min-w-[47.75rem] md:px-8">
      <img
        src="/images/donna-vino-logo-transparent.png"
        alt="Donna Vino logo"
        className="mb-8 h-[4.31rem] w-[6.25rem]"
      />
      <div>
        <img
          src="/images/Avatar.jpg"
          alt="Profile picture"
          className="h-[9.375rem] w-[9.375rem] rounded-full"
        />
        <img
          src="/icons/Edit profile pic.svg"
          className="relative bottom-[2.125rem] left-[6.8rem] h-6 w-6"
          alt="Edit profile picture icon."
        />
      </div>
      <h2 className="text-displaySmall">Davide Rossi</h2>
      <p className="mb-5 mt-2 text-labelLarge md:mb-7 md:mt-4">Denmark</p>
      <h3 className="mb-4 self-start text-headlineSmall">Personal Details</h3>
      <Formik
        initialValues={{
          firstName: "Davide",
          lastName: "Rossi",
          email: "daviderossi@emailadress.com",
          password: "password",
          address: "Kirkesvinget 1, 2610 Rødovre",
          country: "Denmark",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSignup(values, setSubmitting);
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
            <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
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
              />

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
            <div className="relative top-1 mt-4 w-full md:top-2">
              <Button
                text={
                  isSubmitting
                    ? translations["common.submitting"]
                    : translations["profile.button.edit"]
                }
                onClick={handleSubmit}
                icon="/icons/pencil.svg"
                color="secondary"
                width="full"
                extraStyle="py-3 min-h-[3.125rem]"
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
