"use client";
import React from "react";
import Profile from "@/components/Profile/Profile";

const UserProfile = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary-light sm:bg-dots-lg sm:bg-dots-size-lg bg-dots-sm bg-dots-size-sm items-center">
      <Profile />
    </div>
  );
};

export default UserProfile;
