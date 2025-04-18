import React from "react";
import PropTypes from "prop-types";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../../components/Footer/Footer";
import { LanguageProvider } from "../../context/LanguageContext";
import enTranslations from "../../translations/en.json";
import dkTranslations from "../../translations/dk.json";

const MockLanguageProvider = ({ children, language = "en" }) => {
  const translations = language === "en" ? enTranslations : dkTranslations;

  return (
    <LanguageProvider value={{ translations }}>{children}</LanguageProvider>
  );
};

MockLanguageProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is provided and is a valid React node
  language: PropTypes.oneOf(["en", "dk"]), // Restrict language to "en" or "dk"
};

const renderWithProvider = (language = "en") => {
  render(
    <MockLanguageProvider language={language}>
      <Footer />
    </MockLanguageProvider>,
  );
};

describe("Footer Component", () => {
  it("renders without crashing", () => {
    renderWithProvider("en");
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });
});

it("renders all navigation links", () => {
  renderWithProvider("en");
  const links = [
    { id: "events", href: "/events", label: "Booking & Events" },
    {
      id: "contact",
      href: "https://www.donnavino.dk/contact",
      label: "Contact Us",
    },
    { id: "company", href: "https://www.donnavino.dk/", label: "Company" },
  ];

  links.forEach((link) => {
    const navLink = screen.getByTestId(link.id);
    expect(navLink).toBeInTheDocument();
    expect(navLink).toHaveTextContent(link.label);
    expect(navLink).toHaveAttribute("href", link.href);
  });
});

it("renders the logo", () => {
  renderWithProvider("en");
  const logo = screen.getByTestId("logo-footer");
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute(
    "src",
    "/images/donna-vino-logo-transparent.png",
  );
});

it("renders social media links", () => {
  renderWithProvider("en");

  const socialMediaLinks = [
    {
      alt: "Facebook Logo",
      href: "https://www.facebook.com/donnavino.dk/",
      src: "/icons/footer/facebook-line.svg",
    },
    {
      alt: "Instagram Logo",
      href: "https://www.instagram.com/donna_vino_winetastings/",
      src: "/icons/footer/instagram-original.svg",
    },
    {
      alt: "LinkedIn Logo",
      href: "https://www.linkedin.com/company/donna-vino-aps/",
      src: "/icons/footer/linkedin-alt.svg",
    },
  ];

  socialMediaLinks.forEach((icon) => {
    const link = screen.getByAltText(icon.alt);
    expect(link).toBeInTheDocument(); // Check if the icon is rendered
    expect(link).toHaveAttribute("src", icon.src); // Verify the icon source
    expect(link.closest("a")).toHaveAttribute("href", icon.href); // Verify the anchor link
  });
});
