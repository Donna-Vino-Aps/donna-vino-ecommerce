"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/authService"; // Import logout function

const LogoutButton = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for the key "userCredentials" in localStorage
    const userCredentials = localStorage.getItem("userCredentials");
    setIsLoggedIn(!!userCredentials);
  }, []);

  // If no user is logged in, don't render anything
  if (!isLoggedIn) return null;

  const handleLogout = async () => {
    await logoutUser();
    router.push("/"); // Navigate to home
  };

  return (
    <button
      onClick={handleLogout}
      className="w-fit mb-5 max-w-max inline-block px-4 py-2 bg-primary-normal text-primary-light rounded hover:bg-primary-hover_normal mx-2.5 my-2.5"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
