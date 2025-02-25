import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TastingSession from "@/components/TastingSession/TastingSession";

jest.mock("@/context/LanguageContext", () => {
  const PropTypes = require("prop-types");

  const mockProvider = ({ children }) => (
    <div data-testid="language-context">{children}</div>
  );

  mockProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return {
    LanguageContext: {
      Provider: mockProvider,
    },
    useLanguage: () => ({
      translations: {
        "tasting.subheading": "Wine Tasting Experience",
        "tasting.heading": "Discover the Art of Wine Tasting",
        "tasting.paragraph":
          "Join us for a unique tasting experience where you can enjoy premium wines.",
        "tasting.button": "Book Now",
      },
    }),
  };
});

jest.mock("@/components/Button/Button", () =>
  jest.fn(({ text }) => <button>{text}</button>),
);

describe("TastingSession Component", () => {
  test("renders the component correctly", () => {
    render(<TastingSession />);

    expect(screen.getByText(/Wine Tasting Experience/)).toBeInTheDocument();
    expect(
      screen.getByText(/Discover the Art of Wine Tasting/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Join us for a unique tasting experience/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Book Now/i }),
    ).toBeInTheDocument();
  });

  test("renders the previous and next buttons", () => {
    render(<TastingSession />);

    expect(
      screen.getByTestId("carousel-previous-button-large"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("carousel-next-button-large"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-previous-arrow-large")).toBeInTheDocument();
    expect(screen.getByTestId("icon-next-arrow-large")).toBeInTheDocument();
  });
});
