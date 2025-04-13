import React from "react";
import MenuItem from "./MenuItem";
import PropTypes from "prop-types";

import { useRef, useEffect } from "react";

export default function DropdownMenu({
  isOpen,
  menuItems,
  onClose,
  buttonRef,
}) {
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
      className={`flex absolute right-0 rounded-xl bg-white px-2 py-2 shadow-lg md:text-tertiary1-dark ${isOpen ? "block" : "hidden"}`}
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
