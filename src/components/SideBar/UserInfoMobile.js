import React from "react";

export default function UserInfoMobile() {
  return (
    <div className="flex relative top-8 left-1 gap-4">
      <a href="/" className="">
        <img
          src="/images/courtney-cook-unsplash.jpg"
          alt="User Profile Picture"
          className="w-18 h-18"
        />
        <img
          src="/icons/Edit profile pic.svg"
          className="relative bottom-6 left-12"
          alt="editProfile"
        />
      </a>
      <div className="mt-3">
        <p className="text-headlineSmall text-tertiary1-darker">Admin</p>
        <p className="text-bodyLarge text-[#637381]">admin@donnavino.dk</p>
      </div>
    </div>
  );
}
