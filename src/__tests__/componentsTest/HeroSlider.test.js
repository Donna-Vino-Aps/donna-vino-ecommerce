import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import { isVisible } from "@testing-library/dom";
import { LanguageContext } from "@/context/LanguageContext";

beforeAll(() => {
  global.innerWidth = 1024;
});

const mockTranslations = {
  "tasting.subheading1": "Subheading 1",
  "tasting.heading1": "Heading 1",
  "tasting.paragraph1": "Paragraph 1",
  "tasting.button1": "Button 1",

  "tasting.subheading2": "Subheading 2",
  "tasting.heading2": "Heading 2",
  "tasting.paragraph2": "Paragraph 2",
  "tasting.button2": "Button 2",

  "tasting.subheading3": "Subheading 3",
  "tasting.heading3": "Heading 3",
  "tasting.paragraph3": "Paragraph 3",
  "tasting.button3": "Button 3",
};

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
      // translations:                      UNCOMMENT THIS TEXT WHEN SWITCHING BACK TO THE VIDEO SLIDE
      //   "tasting.subheading1": "Events",
      //   "tasting.heading1": "Book your seat at our next tasting session",
      //   "tasting.paragraph1": "Join us for a premium wine tasting experience",
      //   "tasting.button1": "Book a tasting session",
      // },
      translations: {
        "tasting.subheading2": "Store",
        "tasting.heading2": "Find the perfect wine",
        "tasting.paragraph2":
          "At Donna Vino, we believe there’s a perfect wine for every occasion. Explore our wine selection, carefully curated by our head sommelier, Katrine.",
        "tasting.button2": "See catalog",
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

    // expect(screen.getByText(/Events/)).toBeInTheDocument();
    // expect(
    //   screen.getByText(/Book your seat at our next tasting session/),
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByText(/Join us for a premium wine tasting experience/),
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByRole("button", { name: /Book a tasting session/i }),
    // ).toBeInTheDocument();

    expect(screen.getByText(/Store/)).toBeInTheDocument();
    expect(screen.getByText(/Find the perfect wine/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /At Donna Vino, we believe there’s a perfect wine for every occasion. Explore our wine selection, carefully curated by our head sommelier, Katrine./,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /See catalog/i }),
    ).toBeInTheDocument();
  });

  test("renders the previous and next buttons (and their icons)", () => {
    render(<HeroSlider />);

    // Collect all instances
    const prevButtons = screen.getAllByTestId("carousel-previous-button-large");
    const nextButtons = screen.getAllByTestId("carousel-next-button-large");
    const prevIcons = screen.getAllByTestId("icon-previous-arrow-large");
    const nextIcons = screen.getAllByTestId("icon-next-arrow-large");

    // Assert that there is at least one of each
    expect(prevButtons.length).toBeGreaterThan(0);
    expect(nextButtons.length).toBeGreaterThan(0);
    expect(prevIcons.length).toBeGreaterThan(0);
    expect(nextIcons.length).toBeGreaterThan(0);
  });
});
