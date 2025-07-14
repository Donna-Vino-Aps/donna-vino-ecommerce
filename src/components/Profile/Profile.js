import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { logInfo } from "@/utils/logging";
import { useUser } from "@/context/UserContext";
import { useSession } from "next-auth/react";
import { useAPI } from "@/context/ApiProvider";

const Profile = () => {
  const { translations } = useLanguage();

  const { userData, setUserData } = useUser();

  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  if (!accessToken) {
    alert("You must be logged in to upload a profile picture.");
    return;
  }

  const [imageUrl, setImageUrl] = useState(
    userData?.picture || "/images/Avatar.png",
  );

  useEffect(() => {
    if (userData?.picture) {
      setImageUrl(userData.picture);
    }
  }, [userData?.picture]);

  const [uploading, setUploading] = useState(false);

  const { post } = useAPI();

  const handleFileUpload = async (file) => {
    if (!file) {
      alert("No file selected");
      return;
    }
    logInfo("Selected file:", file);

    const formData = new FormData();
    formData.append("file", file);

    for (let pair of formData.entries()) {
      logInfo(pair[0], pair[1]);
    }

    try {
      setUploading(true);

      const data = await post("http://localhost:5001/api/upload/profile-logo", {
        body: formData,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const url = data?.cloudinaryUrl || data?.url;
      if (url && userData) {
        setUserData({ ...userData, picture: url });
        setImageUrl(url);
        alert("✅ Image uploaded successfully!");
      }
    } catch (error) {
      console.error(
        "Upload failed:",
        error?.response || error?.message || error,
      );
      alert("Upload failed, please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const handleSignup = async (values, setSubmitting) => {
    // Replace with real API call if needed
    logInfo("Submitting updated user:", values);
    setSubmitting(false);
  };

  return (
    <div className="my-8 flex min-w-[22.5rem] flex-col items-center justify-center rounded-2xl bg-white px-6 py-8 shadow-lg md:min-w-[47.75rem] md:px-8">
      <img
        src="/images/donna-vino-logo-transparent.png"
        alt="Donna Vino logo"
        className="mb-8 h-[4.31rem] w-[6.25rem]"
      />
      <div>
        <div className="relative h-[9.375rem] w-[9.375rem]">
          <img
            src={imageUrl}
            alt="Profile picture"
            className="h-[9.375rem] w-[9.375rem] rounded-full object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-sm text-white">
              Uploading...
            </div>
          )}
        </div>

        <label htmlFor="profile-pic-upload2">
          <img
            src="/icons/Edit profile pic.svg"
            className="relative bottom-[2.125rem] left-[6.8rem] h-6 w-6 cursor-pointer"
          />
          <input
            id="profile-pic-upload2"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      <h2 className="text-displaySmall">
        {userData?.firstName} {userData?.lastName}
      </h2>
      <p className="mb-5 mt-2 text-labelLarge md:mb-7 md:mt-4">
        {userData?.country || "Unknown Country"}
      </p>

      <h3 className="mb-4 self-start text-headlineSmall">Personal Details</h3>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: userData?.firstName || "",
          lastName: userData?.lastName || "",
          email: userData?.email || "",
          password: "", // Don't pre-fill password
          address: userData?.address || "",
          country: userData?.country || "",
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
