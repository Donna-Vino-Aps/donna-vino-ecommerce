import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import axios from "axios";
import LanguageSwitch from "../NavBar/LanguageSwitch";
import { useLanguage } from "../../context/LanguageContext";

const SideBar = ({ isMenuOpen, toggleMenu, navLinks }) => {
  const { translations } = useLanguage();
  const [winesDropdownOpen, setWinesDropdownOpen] = useState(false);
  const [grapesDropdownOpen, setGrapesDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const toggleWinesDropdown = () => setWinesDropdownOpen(!winesDropdownOpen);
  const toggleGrapesDropdown = () => setGrapesDropdownOpen(!grapesDropdownOpen);
  const toggleAccountDropdown = () =>
    setAccountDropdownOpen(!accountDropdownOpen);

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
      className={`fixed right-0 top-0 w-full h-full lg:hidden z-40 ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
      data-testid="side-bar"
      role="dialog"
      aria-labelledby="menu-heading"
      inert={!isMenuOpen}
    >
      <div className="flex flex-col h-full gap-16 p-8 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex relative top-8 left-1 gap-4">
            <a href="/" className="">
              <img
                src="/images/courtney-cook-unsplash.jpg"
                alt="User Profile Picture"
                className="w-18 h-18"
              />
              <img
                src="/icons/Edit profile pic.svg"
                className="relative bottom-4 left-12"
              />
            </a>
            <div className="mt-2">
              <p className="text-headlineSmall text-tertiary1-darker">Admin</p>
              <p className="text-bodyLarge">admin@donnavino.dk</p>
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
              className="w-[1.12rem] h-[1.12rem]"
            />
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <h2 id="menu-heading" className="sr-only">
            Mobile navigation menu
          </h2>
          <hr className="border-t-slate-300 relative top-6" />
          <nav role="navigation">
            <ul className="flex flex-col ml-2">
              {navLinks.map((link) => (
                <li key={link.id} className={`flex relative gap-5`}>
                  <img
                    className="align-middle inline-block text-right h-[1.25rem] w-[1.25rem] relative top-[10px] left-[6px]"
                    src={link.icon}
                  ></img>

                  {/* Render dropdown if dropdown is set to true, otherwise render a link */}
                  <div className="flex flex-col w-full">
                    {link.dropdown ? (
                      <button
                        onClick={() => {
                          if (link.id === "wines") toggleWinesDropdown();
                          else if (link.id === "grapeszones")
                            toggleGrapesDropdown();
                          else if (link.id === "account")
                            toggleAccountDropdown();
                        }}
                        className="flex items-center relative right-3 rounded-md px-3 py-2 text-titleMedium text-tertiary1"
                      >
                        {link.label}
                        <img
                          src="/icons/chevron-down.svg"
                          alt="Chevron Down"
                          className={`ml-2 relative top-[2px] right-1 transition-transform ${
                            (link.id === "wines" && winesDropdownOpen) ||
                            (link.id === "grapeszones" && grapesDropdownOpen) ||
                            (link.id === "account" && accountDropdownOpen)
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={toggleMenu}
                        className="block py-2 text-titleMedium text-tertiary1"
                      >
                        {link.label}
                      </Link>
                    )}

                    {/* Dropdown menu */}
                    {link.dropdown && (
                      <div
                        className={` w-full bg-white ${
                          (link.id === "wines" && winesDropdownOpen) ||
                          (link.id === "grapeszones" && grapesDropdownOpen) ||
                          (link.id === "account" && accountDropdownOpen)
                            ? "flex flex-col relative right-4 my-1"
                            : "hidden"
                        }`}
                      >
                        {link.sublinks.map((sublink, index) => (
                          <div key={`${link.id}-${index}`}>
                            <Link
                              key={sublink}
                              href={link.href} // Initially set to go to the href of the overarching Link (like Wines)
                              // href={`${link.href}/${sublink.toLowerCase()}`}  Or something similar can be used in future implementations
                              className={`block px-4 text-titleMedium text-tertiary1 ${link.id === "account" ? "py-3" : "py-2"}`}
                            >
                              {sublink}
                            </Link>
                            {link.id !== "account" &&
                              index !== link.sublinks.length - 1 && (
                                <hr className="border-secondary-hover border-[1.25px] w-[95%] relative left-4 mt-3 mb-1" />
                              )}
                            {link.id === "account" &&
                              index === link.sublinks.length - 1 && (
                                <div>
                                  <hr className="border-secondary-hover border-[1.25px] w-[95%] relative left-4 mt-3 mb-1" />
                                  <div
                                    className="flex gap-2 mt-5 mb-1 relative left-4 text-bodyMedium text-tertiary1"
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
          <hr className="border-t-slate-300 relative bottom-4" />
        </div>

        <div className="w-[10.12rem] h-[4.87rem] flex flex-col items-start relative bottom-6">
          <p className="text-labelXLarge font-semibold mb-6">
            {translations["footer.language"]}
          </p>
          <LanguageSwitch />
        </div>

        <div className="flex flex-col gap-8 relative bottom-10">
          <h3 className="text-labelXLarge font-semibold">
            {translations["footer.follow"]}
          </h3>
          <div
            className="flex gap-6 justify-start"
            aria-label="Social media icons"
          >
            <a
              href="#"
              data-testid="social-icon-instagram-link"
              aria-label="Instagram"
            >
              <img
                src="/icons/instagram-original.svg"
                className="h-[1.5rem] filter brightness-0"
                alt="Instagram"
              />
            </a>
            <a
              href="#"
              data-testid="social-icon-linkedin-link"
              aria-label="LinkedIn"
            >
              <img
                src="/icons/linkedin-alt.svg"
                className="h-[1.5rem] filter brightness-0"
                alt="LinkedIn"
              />
            </a>
            <a
              href="#"
              data-testid="social-icon-facebook-link"
              aria-label="Facebook"
            >
              <img
                src="/icons/facebook-line.svg"
                className="h-[1.5rem] filter brightness-0"
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
