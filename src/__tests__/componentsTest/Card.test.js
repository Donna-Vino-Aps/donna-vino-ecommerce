import { render, screen } from "@testing-library/react";
import React from "react";
import Card from "@/components/SalesCards/Card";

describe("Card", () => {
  test("renders title, descriptions, image, and link correctly", () => {
    render(
      <Card
        src="/test-image.svg"
        title="Test Card Title"
        description1="Test description 1"
        description2="Test description 2"
        urlTitle="Test Link Title"
        url="/test-link"
      />,
    );

    // Перевіряємо заголовок
    expect(screen.getByText("Test Card Title")).toBeInTheDocument();

    // Перевіряємо опис 1
    expect(screen.getByText("Test description 1")).toBeInTheDocument();

    // Перевіряємо опис 2
    expect(screen.getByText("Test description 2")).toBeInTheDocument();

    // Перевіряємо лінк
    const link = screen.getByRole("link", { name: "Test Link Title" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test-link");

    // Перевіряємо картинку
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/test-image.svg");
  });
});
