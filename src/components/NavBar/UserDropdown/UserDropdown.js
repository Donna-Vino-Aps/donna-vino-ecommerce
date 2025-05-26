import React, { useCallback, useRef, useState } from "react";
import DropdownButton from "@/components/NavBar/UserDropdown/DropdownButton";
import DropdownMenu from "@/components/NavBar/UserDropdown/DropdownMenu";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const router = useRouter();
  const { data: session } = useSession();

  const isAuthenticated = !!session;

  const toggleDropdown = useCallback(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsOpen((prevState) => !prevState);
    }
  }, [isAuthenticated]);

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
