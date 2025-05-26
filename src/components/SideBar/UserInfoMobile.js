import React, { useEffect, useState } from "react";
import { logInfo } from "@/utils/logging";
import useFetch from "@/hooks/api/useFetch";

export default function UserInfoMobile() {
  const [imageUrl, setImageUrl] = useState(
    "/images/courtney-cook-unsplash.jpg",
  );
  const [uploading, setUploading] = useState(false);
  const [userData, setUserData] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        if (parsedUser.profileImageUrl) {
          setImageUrl(parsedUser.profileImageUrl);
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  const { performFetch } = useFetch(
    "/upload/profile-logo",
    "POST",
    null,
    {},
    (data) => {
      const url = data?.cloudinaryUrl || data?.url;
      if (url) {
        setImageUrl(url);

        // Update localStorage with new profile image
        const updatedUser = { ...userData, profileImageUrl: url };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUserData(updatedUser);
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
    formData.append("file", file);

    for (let pair of formData.entries()) {
      logInfo(pair[0], pair[1]);
    }

    try {
      setUploading(true);
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
