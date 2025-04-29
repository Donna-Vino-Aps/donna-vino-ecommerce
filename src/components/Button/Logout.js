"use client";
import React, { useState, useEffect } from "react";
import { useLogoutUser } from "@/services/authService";

const LogoutButton = () => {
  // Get logoutUser from our custom hook
  const { logoutUser } = useLogoutUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for user credentials in localStorage
    const credentials = localStorage.getItem("userCredentials");
    setIsLoggedIn(!!credentials);
  }, []);
  //null when the user is logged in
  if (!isLoggedIn) return null;

  return (
    <button
      onClick={logoutUser}
      className="mx-2.5 my-2.5 mb-5 inline-block w-fit max-w-max rounded bg-primary-normal px-4 py-2 text-primary-light hover:bg-primary-hover_normal"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
