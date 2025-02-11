import React from "react";
import { render, screen } from "@testing-library/react";
import WineCard from "../../components/Card/WineCard.js"; // Adjust the import path if needed

describe("WineCard Component", () => {
  const mockProps = {
    title: "Cabernet Sauvignon",
    imageUrl: "/wine.jpg",
    price: 25,
    reviewsCount: 120,
  };

  test("renders the WineCard component with correct data", () => {
    render(<WineCard {...mockProps} />);

    // Check if the title is rendered
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();

    // Check if the price is rendered
    expect(screen.getByText(`$${mockProps.price}`)).toBeInTheDocument();

    // Check if the reviews count is rendered
    expect(
      screen.getByText(`${mockProps.reviewsCount} reviews`),
    ).toBeInTheDocument();

    // Check if the image is rendered correctly
    const image = screen.getByRole("img", { name: mockProps.title });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProps.imageUrl);
    expect(image).toHaveAttribute("alt", mockProps.title);
  });
});
