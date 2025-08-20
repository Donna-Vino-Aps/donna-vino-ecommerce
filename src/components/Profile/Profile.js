import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import { useLanguage } from "@/context/LanguageContext";
// import { logInfo } from "@/utils/logging";
import { useUser } from "@/context/UserContext";
import { useAPI } from "@/context/ApiProvider";
import { uploadProfileImage, submitUserUpdates } from "@/utils/profileUtils";

const Profile = () => {
  const { translations } = useLanguage();

  const { userInfo, setUserInfo } = useUser();
  const [imageUrl, setImageUrl] = useState("/images/Avatar.png");

  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!userInfo) return;
    if (userInfo?.picture) {
      setImageUrl(userInfo.picture);
    }
  }, [userInfo]);

  const { post, put } = useAPI();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    uploadProfileImage({ file, post, setUserInfo, setImageUrl, setUploading });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await submitUserUpdates({
        values,
        userId: userInfo.id,
        put: put,
        setUserInfo,
      });
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setSubmitting(false);
      setIsEditing(false);
    }
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
            src={imageUrl || "/images/Avatar.png"}
            alt="Profile picture"
            className="h-[9.375rem] w-[9.375rem] rounded-full"
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-sm text-white">
              {translations["common.uploading"]}
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
        {userInfo?.firstName} {userInfo?.lastName}
      </h2>
      <p className="mb-5 mt-2 text-labelLarge md:mb-7 md:mt-4">
        {userInfo?.email || ""}
      </p>
      <h3 className="mb-4 self-start text-headlineSmall">Personal Details</h3>
      <Formik
        initialValues={{
          firstName: userInfo?.firstName || "",
          lastName: userInfo?.lastName || "",
          address: userInfo?.address || "",
          country: userInfo?.country || "",
        }}
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
                label={translations["profile.placeholder.firstName"]}
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
                label={translations["profile.placeholder.lastName"]}
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!isEditing}
                data-testid="input-last-name"
                aria-label="Last Name"
                error={touched.lastName && errors.lastName}
              />

              <TextInput
                name="address"
                type="text"
                placeholder={translations["profile.placeholder.address"]}
                label={translations["profile.placeholder.address"]}
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
                label={translations["profile.placeholder.country"]}
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!isEditing}
                isDropdown={true}
                options={[
                  {
                    label: translations["profile.country.denmark"],
                    value: "dk",
                  },
                  {
                    label: translations["profile.country.sweden"],
                    value: "se",
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
                  isEditing
                    ? translations["common.save"]
                    : translations["profile.button.edit"]
                }
                onClick={() => {
                  if (!isEditing) {
                    setIsEditing(true);
                  } else {
                    setIsEditing(false);
                  }
                }}
                icon={
                  isEditing
                    ? "/icons/checkmark-circle-white.svg"
                    : "/icons/pencil.svg"
                }
                color="secondary"
                type={isEditing ? "submit" : "button"}
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
