import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import enTranslations from "../../translations/en.json";
import dkTranslations from "../../translations/dk.json";
import { LanguageProvider, useLanguage } from "@/app/context/LanguageContext";
import LanguageSwitch from "@/components/Navbar/LanguageSwitch";

beforeEach(() => {
  localStorage.clear();
});

describe("LanguageProvider and LanguageSwitch", () => {
  const TestComponent = () => {
    const { language, translations } = useLanguage();
    return (
      <div>
        <span>{language}</span>
        <h1>{translations.welcomeMessage}</h1>
        <p>{translations.description}</p>
        <footer>{translations.footer}</footer>
        <LanguageSwitch />
      </div>
    );
  };

  test("should default to 'en' language and display the correct translation", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    expect(screen.getByText("en")).toBeInTheDocument();
    expect(screen.getByText(enTranslations.welcomeMessage)).toBeInTheDocument();
    expect(screen.getByText(enTranslations.description)).toBeInTheDocument();
    expect(screen.getByText(enTranslations.footer)).toBeInTheDocument();
  });

  test("should change language to 'dk' when Denmark icon is clicked", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByTestId("dk-icon"));

    expect(screen.getByText("dk")).toBeInTheDocument();
    expect(screen.getByText(dkTranslations.welcomeMessage)).toBeInTheDocument();
    expect(screen.getByText(dkTranslations.description)).toBeInTheDocument();
    expect(screen.getByText(dkTranslations.footer)).toBeInTheDocument();
  });

  test("should use saved language from localStorage", () => {
    localStorage.setItem("pageLanguage", "dk");

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    expect(screen.getByText("dk")).toBeInTheDocument();
    expect(screen.getByText(dkTranslations.welcomeMessage)).toBeInTheDocument();
    expect(screen.getByText(dkTranslations.description)).toBeInTheDocument();
    expect(screen.getByText(dkTranslations.footer)).toBeInTheDocument();
  });

  test("should store the selected language in localStorage", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByTestId("dk-icon"));

    expect(localStorage.getItem("pageLanguage")).toBe("dk");
  });

  test("should reflect the selected language on reload", () => {
    localStorage.setItem("pageLanguage", "dk");

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    expect(screen.getByText("dk")).toBeInTheDocument();
    expect(screen.getByText(dkTranslations.welcomeMessage)).toBeInTheDocument();
    expect(screen.getByText(dkTranslations.description)).toBeInTheDocument();
    expect(screen.getByText(dkTranslations.footer)).toBeInTheDocument();
  });
});
