import React, { useState, useEffect, useRef } from "react";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

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

  return (
    <div className="relative">
      {/* User Icon Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="cursor-pointer hidden lg:block hover:opacity-85"
      >
        <img src="/icons/user-alt.svg" alt="User icon" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`flex absolute right-0 rounded-xl bg-white shadow-lg md:min-w-[10rem] md:min-h-[12.75rem] md:text-tertiary1-dark ${isOpen ? "block" : "hidden"}`}
        >
          <ul className="relative left-6">
            <li className="flex gap-1 my-4 mt-6 text-bodyMedium">
              <img
                src="/icons/wine-glass-1.svg"
                alt="wine glass icon"
                className="relative bottom-[1px]"
              ></img>
              <a>My wines</a>
            </li>
            <li className="flex gap-1 my-4 text-bodyMedium">
              <img
                src="/icons/wine-glass-1.svg"
                alt="wine glass icon"
                className="relative bottom-[1px]"
              ></img>
              <a>Orders</a>
            </li>
            <li className="flex gap-1 my-4 text-bodyMedium">
              <img
                src="/icons/wine-glass-1.svg"
                alt="wine glass icon"
                className="relative bottom-[1px]"
              ></img>
              <a>Account</a>
            </li>
            <li className="flex gap-1 mt-4 mb-2 text-bodyMedium">
              <img
                src="/icons/wine-glass-1.svg"
                alt="wine glass icon"
                className="relative bottom-[1px]"
              ></img>
              <a>Settings</a>
            </li>
            <hr className="border-[0.5px] min-w-[7.5rem] border-tertiary1-active"></hr>
            <li className="flex gap-1 mt-3 mb-4 text-bodyMedium">
              <img
                src="/icons/wine-glass-1.svg"
                alt="wine glass icon"
                className="relative bottom-[1px]"
              ></img>
              <a>Log out</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
