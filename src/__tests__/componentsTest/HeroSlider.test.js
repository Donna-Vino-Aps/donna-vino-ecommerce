import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroSlider from "@/components/HeroSlider/HeroSlider";

beforeAll(() => {
  global.innerWidth = 1024;
});

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
        "tasting.subheading1": "Events",
        "tasting.heading1": "Book your seat at our next tasting session",
        "tasting.paragraph1": "Join us for a premium wine tasting experience",
        "tasting.button1": "Book a tasting session",
      },
    }),
  };
});

jest.mock("@/components/Button/Button", () =>
  jest.fn((props) => <button {...props}>{props.text}</button>),
);

describe("HeroSlider Component", () => {
  test("renders the component correctly", () => {
    render(<HeroSlider />);

    expect(screen.getByText(/Events/)).toBeInTheDocument();
    expect(
      screen.getByText(/Book your seat at our next tasting session/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Join us for a premium wine tasting experience/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Book a tasting session/i }),
    ).toBeInTheDocument();
  });

  test("renders the previous and next buttons", () => {
    render(<HeroSlider />);

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
