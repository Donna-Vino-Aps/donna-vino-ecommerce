import React, { useRef, useEffect } from "react";
import MenuItem from "./MenuItem";
import PropTypes from "prop-types";
import { useUser } from "@/context/UserContext";

export default function DropdownMenu({ isOpen, onClose, buttonRef }) {
  const { menuItems } = useUser();

  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose(); // close dropdown
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  /* Dropdown menu is rendered only if user is authenticated */
  return (
    <div
      ref={menuRef}
      className={`absolute right-0 flex rounded-xl bg-white shadow-lg md:min-w-[10rem] md:text-tertiary1-dark ${isOpen ? "block" : "hidden"}`}
    >
      <ul className="relative m-2">
        {menuItems.map((item, index) => (
          <MenuItem
            key={`UserDropdownItem${index}`}
            variant={item.variant}
            item={item}
            url={item.url}
            title={item.title}
            image={item.image}
            onClick={item.onClick}
            onClose={onClose}
          />
        ))}
      </ul>
    </div>
  );
}

DropdownMenu.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  menuItems: PropTypes.arrayOf(PropTypes.shape({})),
  buttonRef: PropTypes.func,
};
