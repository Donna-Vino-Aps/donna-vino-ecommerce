import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import LanguageSwitch from "../NavBar/LanguageSwitch";
import { useLanguage } from "../../context/LanguageContext";

const SideBar = ({ isMenuOpen, toggleMenu, navLinks }) => {
  const { translations } = useLanguage();

  return (
    <div
      className={`fixed right-0 top-0 w-full h-full sm:hidden z-40 ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
      data-testid="side-bar"
      role="dialog"
      aria-labelledby="menu-heading"
      inert={!isMenuOpen}
    >
      <div className="flex flex-col h-full gap-16 p-8 bg-white">
        <div className="flex justify-between items-center">
          <a href="/">
            <img
              src="/images/donna-vino-logo-transparent.png"
              alt="Donna Vino's logo"
              className="w-[7.65rem] h-[5.37rem]"
            />
          </a>
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
          <h2
            className="text-labelXLarge font-semibold"
            data-testid="menu-heading"
          >
            Menu
          </h2>
          <nav role="navigation">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={toggleMenu}
                    className="block py-2 text-bodyLarge text-tertiary1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <hr className="border-t-slate-300" />
        </div>

        <div className="w-[5.12rem] h-[2.87rem]">
          <LanguageSwitch />
        </div>

        <div className="flex flex-col gap-6">
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
