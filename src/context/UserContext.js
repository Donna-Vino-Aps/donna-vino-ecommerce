"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";
import { signOut } from "next-auth/react";

const UserContext = createContext({ menuItems: [] });

const generateMenuItems = (translations, logout) => [
  {
    image: {
      src: "/icons/userMenu/account.svg",
      alt: "account",
    },
    url: "/user/profile",
    title: translations["user-dropdown.account"],
  },
  // {
  //   image: {
  //     src: "/icons/userMenu/favorites.svg",
  //     alt: "favorites",
  //   },
  //   url: "/favorites",
  //   title: translations["user-dropdown.favorites"],
  // },
  // {
  //   image: {
  //     src: "/icons/userMenu/orders.svg",
  //     alt: "orders",
  //   },
  //   url: "/orders",
  //   title: translations["user-dropdown.orders"],
  // },
  //
  // {
  //   image: {
  //     src: "/icons/userMenu/settings.svg",
  //     alt: "settings",
  //   },
  //   url: "/settings",
  //   title: translations["user-dropdown.settings"],
  // },
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
    onClick: logout,
  },
];

export const UserContextProvider = ({ children }) => {
  const { translations } = useLanguage();

  const [menuItems, setMenuItems] = useState([]);

  const logout = useCallback(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  useEffect(() => {
    if (!translations) return;
    setMenuItems(generateMenuItems(translations, logout));
  }, [translations, logout]);

  return (
    <UserContext.Provider value={{ menuItems }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
