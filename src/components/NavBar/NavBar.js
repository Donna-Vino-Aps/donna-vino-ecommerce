"use client";
import Link from "next/link";
import React, { useState } from "react";
import LanguageSwitch from "../NavBar/LanguageSwitch";
import SideBar from "../SideBar/SideBar";
import { useLanguage } from "../../context/LanguageContext";

const Navbar = () => {
  const { translations } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [winesDropdownOpen, setWinesDropdownOpen] = useState(false);
  const [grapesDropdownOpen, setGrapesDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleWinesDropdown = () => setWinesDropdownOpen(!winesDropdownOpen);
  const toggleGrapesDropdown = () => setGrapesDropdownOpen(!grapesDropdownOpen);

  const navLinks = [
    { id: "home", href: "/", label: translations["navbar.home"] },
    {
      id: "wines",
      href: "/wines",
      label: translations["navbar.wines"],
    },
    { id: "offers", href: "/offers", label: translations["navbar.offers"] },
    {
      id: "grapeszones",
      href: "/grapes-zones",
      label: translations["navbar.grapes"],
    },
  ];

  const handleClick = (href) => {
    setActiveLink(href);
  };

  return (
    <nav
      className="flex flex-col-1 w-full h-[7.18rem] md:h-[14.37rem] justify-between items-center px-8 py-6 gap-2 z-50"
      aria-label="Main Navigation"
    >
      <Link href="/" data-testid="navbar-brand" aria-label="Go to home">
        <img
          src="/images/donna-vino-logo-transparent.png"
          alt="Donna Vino logo"
          className="w-[6.25rem] h-[4.31rem] md:w-[7.75rem] md:h-[5.37rem]"
        />
      </Link>
      <div className="sm:hidden w-[1.5rem] h-[1.5rem]">
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
      <div
        id="desktop-menu"
        role="menu"
        className={`sm:flex sm:items-center md:space-x-4 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
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
        ))}
      </div>
      <div className="hidden sm:block w-[5.12rem] h-[2.87rem]">
        <LanguageSwitch />
      </div>
      <SideBar
        id="mobile-menu"
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        navLinks={navLinks}
      />
    </nav>
  );
};

export default Navbar;
