"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile/Profile";

const UserProfile = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userCredentialsToken");
    if (!token) {
      router.push("/login"); // Redirect if not authenticated
    }
  }, []);

  // useEffect(() => {
  //   fetch("/api/auth/check", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((res) => {
  //       if (res.status !== 200) {
  //         router.push("/login");
  //       }
  //     })
  //     .catch(() => {
  //       router.push("/login");
  //     });
  // }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg">
      <Profile />
    </div>
  );
};

export default UserProfile;
