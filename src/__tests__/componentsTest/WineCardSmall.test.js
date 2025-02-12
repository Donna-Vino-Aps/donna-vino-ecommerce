import React from "react";
import { render, screen } from "@testing-library/react";
import WineCardSmall from "@/components/Card/WineCardSmall";

describe("WineCardSmall Component", () => {
  const mockProps = {
    title: "Château Margaux",
    price: 0.0,
    imageUrl: "/images/exampleImageWine.png",
  };

  test("renders WineCardSmall with title, price, and image", () => {
    render(<WineCardSmall {...mockProps} />);

    expect(screen.getByTestId("wine-title")).toHaveTextContent(mockProps.title);
    expect(screen.getByTestId("wine-price")).toHaveTextContent(mockProps.price);
    expect(screen.getByTestId("wine-image")).toBeInTheDocument();
  });

  test("renders 'New' badge when isNew is true", () => {
    render(<WineCardSmall {...mockProps} isNew={true} />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });
});
