import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "@/hooks/api/useFetch";
import { useRouter } from "next/navigation";
import { useCredentials } from "@/context/CredentialsContext";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);

  const { translations, language } = useLanguage();
  const router = useRouter();
  const { setStoredCredentials } = useCredentials();

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

  useEffect(() => {
    setMenuItems([
      {
        image: {
          src: "/icons/userMenu/account.svg",
          alt: "account",
        },
        url: "/user/profile",
        title: translations["user-dropdown.account"],
        // title: "user-dropdown.account",
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
        onClick: performFetch,
      },
    ]);
  }, [translations, language]);

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
