"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
  const { translations } = useLanguage();

  const links = [
    {
      href: "/sales-policy",
      label: translations["footer.sales-policy"],
      dataTestId: "sales-policy",
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

  const paymentSymbols = [
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
    <footer className="bg-[#2F2E2E]" data-testid="footer" aria-label="Footer">
      <div className="text-white text-center">
        <div className="flex mt-16 items-center justify-center flex-col relative items-center gap-1 md:mb-32 md:flex-row md:gap-6 lg:gap-9 xl:gap-12">
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

          <div className="mt-5 md:mt-0 flex flex-col order-1 md:order-4 items-center md:relative top-5">
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
        <div className="lg:ml-14 grid grid-cols-[65px_auto] place-items-center md:mb-0 mb-14 flex-col md:flex mt-10 md:mt-0 items-center justify-center gap-4 md:mb-32 md:flex-row md:gap-6 lg:gap-9 xl:gap-12">
          {paymentSymbols.map(({ src }, index) => (
            <img src={src} key={index} />
          ))}
        </div>
        <div className="bottom-30 whitespace-nowrap text-bodySmall mt-6 mb-1 mb-2 md:text-bodyMedium text-tertiary2-hover_dark">
          <p className="company-number">
            © 2025 Donna Vino Aps | CVR-n. 45017567 |{" "}
            <a
              className="underline"
              href="https://www.donnavino.dk/privacy-policy"
              role="navigation"
              aria-label="Link to Privacy Policy"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
