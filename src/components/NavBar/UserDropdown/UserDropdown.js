import React, { useCallback, useEffect, useRef, useState } from "react";
import DropdownButton from "@/components/NavBar/UserDropdown/DropdownButton";
import DropdownMenu from "@/components/NavBar/UserDropdown/DropdownMenu";
import { useRouter } from "next/navigation";
import { useCredentials } from "@/context/CredentialsContext";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const buttonRef = useRef(null);
  const router = useRouter();

  const toggleDropdown = useCallback(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsOpen(!isOpen);
    }
  }, [isAuthenticated, isOpen]);

  const { storedCredentials } = useCredentials();

  useEffect(() => {
    // Check for user credentials in localStorage
    setIsAuthenticated(!!storedCredentials);
  }, [storedCredentials]);

  return (
    <div className="relative">
      <DropdownButton ref={buttonRef} onClick={toggleDropdown} />
      {isOpen && (
        <DropdownMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          buttonRef={buttonRef}
        />
      )}
    </div>
  );
}
