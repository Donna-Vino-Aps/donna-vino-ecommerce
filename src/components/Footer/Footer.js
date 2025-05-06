"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

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

  const paymentIcons = [
    {
      src: "/icons/footer/apple-pay.svg",
      alt: "Apple pay",
    },
    {
      src: "/icons/footer/google-pay.svg",
      alt: "Google pay",
    },
    {
      src: "/icons/footer/mastercard.svg",
      alt: "Mastercard",
    },
    {
      src: "/icons/footer/Visa.svg",
      alt: "Visa",
    },
    {
      src: "/icons/footer/MobilePayLogo.svg",
      alt: "Mobile pay",
    },
  ];

  return (
    <footer
      className="flex h-[48.625rem] items-center justify-center bg-[#2F2E2E] py-4 text-center text-white md:h-[26.625rem]"
      data-testid="footer"
      aria-label="Footer"
    >
      <div>
        <div className="relative bottom-14 flex flex-col items-center gap-1 md:bottom-3 md:mb-32 md:flex-row md:gap-6 lg:gap-9 xl:gap-12">
          <Link href="/" aria-label="logo">
            <img
              className="relative mb-4 mt-6 h-[5.351rem] w-[7.75rem] rounded md:right-4 md:top-6 md:mb-0 md:mt-0"
              src="/images/donna-vino-logo-transparent.png"
              alt="Donna Vino Logo - Red background, white text saying 'Donna Vino'"
              data-testid="logo-footer"
            />
          </Link>

          <div className="md:relative md:top-6">
            <div className="flex flex-col md:flex-row md:gap-9 lg:gap-16">
              {links.map(({ href, label, dataTestId }, index) => (
                <Link
                  key={index}
                  data-testid={dataTestId}
                  href={href}
                  className={`rounded-md px-3 py-2 lg:px-9`}
                  role="navigation"
                  aria-label={`Link to ${label}`}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="relative top-10 order-1 flex md:left-3 md:top-20 md:order-1 lg:left-12">
              <div className="grid grid-cols-2 place-items-center gap-12 md:flex md:gap-9 lg:gap-16">
                {paymentIcons.map(({ src, alt }, index) => (
                  <div
                    key={index}
                    className={
                      index == paymentIcons.length - 1
                        ? "col-span-2"
                        : "col-span-1"
                    }
                  >
                    <img src={src} alt={alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative top-20 order-1 flex flex-col items-center md:top-4 md:order-4 lg:left-16">
            <h4 className="mb-1 text-bodyLarge font-medium md:mb-3 md:mt-5">
              {translations["footer.follow"]}
            </h4>
            <div
              className="mb-1 mt-3 flex justify-center gap-4"
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
                    className="h-[1.5rem] w-[1.5rem] brightness-0 invert filter"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="relative top-20 whitespace-nowrap pt-3 text-bodySmall text-tertiary2-hover_dark md:text-bodyMedium">
          <p>
            {"© 2025 Donna Vino Aps | CVR-n. 45017567 | "}
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
