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
import { signOut, useSession } from "next-auth/react";
import { logError } from "@/utils/logging";
import { useAPI } from "@/context/ApiProvider";

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
  const { data: session, status } = useSession();
  const { get } = useAPI();

  const [menuItems, setMenuItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (!userId && status !== "authenticated") return;

    if (!userId) {
      setUserId(session?.user?.id);
    }

    const fetchUserInfo = async () => {
      if (!userId) return;

      try {
        const response = await get(`/user/${userId}`);
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        logError("Failed to fetch user info", error);
      }
    };
    fetchUserInfo();
  }, [userId, status]);

  const logout = useCallback(() => {
    signOut({ callbackUrl: "/" });
    setUserInfo(null);
  }, []);

  useEffect(() => {
    if (!translations) return;
    setMenuItems(generateMenuItems(translations, logout));
  }, [translations, logout]);

  return (
    <UserContext.Provider value={{ userId, userInfo, setUserInfo, menuItems }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
