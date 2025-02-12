import React from "react";
import { render, screen } from "@testing-library/react";
import WineCard from "../../components/Card/WineCard.js";

describe("WineCard Component", () => {
  const mockProps = {
    title: "Cabernet Sauvignon",
    imageUrl: "/wine.jpg",
    price: 25,
    reviewsCount: 120,
  };

  test("renders the WineCard component with correct data", () => {
    render(<WineCard {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();

    expect(screen.getByText(`$${mockProps.price}`)).toBeInTheDocument();

    expect(
      screen.getByText(`${mockProps.reviewsCount} reviews`),
    ).toBeInTheDocument();

    const image = screen.getByRole("img", { name: mockProps.title });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProps.imageUrl);
    expect(image).toHaveAttribute("alt", mockProps.title);
  });
});
