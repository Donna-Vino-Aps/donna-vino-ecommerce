import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function SocialLinks() {
  const { translations } = useLanguage();

  return (
    <div className="relative bottom-2 flex flex-col gap-8">
      <h3 className="text-labelXLarge font-semibold">
        {translations["footer.follow"]}
      </h3>
      <div className="flex justify-start gap-6" aria-label="Social media icons">
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
  );
}
