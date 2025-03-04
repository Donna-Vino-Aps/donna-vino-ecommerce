import React, { useState } from "react";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);
  return (
    <div className="relative">
      {/* User Icon Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        <img src="/icons/user-alt.svg" alt="Search icon" />
      </button>

      {/* Dropdown menu */}
      <div
        className={`flex absolute right-0 rounded-lg bg-white shadow-lg md:min-w-[10rem] md:min-h-[12.75rem] md:text-tertiary2-hover-dark ${isOpen ? "block" : "hidden"}`}
      >
        <ul className="relative left-6">
          <li className="flex gap-1 my-2 mt-6">
            <img src="/icons/wine-glass-1.svg" alt="wine glass icon"></img>
            <a>My wines</a>
          </li>
          <li className="flex gap-1 my-2">
            <img src="/icons/wine-glass-1.svg" alt="wine glass icon"></img>
            <a>Orders</a>
          </li>
          <li className="flex gap-1 my-2">
            <img src="/icons/wine-glass-1.svg" alt="wine glass icon"></img>
            <a>Account</a>
          </li>
          <li className="flex gap-1 my-2">
            <img src="/icons/wine-glass-1.svg" alt="wine glass icon"></img>
            <a>Settings</a>
          </li>
          <hr className="border-[0.5px]"></hr>
          <li className="flex gap-1 my-2">
            <img src="/icons/wine-glass-1.svg" alt="wine glass icon"></img>
            <a>Log out</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;
