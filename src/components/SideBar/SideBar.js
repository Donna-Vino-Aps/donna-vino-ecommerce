import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import axios from "axios";
import LanguageSwitch from "../NavBar/LanguageSwitch";
import { useLanguage } from "../../context/LanguageContext";

const SideBar = ({ isMenuOpen, toggleMenu, navLinks }) => {
  const { translations } = useLanguage();
  const [openDropdowns, setOpenDropdowns] = useState({
    wines: false,
    grapeszones: false,
    account: false,
  });

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isDropdownOpen = (id) => openDropdowns[id] ?? false;

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setStoredCredentials(null);
      router.push("/"); // Redirect to start page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 z-40 h-full w-full lg:hidden ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
      data-testid="side-bar"
      role="dialog"
      aria-labelledby="menu-heading"
      inert={!isMenuOpen}
    >
      <div className="flex h-full flex-col gap-8 bg-white p-8">
        <div className="flex items-center justify-between">
          <div className="relative left-1 top-8 flex gap-4">
            <a href="/" className="">
              <img
                src="/images/courtney-cook-unsplash.jpg"
                alt="User Profile Picture"
                className="h-20 w-20"
              />
              <img
                src="/icons/Edit profile pic.svg"
                className="relative bottom-6 left-12"
              />
            </a>
            <div className="mt-3">
              <p className="text-headlineSmall text-tertiary1-darker">Admin</p>
              <p className="text-bodyLarge text-[#637381]">
                admin@donnavino.dk
              </p>
            </div>
          </div>
          <button
            role="button"
            className="self-start"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <img
              src="/icons/close.svg"
              alt="Close icon"
              className="h-[1.12rem] w-[1.12rem]"
            />
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <h2 id="menu-heading" className="sr-only">
            Mobile navigation menu
          </h2>
          <hr className="relative top-6 border-t-slate-300" />
          <nav role="navigation">
            <ul className="ml-2 flex flex-col">
              {navLinks.map((link) => (
                <li key={link.id} className={`relative flex gap-5`}>
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
                            {link.id === "account" &&
                              index === link.sublinks.length - 1 && (
                                <div>
                                  <hr className="relative left-4 mb-1 mt-3 w-[95%] border-[1.25px] border-secondary-hover" />
                                  <div
                                    className="relative left-4 mb-1 mt-5 flex gap-2 text-bodyMedium text-tertiary1-normal"
                                    onClick={handleLogout}
                                  >
                                    <button role="button">
                                      {translations["user-dropdown.logout"]}
                                    </button>
                                    <img
                                      src="/icons/log out.svg"
                                      alt="log out icon"
                                      className="relative"
                                    ></img>
                                  </div>
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          <hr className="relative bottom-4 border-t-slate-300" />
        </div>

        <div className="relative bottom-4 flex h-[4.87rem] w-[10.12rem] flex-col items-start">
          <p className="mb-6 text-labelXLarge font-semibold">
            {translations["footer.language"]}
          </p>
          <LanguageSwitch />
        </div>

        <div className="relative bottom-2 flex flex-col gap-8">
          <h3 className="text-labelXLarge font-semibold">
            {translations["footer.follow"]}
          </h3>
          <div
            className="flex justify-start gap-6"
            aria-label="Social media icons"
          >
            <a
              href="https://www.instagram.com/donna_vino_winetastings/"
              data-testid="social-icon-instagram-link"
              aria-label="Instagram"
            >
              <img
                src="/icons/instagram-original.svg"
                className="h-[1.5rem] brightness-0 filter"
                alt="Instagram"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/donna-vino-aps/"
              data-testid="social-icon-linkedin-link"
              aria-label="LinkedIn"
            >
              <img
                src="/icons/linkedin-alt.svg"
                className="h-[1.5rem] brightness-0 filter"
                alt="LinkedIn"
              />
            </a>
            <a
              href="https://www.facebook.com/donnavino.dk/"
              data-testid="social-icon-facebook-link"
              aria-label="Facebook"
            >
              <img
                src="/icons/facebook-line.svg"
                className="h-[1.5rem] brightness-0 filter"
                alt="Facebook"
              />
            </a>
          </div>
        </div>
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
