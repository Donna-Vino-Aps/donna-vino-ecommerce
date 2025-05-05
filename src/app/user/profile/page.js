"use client";
import React from "react";
import Profile from "@/components/Profile/Profile";

const UserProfile = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg">
      <Profile />
    </div>
  );
};

export default UserProfile;
