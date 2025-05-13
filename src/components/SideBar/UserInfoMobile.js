import React, { useState } from "react";
import { logInfo } from "@/utils/logging";
import useFetch from "@/hooks/api/useFetch";

export default function UserInfoMobile() {
  const [imageUrl, setImageUrl] = useState(
    "/images/courtney-cook-unsplash.jpg",
  );
  const [uploading, setUploading] = useState(false);

  // Initialize useFetch without predefining a FormData body
  const { performFetch } = useFetch(
    "/upload/profile-logo",
    "POST",
    null,
    {},
    (data) => {
      if (data?.url) {
        setImageUrl(data.url);
      }
      alert("✅ Image uploaded successfully!");
    },
  );

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("No file selected");
      return;
    }

    logInfo("Selected file:", file);

    const formData = new FormData();
    formData.append("file", file); // Key must match backend expectation

    // Optional: log FormData content
    for (let pair of formData.entries()) {
      logInfo(pair[0], pair[1]);
    }

    try {
      setUploading(true);
      // Now pass formData as the third argument
      await performFetch({}, undefined, formData);
    } catch (error) {
      console.error(
        "Upload failed:",
        error?.response || error?.message || error,
      );
    } finally {
      setUploading(false);
    }
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
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm rounded-full">
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
        <p className="text-headlineSmall text-tertiary1-darker">Admin</p>
        <p className="text-bodyLarge text-[#637381]">admin@donnavino.dk</p>
      </div>
    </div>
  );
}
