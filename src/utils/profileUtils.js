import { logInfo, logError } from "@/utils/logging";
import { getSession } from "next-auth/react";

export const uploadProfileImage = async ({
  file,
  post,
  setUploading,
  setUserInfo,
  setImageUrl,
  showMessage,
}) => {
  if (!file) {
    showMessage("No file selected", "warning");
    return;
  }

  if (!(file instanceof File)) {
    showMessage?.("Invalid file.", "error");
    return;
  }

  if (process.env.NODE_ENV === "development") logInfo("Selected file:", file);

  const formData = new FormData();
  formData.append("file", file);

  const session = await getSession();
  const token = session?.accessToken;

  try {
    setUploading(true);

    const data = await post("/upload/profile-logo", {
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    logInfo("Upload response data:", data);

    const url = data?.cloudinaryUrl || data?.url;

    if (data?.user) {
      setUserInfo(data.user);
      setImageUrl(data.user.picture);
    } else if (url) {
      setUserInfo((prev) => ({ ...prev, picture: url }));
      setImageUrl(url);
    }
    showMessage?.("Image uploaded successfully!", "success");
  } catch (error) {
    logError("Upload failed", error);
    showMessage?.("Upload failed, please try again.", "error");
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
