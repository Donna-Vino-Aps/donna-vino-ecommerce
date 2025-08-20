import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

export default function UserInfoMobile() {
  const { userInfo, setUserInfo } = useUser();
  const [imageUrl, setImageUrl] = useState("/images/Avatar.png");
  useEffect(() => {
    if (userInfo?.picture) setImageUrl(userInfo.picture);
  }, [userInfo]);

  const [uploading, setUploading] = useState(false);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    uploadProfileImage({ file, post, setUserInfo, setImageUrl, setUploading });
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
      {userInfo && (
        <div className="mt-3">
          <p className="text-headlineSmall text-tertiary1-darker">
            {userInfo?.firstName} {userInfo?.lastName}
          </p>
          <p className="text-bodyLarge text-[#637381]">{userInfo?.email}</p>
        </div>
      )}
    </div>
  );
}
