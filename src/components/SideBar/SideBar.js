import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import LanguageSwitch from "../NavBar/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";
import SocialLinks from "@/components/SideBar/SocialLinks";
import UserInfoMobile from "@/components/SideBar/UserInfoMobile";
import { signOut, useSession } from "next-auth/react";

const SideBar = ({ isMenuOpen, toggleMenu, navLinks }) => {
  const [openDropdowns, setOpenDropdowns] = useState({
    wines: false,
    grapeszones: false,
    account: false,
  });
  const { data: session } = useSession();
  const { translations } = useLanguage();

  const logout = useCallback(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  // Hide the main content scroll when sideBar opened
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isDropdownOpen = (id) => openDropdowns[id] ?? false;

  return (
    <div
      className={`fixed right-0 top-0 z-40 h-full w-full overflow-y-auto bg-white lg:hidden ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
      data-testid="side-bar"
      role="dialog"
      aria-labelledby="menu-heading"
      inert={!isMenuOpen}
    >
      <div className="flex h-full flex-col gap-8 p-8">
        <div className="flex items-center justify-between">
          {session && <UserInfoMobile />}
          <button
            role="button"
            className="self-start"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <img
              src="/icons/close.svg"
              alt="Close icon"
              className="mr-1 mt-3 h-[1.12rem] w-[1.12rem]"
            />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h2 id="menu-heading" className="sr-only">
            Mobile navigation menu
          </h2>
          <hr className="my-2 border-t-slate-300" />
          <nav role="navigation">
            <ul className="ml-2 flex flex-col">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`relative flex gap-5 duration-300 active:rounded-lg active:bg-primary-light`}
                >
                  <img
                    className="relative left-[6px] top-[10px] inline-block h-[1.25rem] w-[1.25rem] text-right align-middle"
                    src={link.icon}
                  ></img>

                  {/* Render dropdown if dropdown is set to true, otherwise render a link */}
                  <div className="flex w-full flex-col">
                    {link.dropdown ? (
                      <button
                        onClick={() => toggleDropdown(link.id)}
                        className="relative right-3 flex items-center rounded-md px-3 py-2 text-titleMedium text-tertiary1-normal"
                      >
                        {link.label}
                        <img
                          src="/icons/chevron-down.svg"
                          alt="Chevron Down"
                          className={`relative right-1 top-[2px] ml-2 transition-transform ${
                            isDropdownOpen(link.id) ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={toggleMenu}
                        className="block py-2 text-titleMedium text-tertiary1-normal"
                      >
                        {link.label}
                      </Link>
                    )}

                    {/* Dropdown menu */}
                    {session && (
                      <div>
                        {link.dropdown && (
                          <div
                            className={` w-full bg-white ${
                              isDropdownOpen(link.id)
                                ? "relative right-4 my-1 flex flex-col"
                                : "hidden"
                            }`}
                          >
                            {link.sublinks.map((sublink, index) => (
                              <div key={`${link.id}-${index}`}>
                                <Link
                                  key={sublink}
                                  href={link.href} // Initially set to go to the href of the overarching Link (like Wines)
                                  // href={`${link.href}/${sublink.toLowerCase()}`}  Or something similar can be used in future implementations
                                  className={`block px-4 text-titleMedium text-tertiary1-normal ${link.id === "account" ? "py-3" : "py-2"}`}
                                >
                                  {sublink}
                                </Link>
                                {link.id !== "account" &&
                                  index !== link.sublinks.length - 1 && (
                                    <hr className="relative left-4 mb-1 mt-3 w-[95%] border-[1.25px] border-secondary-hover" />
                                  )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          <hr className="my-2 border-t-slate-300" />
          {session && (
            <Link
              className="flex gap-2 pb-8 pl-4"
              href="#"
              onClick={(event) => {
                event.preventDefault();
                logout();
              }}
            >
              <img
                className="h-[1.5rem] w-[1.5rem]"
                src="/icons/logout.svg"
                alt="logout"
              />
              <span>{translations["user-dropdown.logout"]}</span>
            </Link>
          )}
        </div>
        <div className="relative bottom-4 flex h-[4.87rem] w-[10.12rem] flex-col items-start">
          <p className="mb-6 text-labelXLarge font-semibold">
            {translations["footer.language"]}
          </p>
          <LanguageSwitch />
        </div>
        <SocialLinks />
      </div>
    </div>
  );
};

SideBar.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default SideBar;
