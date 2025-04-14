"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import LanguageSwitch from "../NavBar/LanguageSwitch";
import SideBar from "../SideBar/SideBar";
import { useLanguage } from "../../context/LanguageContext";
import SearchButton from "./SearchButton";
import UserDropdown from "./UserDropdown/UserDropdown";
import ShoppingCart from "./ShoppingCart";

const Navbar = () => {
  const { translations } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({
    wines: false,
    grapeszones: false,
  });

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => {
      // If the clicked dropdown is already open, close it
      if (prev[id]) {
        return { ...prev, [id]: false };
      }

      // Otherwise, close all other dropdowns and open the clicked one
      return { [id]: true };
    });
  };

  const isDropdownOpen = (id) => openDropdowns[id] ?? false;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (href, sublinks = []) =>
    pathname === href ||
    sublinks.some((sublink) => pathname.startsWith(sublink));

  const chunkSublinks = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

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
      subHeadingsIta: ["Vini Rossi", "Vini Bianchi", "Vini Rosati"],
      subHeadings: [
        "navbar.wines.subh1",
        "navbar.wines.subh2",
        "navbar.wines.subh3",
      ],
      sublinks: [
        [
          "Chianti",
          "Barolo",
          "Brunello di Montalcino",
          "Montepulciano d'Abruzzo",
        ],
        ["Prosecco", "Pinot Grigio"],
        ["Chiaretto", "Cerasuolo d'Abruzzo"],
      ],
    },
    {
      id: "offers",
      href: "/offers",
      label: translations["navbar.offers"],
      dropdown: false,
    },
    {
      id: "grapes",
      href: "/grapes-zones",
      label: translations["navbar.grapes"],
      dropdown: true,
      subHeadings: ["navbar.grapes.sh1", "navbar.grapes.sh2"],
      sublinks: [
        [
          "Montepulciano",
          "Sangiovese",
          "Nebbiolo",
          "Corvina",
          "Trebbiano",
          "Vermentino",
        ],
        [
          "Tuscany",
          "Piedmont",
          "Sicily",
          "Emilia-Romagna",
          "Lombardy",
          "Puglia",
        ],
      ],
    },
  ];

  const navLinksSidebar = [
    {
      id: "home",
      href: "/",
      label: translations["navbar.home"],
      icon: "/icons/home.svg",
      dropdown: false,
    },
    {
      id: "wines",
      href: "/wines",
      label: translations["navbar.wines"],
      icon: "/icons/wine-glass-1.svg",
      dropdown: true,
      sublinks: ["Red Wines", "White Wines", "Rosé Wines"],
    },
    {
      id: "offers",
      href: "/offers",
      label: translations["navbar.offers"],
      icon: "/icons/offer.svg",
      dropdown: false,
    },
    {
      id: "grapeszones",
      href: "/grapes-zones",
      label: translations["navbar.grapes"],
      icon: "/icons/grape-full.svg",
      dropdown: true,
      sublinks: ["Grapes", "Regions"],
    },
    {
      id: "account",
      href: "/user/profile",
      label: translations["navbar.account"],
      icon: "/icons/user-alt-2.svg",
      dropdown: true,
      sublinks: ["My wines", "Orders", "Profile", "Settings"],
    },
  ];

  return (
    <nav
      className="flex w-full h-[7.18rem] md:h-[14.37rem] items-center justify-between py-6 gap-2 z-50"
      aria-label="Main Navigation"
    >
      <Link
        href="/"
        data-testid="navbar-brand"
        aria-label="Go to home"
        className="flex-shrink-0 pl-10"
      >
        <img
          src="/images/donna-vino-logo-transparent.png"
          alt="Donna Vino logo"
          className="w-[6.25rem] h-[4.31rem] md:w-[7.75rem] md:h-[5.37rem]"
        />
      </Link>

      <div
        id="desktop-menu"
        role="menu"
        className={`hidden w-full lg:flex absolute justify-center items-center lg:space-x-4 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        {navLinks.map((link) => (
          <div key={link.id} className="relative">
            {link.dropdown ? (
              <button
                onClick={() => toggleDropdown(link.id)}
                className={`flex items-center rounded-md px-3 py-2 text-titleMedium ${
                  isActive(link.href, link.sublinks)
                    ? "text-tertiary1-gray"
                    : "text-tertiary2-active_dark"
                }
                ${isDropdownOpen(link.id) ? "bg-primary-light" : "bg-white"}`}
              >
                {link.label}
                <img
                  src="/icons/chevron-down.svg"
                  alt="Chevron Down"
                  className={`ml-2 transition-transform ${
                    isDropdownOpen(link.id) ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            ) : (
              <Link
                href={link.href}
                className={`rounded-md px-3 py-2 text-titleMedium ${
                  pathname === link.href
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
            {link.dropdown ? (
              link.id === "wines" ? (
                <div
                  className={`absolute top-[6rem] left-1/2 transform -translate-x-1/2 mt-2 w-[40.313rem] h-[14rem] bg-white shadow-2xl rounded-lg ${
                    isDropdownOpen(link.id)
                      ? "flex flex-row space-x-6"
                      : "hidden"
                  }`}
                >
                  {/* Content for "wines" dropdown */}
                  {link.subHeadingsIta.map((heading, index) => (
                    <div
                      key={index}
                      className="space-y-2 relative left-5 top-3"
                    >
                      <h3 className="text-titleMedium text-black relative left-4">
                        <span className="font-semibold">{heading}</span> |{" "}
                        <span className="font-light italic">
                          {translations[link.subHeadings[index]]}
                        </span>
                      </h3>
                      <hr className="border-secondary-darker border-t-[0.25px] w-[95%] min-w-[11rem] relative left-4 mt-3 mb-1" />
                      <ul className="space-y-1">
                        {link.sublinks[index].map((sublink) => (
                          <li key={sublink}>
                            <Link
                              href={link.href}
                              className="inline-block px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:rounded-lg"
                            >
                              {sublink}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : link.id === "grapes" ? (
                <div
                  className={`absolute top-[6rem] left-1/2 transform -translate-x-1/2 mt-2 w-[33.813rem] h-[12.5rem] bg-white shadow-2xl rounded-lg ${
                    isDropdownOpen(link.id)
                      ? "flex flex-row space-x-2"
                      : "hidden"
                  }`}
                >
                  {/* Content for "grapes" dropdown */}
                  {link.subHeadings.map((heading, index) => (
                    <div
                      key={index}
                      className="space-y-2 relative left-3 top-3"
                    >
                      <h3 className="text-titleMedium font-semibold text-black relative left-4">
                        {translations[heading]}
                      </h3>
                      <hr className="border-secondary-darker border-t-[0.25px] w-[85%] min-w-[11rem] relative left-2 mt-3 mb-1" />
                      <ul className="grid grid-cols-3 gap-16">
                        {chunkSublinks(link.sublinks[index], 3).map(
                          (chunk, chunkIndex) => (
                            <div
                              key={chunkIndex}
                              className="flex flex-col space-y-1 min-w-44"
                            >
                              {chunk.map((sublink, sublinkIndex) => (
                                <li key={sublinkIndex} className="">
                                  <Link
                                    href={link.href}
                                    className="inline-block px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:rounded-lg"
                                  >
                                    {sublink}
                                  </Link>
                                </li>
                              ))}
                            </div>
                          ),
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null
            ) : null}
          </div>
        ))}
      </div>

      <div className="flex justify-end w-full items-center gap-14">
        <div className="flex gap-3 lg:gap-5 items-center md:mr-6 relative bottom-[2px]">
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
              className="hover:opacity-85"
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
          navLinks={navLinksSidebar}
        />
      </div>
    </nav>
  );
};

export default Navbar;
