"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
  const { translations } = useLanguage();

  const links = [
    {
      href: "/our-team",
      label: translations["footer.team"],
      dataTestId: "our-team",
    },
    {
      href: "/our-values",
      label: translations["footer.values"],
      dataTestId: "our-values",
    },
    {
      href: "/contact",
      label: translations["footer.contact"],
      dataTestId: "contact",
    },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/donnavino.dk/",
      src: "/icons/footer/facebook-line.svg",
      alt: "Facebook Logo",
    },
    {
      href: "https://www.instagram.com/donna_vino_winetastings/",
      src: "/icons/footer/instagram-original.svg",
      alt: "Instagram Logo",
    },
    {
      href: "https://www.linkedin.com/company/donna-vino-aps/",
      src: "/icons/footer/linkedin-alt.svg",
      alt: "LinkedIn Logo",
    },
  ];

  return (
    <footer
      className="flex text-white text-center py-4 h-96 bg-[#2F2E2E] md:h-[26.625rem] items-center justify-center"
      data-testid="footer"
      aria-label="Footer"
    >
      <div className="flex flex-col relative items-center gap-1 bottom-3 md:mb-32 md:flex-row md:gap-6 lg:gap-9 xl:gap-12">
        <Link href="/" className="navbar-brand" aria-label="logo">
          <img
            className="h-[5.351rem] w-[7.75rem] rounded relative mt-6 mb-4 md:mt-0 md:mb-0 md:right-4 md:top-6"
            src="/images/donna-vino-logo-transparent.png"
            alt="Donna Vino Logo - Red background, white text saying 'Donna Vino'"
            data-testid="logo-footer"
          />
        </Link>

        {links.map(({ href, label, dataTestId }, index) => (
          <Link
            key={index}
            data-testid={dataTestId}
            href={href}
            className={`rounded-md px-3 py-2 text-bodyLarge text-semibold order-${index + 2} md:order-${index + 1}`}
            role="navigation"
            aria-label={`Link to ${label}`}
          >
            {label}
          </Link>
        ))}

        <div className="flex flex-col order-1 md:order-4 items-center md:relative md:top-5">
          <h4 className="text-bodyLarge text-semibold mb-1 md:mb-3 md:mt-3">
            {translations["footer.follow"]}
          </h4>
          <div
            className="flex gap-4 justify-center mt-3 mb-1"
            aria-label="Social media icons"
          >
            {socialLinks.map(({ href, src, alt }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <img
                  src={src}
                  alt={alt}
                  className="h-[1.5rem] w-[1.5rem] filter brightness-0 invert"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
