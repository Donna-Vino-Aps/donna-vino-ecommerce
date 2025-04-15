import React, { useRef, useEffect, useContext } from "react";
import MenuItem from "./MenuItem";
import PropTypes from "prop-types";

import { useLanguage } from "@/context/LanguageContext";
import useFetch from "@/hooks/api/useFetch";
import { useRouter } from "next/navigation";
import { CredentialsContext } from "@/context/credentialsContext";

export default function DropdownMenu({ isOpen, onClose, buttonRef }) {
  const router = useRouter();

  const { setStoredCredentials } = useContext(CredentialsContext);

  const { translations } = useLanguage();

  const handleLogout = async () => {
    setStoredCredentials(null);
    await localStorage.removeItem("userCredentials");
    await localStorage.removeItem("userCredentialsToken");
    router.push("/"); // Redirect to start page
  };

  const { performFetch } = useFetch(
    "/user/log-out",
    "POST",
    { withCredentials: true },
    {},
    handleLogout,
  );

  const menuItems = [
    {
      image: {
        src: "/icons/userMenu/account.svg",
        alt: "account",
      },
      url: "/user/profile",
      title: translations["user-dropdown.account"],
    },
    {
      image: {
        src: "/icons/userMenu/favorites.svg",
        alt: "favorites",
      },
      url: "/favorites",
      title: translations["user-dropdown.favorites"] || "Favorites",
    },
    {
      image: {
        src: "/icons/userMenu/orders.svg",
        alt: "orders",
      },
      url: "/orders",
      title: translations["user-dropdown.orders"],
    },

    {
      image: {
        src: "/icons/userMenu/account.svg",
        alt: "account",
      },
      url: "/settings",
      title: translations["user-dropdown.settings"],
    },
    {
      variant: "separator",
    },
    {
      image: {
        src: "/icons/userMenu/logout.svg",
        alt: "logout",
      },
      title: translations["user-dropdown.logout"],
      variant: "button",
      onClick: performFetch,
    },
  ];

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
