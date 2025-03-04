"use client";
import Link from "next/link";
import React, { useState } from "react";
import LanguageSwitch from "../NavBar/LanguageSwitch";
import SideBar from "../SideBar/SideBar";
import { useLanguage } from "../../context/LanguageContext";
import SearchButton from "./SearchButton";
import UserDropdown from "./UserDropdown";
import ShoppingCart from "./ShoppingCart";

const Navbar = () => {
  const { translations } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [winesDropdownOpen, setWinesDropdownOpen] = useState(false);
  const [grapesDropdownOpen, setGrapesDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleWinesDropdown = () => setWinesDropdownOpen(!winesDropdownOpen);
  const toggleGrapesDropdown = () => setGrapesDropdownOpen(!grapesDropdownOpen);

  const navLinks = [
    {
      id: "home",
      href: "/",
      label: translations["navbar.home"],
      dropdown: false,
    },
    {
      id: "wines",
      href: "/wines",
      label: translations["navbar.wines"],
      dropdown: true,
      sublinks: ["Red", "White", "Rosé"],
    },
    {
      id: "offers",
      href: "/offers",
      label: translations["navbar.offers"],
      dropdown: false,
    },
    {
      id: "grapeszones",
      href: "/grapes-zones",
      label: translations["navbar.grapes"],
      dropdown: true,
      sublinks: ["Malbec", "Pinot Noir", "Chardonnay"],
    },
  ];

  const handleClick = (href) => {
    setActiveLink(href);
  };

  return (
    <nav
      className="flex w-full h-[7.18rem] md:h-[14.37rem] items-center justify-between px-8 py-6 gap-2 z-50"
      aria-label="Main Navigation"
    >
      <Link
        href="/"
        data-testid="navbar-brand"
        aria-label="Go to home"
        className="flex-shrink-0"
      >
        <img
          src="/images/donna-vino-logo-transparent.png"
          alt="Donna Vino logo"
          className="w-[6.25rem] h-[4.31rem] lg:w-[7.75rem] lg:h-[5.37rem]"
        />
      </Link>

      <div
        id="desktop-menu"
        role="menu"
        className={`hidden w-full lg:flex flex-grow justify-center items-center lg:space-x-4 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        {navLinks.map((link) => (
          <div key={link.id} className="relative">
            {link.dropdown ? (
              <button
                onClick={() =>
                  link.id === "wines"
                    ? toggleWinesDropdown()
                    : toggleGrapesDropdown()
                }
                className="flex items-center rounded-md px-3 py-2 text-titleMedium text-tertiary2-active_dark"
              >
                {link.label}
                <img
                  src="/icons/chevron-down.svg"
                  alt="Chevron Down"
                  className={`ml-2 transition-transform ${
                    (link.id === "wines" && winesDropdownOpen) ||
                    (link.id === "grapeszones" && grapesDropdownOpen)
                      ? "rotate-180"
                      : "rotate-0"
                  }`}
                />
              </button>
            ) : (
              <Link
                href={link.href}
                className={`rounded-md px-3 py-2 text-titleMedium ${
                  activeLink === link.href
                    ? "text-tertiary1-gray"
                    : "text-tertiary2-active_dark"
                }`}
                onClick={() => handleClick(link.href)}
                data-testid={`nav-link-${link.id}`}
              >
                {link.label}
              </Link>
            )}

            {/* Dropdown menu */}
            {link.dropdown && (
              <div
                className={`absolute left-0 mt-2 w-40 bg-white shadow-md rounded-md ${
                  (link.id === "wines" && winesDropdownOpen) ||
                  (link.id === "grapeszones" && grapesDropdownOpen)
                    ? "block"
                    : "hidden"
                }`}
              >
                {link.sublinks.map((sublink) => (
                  <Link
                    key={sublink}
                    href={link.href} // Initially set to go to the href of the overarching Link (like Wines)
                    // href={`${link.href}/${sublink.toLowerCase()}`}  Or something similar can be used in future implementations
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    {sublink}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end w-full items-center gap-5">
        <div className="flex gap-2 lg:gap-5 items-center md:mr-6 relative bottom-[2px]">
          <SearchButton />
          <UserDropdown />
          <ShoppingCart />
          <div className="lg:hidden w-[1.5rem] h-[1.5rem] ml-2 relative top-[1px]">
            <button
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              data-testid="menu-toggle"
            >
              <img src="/icons/menu.svg" alt="" />
            </button>
          </div>
        </div>

        <div className="hidden lg:block w-[5.12rem] h-[2.87rem]">
          <LanguageSwitch />
        </div>

        <SideBar
          id="mobile-menu"
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          navLinks={navLinks}
        />
      </div>
    </nav>
  );
};

export default Navbar;
