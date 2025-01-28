import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../../components/NavBar/NavBar";
import { LanguageProvider } from "../../context/LanguageContext";

describe("Navbar component", () => {
  test("should render the Navbar component correctly", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>,
    );

    const logo = screen.getByAltText("Donna Vino logo");
    expect(logo).toBeInTheDocument();

    const homeLink = screen.getByTestId("nav-link-home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveTextContent("Home");

    const ourValuesLink = screen.getByTestId("nav-link-our-values");
    expect(ourValuesLink).toBeInTheDocument();
    expect(ourValuesLink).toHaveTextContent("Our Values");

    const ourTeamLink = screen.getByTestId("nav-link-our-team");
    expect(ourTeamLink).toBeInTheDocument();
    expect(ourTeamLink).toHaveTextContent("Our Team");

    const contactLink = screen.getByTestId("nav-link-contact");
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveTextContent("Contact");
  });

  test("should have the correct links to pages", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>,
    );

    const homeLink = screen.getByTestId("nav-link-home");
    expect(homeLink).toHaveAttribute("href", "/");

    const ourValuesLink = screen.getByTestId("nav-link-our-values");
    expect(ourValuesLink).toHaveAttribute("href", "/our-values");

    const ourTeamLink = screen.getByTestId("nav-link-our-team");
    expect(ourTeamLink).toHaveAttribute("href", "/our-team");

    const contactLink = screen.getByTestId("nav-link-contact");
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  test("should toggle the mobile menu when the menu button is clicked", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>,
    );

    const menuToggleButton = screen.getByTestId("menu-toggle");
    expect(menuToggleButton).toBeInTheDocument();

    const mobileMenu = screen.getByRole("menu");
    expect(mobileMenu).toHaveClass("hidden");

    fireEvent.click(menuToggleButton);
    expect(mobileMenu).not.toHaveClass("hidden");

    fireEvent.click(menuToggleButton);
    expect(mobileMenu).toHaveClass("hidden");
  });
});
