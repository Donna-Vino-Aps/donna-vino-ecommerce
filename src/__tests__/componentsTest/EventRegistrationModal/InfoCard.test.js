import React from "react";
import { render, screen } from "@testing-library/react";
import InfoCard from "@/components/EventRegistrationModal/InfoCard";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line no-unused-vars
    const { fill, priority, sizes, ...imgProps } = props;
    return <img data-testid="info-card-image" {...imgProps} />;
  },
}));

// Mock the ShopifyRichTextRenderer component
jest.mock("@/components/common/ShopifyRichTextRenderer", () => {
  // eslint-disable-next-line react/prop-types
  return function MockShopifyRichTextRenderer({ jsonString }) {
    return <div data-testid="rich-text-renderer">{jsonString}</div>;
  };
});

describe("InfoCard Component", () => {
  const defaultProps = {
    title: "Test Title",
    description: "Test Description",
    imageUrl: "/test-image.jpg",
    imageAlt: "Test Alt Text",
    bgClass: "bg-primary-light",
  };

  it("renders with all props correctly", () => {
    render(<InfoCard {...defaultProps} />);

    // Check if the component renders
    const infoCard = screen.getByTestId("info-card");
    expect(infoCard).toBeInTheDocument();
    expect(infoCard).toHaveClass("bg-primary-light");
    expect(infoCard).toHaveClass("shadow-md");

    // Check if the title renders correctly
    const title = screen.getByTestId("info-card-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Test Title");

    // Check if the image renders correctly
    const imageContainer = screen.getByTestId("info-card-image-container");
    expect(imageContainer).toBeInTheDocument();

    const image = screen.getByTestId("info-card-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test Alt Text");

    // Check if the description renders correctly
    const description = screen.getByTestId("info-card-description");
    expect(description).toBeInTheDocument();

    // Check if ShopifyRichTextRenderer is called with the correct props
    const richTextRenderer = screen.getByTestId("rich-text-renderer");
    expect(richTextRenderer).toBeInTheDocument();
    expect(richTextRenderer).toHaveTextContent("Test Description");
  });
});
