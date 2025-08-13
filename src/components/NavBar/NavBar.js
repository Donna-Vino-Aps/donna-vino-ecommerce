"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import LanguageSwitch from "../NavBar/LanguageSwitch";
import SideBar from "../SideBar/SideBar";
import { useLanguage } from "@/context/LanguageContext";
import SearchButton from "./SearchButton";
import UserDropdown from "./UserDropdown/UserDropdown";
import ShoppingCart from "./ShoppingCart";
import CartModal from "../Cart/CartModal";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { translations } = useLanguage();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({
    wines: false,
    grapeszones: false,
  });

  const { data: session } = useSession();

  const [isCartOpen, setIsCartOpen] = useState(false);

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
      id: "events",
      href: "/events",
      label: translations["navbar.events"],
      dropdown: false,
    },
    {
      id: "pre-sale",
      href: "/wines/pre-sale",
      label: translations["navbar.presale-wines"],
      dropdown: false,
    },
    // {
    //   id: "wines",
    //   href: "/wines",
    //   label: translations["navbar.wines"],
    //   dropdown: true,
    //   subHeadingsIta: ["Vini Rossi", "Vini Bianchi", "Vini Rosati"],
    //   subHeadings: [
    //     "navbar.wines.subh1",
    //     "navbar.wines.subh2",
    //     "navbar.wines.subh3",
    //   ],
    //   sublinks: [
    //     [
    //       "Chianti",
    //       "Barolo",
    //       "Brunello di Montalcino",
    //       "Montepulciano d'Abruzzo",
    //     ],
    //     ["Prosecco", "Pinot Grigio"],
    //     ["Chiaretto", "Cerasuolo d'Abruzzo"],
    //   ],
    // },
    // {
    //   id: "offers",
    //   href: "/offers",
    //   label: translations["navbar.offers"],
    //   dropdown: false,
    // },
    // {
    //   id: "grapes",
    //   href: "/grapes-zones",
    //   label: translations["navbar.grapes"],
    //   dropdown: true,
    //   subHeadings: ["navbar.grapes.sh1", "navbar.grapes.sh2"],
    //   sublinks: [
    //     [
    //       "Montepulciano",
    //       "Sangiovese",
    //       "Nebbiolo",
    //       "Corvina",
    //       "Trebbiano",
    //       "Vermentino",
    //     ],
    //     [
    //       "Tuscany",
    //       "Piedmont",
    //       "Sicily",
    //       "Emilia-Romagna",
    //       "Lombardy",
    //       "Puglia",
    //     ],
    //   ],
    // },
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
      id: "events",
      href: "/events",
      label: translations["navbar.events"],
      icon: "/icons/calendar1.svg",
      dropdown: false,
    },
    {
      id: "pre-sale",
      href: "/wines/pre-sale",
      label: translations["navbar.presale-wines"],
      icon: "/icons/wine-bottle.svg",
      dropdown: false,
    },
    // {
    //   id: "wines",
    //   href: "/wines",
    //   label: translations["navbar.wines"],
    //   icon: "/icons/wine-glass-1.svg",
    //   dropdown: true,
    //   sublinks: ["Red Wines", "White Wines", "Rosé Wines"],
    // },
    // {
    //   id: "offers",
    //   href: "/offers",
    //   label: translations["navbar.offers"],
    //   icon: "/icons/offer.svg",
    //   dropdown: false,
    // },
    // {
    //   id: "grapeszones",
    //   href: "/grapes-zones",
    //   label: translations["navbar.grapes"],
    //   icon: "/icons/grape-full.svg",
    //   dropdown: true,
    //   sublinks: ["Grapes", "Regions"],
    // },
    {
      id: "account",
      href: "/user/profile",
      label: translations["navbar.account"],
      icon: "/icons/user-alt-2.svg",
      dropdown: false,
    },
  ];

  return (
    <nav
      className="z-50 flex h-[7.18rem] w-full items-center justify-between gap-2 py-6 lg:h-[14.37rem]"
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
          className="h-[4.31rem] w-[6.25rem] md:h-[5.37rem] md:w-[7.75rem]"
        />
      </Link>

      <div
        id="desktop-menu"
        role="menu"
        className={`absolute hidden w-full items-center justify-center lg:flex lg:space-x-4 ${
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
                    ? "text-tertiary1-normal"
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
                    ? "text-tertiary1-normal"
                    : "text-tertiary2-active_dark"
                }`}
                data-testid={`nav-link-${link.id}`}
              >
                {link.label}
              </Link>
            )}
            {/* Dropdown menu */}
            {link.dropdown ? (
              link.id === "wines" ? (
                <div
                  className={`absolute left-1/2 top-[6rem] mt-2 h-[14rem] w-[40.313rem] -translate-x-1/2 transform rounded-lg bg-white shadow-2xl ${
                    isDropdownOpen(link.id)
                      ? "flex flex-row space-x-6"
                      : "hidden"
                  }`}
                >
                  {/* Content for "wines" dropdown */}
                  {link.subHeadingsIta.map((heading, index) => (
                    <div
                      key={index}
                      className="relative left-5 top-3 space-y-2"
                    >
                      <h3 className="relative left-4 text-titleMedium text-black">
                        <span className="font-semibold">{heading}</span> |{" "}
                        <span className="font-light italic">
                          {translations[link.subHeadings[index]]}
                        </span>
                      </h3>
                      <hr className="relative left-4 mb-1 mt-3 w-[95%] min-w-[11rem] border-t-[0.25px] border-secondary-darker" />
                      <ul className="space-y-1">
                        {link.sublinks[index].map((sublink) => (
                          <li key={sublink}>
                            <Link
                              href={link.href}
                              className="inline-block px-4 py-2 text-sm text-gray-700 hover:rounded-lg hover:bg-primary-light"
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
                  className={`absolute left-1/2 top-[6rem] mt-2 h-[12.5rem] w-[33.813rem] -translate-x-1/2 transform rounded-lg bg-white shadow-2xl ${
                    isDropdownOpen(link.id)
                      ? "flex flex-row space-x-2"
                      : "hidden"
                  }`}
                >
                  {/* Content for "grapes" dropdown */}
                  {link.subHeadings.map((heading, index) => (
                    <div
                      key={index}
                      className="relative left-3 top-3 space-y-2"
                    >
                      <h3 className="relative left-4 text-titleMedium font-semibold text-black">
                        {translations[heading]}
                      </h3>
                      <hr className="relative left-2 mb-1 mt-3 w-[85%] min-w-[11rem] border-t-[0.25px] border-secondary-darker" />
                      <ul className="grid grid-cols-3 gap-16">
                        {chunkSublinks(link.sublinks[index], 3).map(
                          (chunk, chunkIndex) => (
                            <div
                              key={chunkIndex}
                              className="flex min-w-44 flex-col space-y-1"
                            >
                              {chunk.map((sublink, sublinkIndex) => (
                                <li key={sublinkIndex} className="">
                                  <Link
                                    href={link.href}
                                    className="inline-block px-4 py-2 text-sm text-gray-700 hover:rounded-lg hover:bg-primary-light"
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

      <div className="flex w-full items-center justify-end gap-14">
        {!(session && isMenuOpen) && (
          <div className="relative bottom-[2px] z-[9999] flex items-center gap-3 md:mr-6 lg:gap-5">
            <SearchButton />
            <UserDropdown />
            <ShoppingCart onClick={() => setIsCartOpen(true)} />
            <div className="relative top-[1px] ml-2 mr-8 h-[1.5rem] w-[1.5rem] lg:hidden">
              <button
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                data-testid="menu-toggle"
                className="hover:opacity-85"
              >
                <img src="/icons/menu.svg" alt="menu" />
              </button>
            </div>
          </div>
        )}

        <div className="hidden h-[2.87rem] w-[5.12rem] lg:block">
          <LanguageSwitch />
        </div>

        <SideBar
          id="mobile-menu"
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          navLinks={navLinksSidebar}
        />
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
