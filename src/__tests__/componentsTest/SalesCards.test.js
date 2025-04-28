import { render, screen } from "@testing-library/react";
import React from "react";
import SalesCards from "@/components/SalesCards/SalesCards";

jest.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({
    translations: {
      "salesCards.card1.title": "Card 1 Title",
      "salesCards.card1.description1": "Description 1",
      "salesCards.card1.description2": "Description 2",
      "salesCards.card1.urlTitle": "Link 1",

      "salesCards.card2.title": "Card 2 Title",
      "salesCards.card2.description1": "Description 1",
      "salesCards.card2.description2": "Description 2",
      "salesCards.card2.urlTitle": "Link 2",

      "salesCards.card3.title": "Card 3 Title",
      "salesCards.card3.description1": "Description 1",
      "salesCards.card3.description2": "Description 2",
      "salesCards.card3.urlTitle": "Link 3",
    },
  }),
}));

describe("SalesCards", () => {
  test("renders all 3 cards", () => {
    render(<SalesCards />);

    expect(screen.getByText("Card 1 Title")).toBeInTheDocument();
    expect(screen.getByText("Card 2 Title")).toBeInTheDocument();
    expect(screen.getByText("Card 3 Title")).toBeInTheDocument();
  });

  test("renders correct links for each card", () => {
    render(<SalesCards />);

    expect(screen.getByText("Link 1").closest("a")).toHaveAttribute(
      "href",
      "/sales-policy#shipping",
    );
    expect(screen.getByText("Link 2").closest("a")).toHaveAttribute(
      "href",
      "/sales-policy#returns",
    );
    expect(screen.getByText("Link 3").closest("a")).toHaveAttribute(
      "href",
      "/sales-policy#payment",
    );
  });
});
