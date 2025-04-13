import React, { useContext, useEffect, useRef, useState } from "react";
import DropdownButton from "@/components/NavBar/UserDropdown/DropdownButton";
import DropdownMenu from "@/components/NavBar/UserDropdown/DropdownMenu";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CredentialsContext } from "@/context/credentialsContext";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const buttonRef = useRef(null);
  const router = useRouter();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const { translations } = useLanguage();
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const DefaultIcon = {
    src: "/icons/wine-glass-1.svg",
    alt: "wine glass icon",
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setStoredCredentials(null);
      router.push("/"); // Redirect to start page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const userMenuItems = [
    {
      image: DefaultIcon,
      url: "/my-wines",
      title: translations["user-dropdown.wines"],
    },
    {
      image: DefaultIcon,
      url: "/orders",
      title: translations["user-dropdown.orders"],
    },
    {
      image: DefaultIcon,
      url: "/user/profile",
      title: translations["user-dropdown.account"],
    },
    {
      image: DefaultIcon,
      url: "/settings",
      title: translations["user-dropdown.settings"],
    },
    {
      variant: "separator",
    },
    {
      title: "Logout",
      variant: "button",
      onClick: handleLogout,
    },
  ];

  const anonymousItems = [
    {
      title: "Login",
      variant: "button",
      onClick: handleLogin,
    },
  ];

  // useEffect(() => {
  //   // Check for user credentials in localStorage
  //   setIsAuthenticated(!!storedCredentials);
  // }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setMenuItems(userMenuItems);
    } else {
      setMenuItems(anonymousItems);
    }
  }, [isAuthenticated]);

  return (
    <div className="relative">
      <DropdownButton ref={buttonRef} onClick={toggleDropdown} />
      {isOpen && (
        <DropdownMenu
          isOpen={isOpen}
          menuItems={menuItems}
          onClose={() => setIsOpen(false)}
          buttonRef={buttonRef}
        />
      )}
    </div>
  );
}
