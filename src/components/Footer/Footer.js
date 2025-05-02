"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
  const { translations } = useLanguage();

  const links = [
    {
      href: "/events",
      label: translations["footer.booking-events"],
      dataTestId: "events",
    },
    {
      href: "https://www.donnavino.dk/contact",
      label: translations["footer.contact"],
      dataTestId: "contact",
    },
    {
      href: "https://www.donnavino.dk/",
      label: translations["footer.company"],
      dataTestId: "company",
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

  const paymentIcons = [
    {
      src: "/icons/footer/apple-pay.svg",
    },
    {
      src: "/icons/footer/google-pay.svg",
    },
    {
      src: "/icons/footer/mastercard.svg",
    },
    {
      src: "/icons/footer/Visa.svg",
    },
    {
      src: "/icons/footer/MobilePayLogo.svg",
    },
  ];

  return (
    <footer
    
      className="flex text-white text-center py-4 h-96 bg-[#2F2E2E] md:h-[26.625rem] h-[48.625rem] items-center justify-center"
      data-testid="footer"
      aria-label="Footer"
    >
      <div>
        <div className="flex flex-col relative items-center gap-1 md:bottom-3 bottom-14 md:mb-32 md:flex-row md:gap-6 lg:gap-9 xl:gap-12">
          <Link href="/" className="navbar-brand" aria-label="logo">
            <img
              className="h-[5.351rem] w-[7.75rem] rounded relative mt-6 mb-4 md:mt-0 md:mb-0 md:right-4 md:top-6"
              src="/images/donna-vino-logo-transparent.png"
              alt="Donna Vino Logo - Red background, white text saying 'Donna Vino'"
              data-testid="logo-footer"
            />
          </Link>

          <div className="md:relative md:top-6">
            <div className="flex flex-col md:flex-row">
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

            </div>
            <div className="md:left-3 flex order-1 md:order-1 relative md:top-20 top-10">
              <div className="place-items-center md:flex grid grid-cols-2 gap-12 md:gap-9 lg:gap-14">
                {paymentIcons.map(({ src }, index) => (
                  <div key={index} className={index == paymentIcons.length - 1 ? "col-span-2" : "col-span-1"}><img
                    src={src}

                  /></div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col order-1 md:order-4 items-center relative md:top-4 top-20">
            <h4 className="text-bodyLarge text-semibold mb-1 md:mb-3 md:mt-4">
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
        <div className="pt-3 top-20 relative whitespace-nowrap text-bodySmall md:text-bodyMedium text-tertiary2-hover_dark"><p className="company-number">© 2025 Donna Vino Aps | CVR-n. 45017567 | <a className="underline" href="https://www.donnavino.dk/privacy-policy" role="navigation" aria-label="Link to Privacy Policy">Privacy Policy</a></p></div>
    </div>
    </footer>
  );
};

export default Footer;
