"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile/Profile";

const UserProfile = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   router.push("/login"); // Redirect if not authenticated
    // }
    // Uncomment the above line to enforce authentication
    // Keep them commented to access the profile page without authentication
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg">
      <Profile />
    </div>
  );
};

export default UserProfile;
