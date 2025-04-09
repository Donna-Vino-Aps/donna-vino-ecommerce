"use client";

import React, { useState, useEffect, useRef } from "react";
// import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useLanguage } from "../../context/LanguageContext";
// import { CredentialsContext } from "../../context/credentialsContext";

const UserDropdown = () => {
  const router = useRouter();
  const { translations } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  // const { storedCredentials, setStoredCredentials } =
  //   useContext(CredentialsContext);

  // This line checks if the user is logged in or not
  // const isAuthenticated = Boolean(storedCredentials?.user);

  // This code says that the user is authenticated
  const isAuthenticated = true;

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setStoredCredentials(null);
      router.push("/"); // Redirect to start page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function that shows user dropdown if logged in, or redirects to /login if not authenticated
  const handleButtonClick = () => {
    if (isAuthenticated) {
      toggleDropdown();
    } else {
      router.push("/login"); // Redirect to login page
    }
  };

  return (
    <div className="relative">
      {/* User Icon Button */}
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="cursor-pointer hidden lg:block hover:opacity-85"
        aria-label="User menu"
      >
        <img src="/icons/user-alt.svg" alt="User icon" aria-hidden="true" />
      </button>

      {/* Dropdown menu is rendered only if user is authenticated */}
      {isAuthenticated && isOpen && (
        <div
          ref={dropdownRef}
          className={`flex absolute right-0 rounded-xl bg-white shadow-lg md:min-w-[10rem] md:min-h-[12.75rem] md:text-tertiary1-dark ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="relative left-6">
            <li className="flex gap-1 my-4 mt-6 text-bodyMedium">
              <img
                src="/icons/wine-glass-1.svg"
                alt="wine glass icon"
                className="relative bottom-[1px]"
              ></img>
              <Link href="/my-wines">
                {translations["user-dropdown.wines"]}
              </Link>
            </li>
            <li className="flex gap-1 my-4 text-bodyMedium">
              <img
                src="/icons/wine-glass-1.svg"
                alt="wine glass icon"
                className="relative bottom-[1px]"
              ></img>
              <Link href="/orders">{translations["user-dropdown.orders"]}</Link>
            </li>
            <li className="flex gap-1 my-4 text-bodyMedium">
              <img
                src="/icons/wine-glass-1.svg"
                alt="wine glass icon"
                className="relative bottom-[1px]"
              ></img>
              <Link href="/account">
                {translations["user-dropdown.account"]}
              </Link>
            </li>
            <li className="flex gap-1 mt-4 mb-2 text-bodyMedium">
              <img
                src="/icons/wine-glass-1.svg"
                alt="wine glass icon"
                className="relative bottom-[1px]"
              ></img>
              <Link href="/settings">
                {translations["user-dropdown.settings"]}
              </Link>
            </li>
            <hr className="border-[0.5px] min-w-[7.5rem] border-tertiary1-active"></hr>
            <li
              className="flex gap-1 mt-3 mb-4 text-bodyMedium"
              onClick={handleLogout}
            >
              <img
                src="/icons/wine-glass-1.svg"
                alt="wine glass icon"
                className="relative bottom-[1px]"
              ></img>
              <button role="button">
                {translations["user-dropdown.logout"]}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
