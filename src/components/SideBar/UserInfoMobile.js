import React, { useState } from "react";
import { logInfo } from "@/utils/logging";

export default function UserInfoMobile() {
  const [imageUrl, setImageUrl] = useState(
    userData?.profileImageUrl || "/images/Avatar.png",
  );
  const [uploading, setUploading] = useState(false);
  const { userData, setUserData } = useUser();

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

      // Pass formData as body and explicitly provide empty headers object
      // so the APIProvider won't set Content-Type (browser handles it)
      const data = await post("/upload/profile-logo", {
        body: formData,
        headers: {}, // Important: no 'Content-Type' header here!
      });

      const url = data?.cloudinaryUrl || data?.url;
      if (url && user) {
        setUserData({ ...userData, profileImageUrl: url });
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

  return (
    <div className="relative left-1 top-8 flex gap-4">
      <label htmlFor="profile-pic-upload" className="cursor-pointer">
        <div className="relative">
          <img
            src={imageUrl}
            alt="User Profile Picture"
            className="h-20 w-20 rounded-full object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-sm text-white">
              Uploading...
            </div>
          )}
          <img
            src="/icons/Edit profile pic.svg"
            alt="Edit Profile Icon"
            className="absolute bottom-0 right-0"
          />
        </div>
        <input
          id="profile-pic-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
      <div className="mt-3">
        <p className="text-headlineSmall text-tertiary1-darker">
          {userData?.firstName || "Admin"}
        </p>
        <p className="text-bodyLarge text-[#637381]">
          {userData?.email || "admin@donnavino.dk"}
        </p>
      </div>
    </div>
  );
}
