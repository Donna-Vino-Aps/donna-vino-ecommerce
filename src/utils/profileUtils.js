import { logInfo, logError } from "@/utils/logging";

export const uploadProfileImage = async ({
  file,
  post,
  setUploading,
  setUserInfo,
  setImageUrl,
}) => {
  if (!file) {
    alert("No file selected");
    return;
  }

  if (!(file instanceof File)) {
    alert("Invalid file.");
    return;
  }

  if (process.env.NODE_ENV === "development") logInfo("Selected file:", file);

  const formData = new FormData();
  formData.append("file", file);

  try {
    setUploading(true);

    const data = await post("/upload/profile-logo", { body: formData });
    const url = data?.cloudinaryUrl || data?.url;

    if (data?.user) {
      setUserInfo(data.user);
      setImageUrl(data.user.picture);
    } else if (url) {
      setUserInfo((prev) => ({ ...prev, picture: url }));
      setImageUrl(url);
    }
    alert("✅ Image uploaded successfully!");
  } catch (error) {
    logError("Upload failed", error);
    alert("Upload failed, please try again.");
  } finally {
    setUploading(false);
  }
};

export const submitUserUpdates = async ({
  values,
  userId,
  put,
  setUserInfo,
}) => {
  try {
    const updatedUser = await put(`/user/${userId}`, {
      body: {
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        country: values.country,
      },
    });

    if (process.env.NODE_ENV === "development") {
      logInfo("Submitting updated user:", values);
    }

    setUserInfo(updatedUser);
  } catch (error) {
    logError("Error updating user info", error);
  }
};
