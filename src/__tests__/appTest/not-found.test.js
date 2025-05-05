import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";
import Button from "@/components/Button/Button";

jest.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({
    translations: {
      "notFound.title": "Page not found",
      "notFound.message":
        "Sorry, the page you are looking for doesn't exist or has been moved.",
      "notFound.button": "Back to home",
    },
  }),
}));

jest.mock("@/components/Button/Button", () => {
  return jest.fn((props) => (
    <button data-testid="button-mock">{props.text}</button>
  ));
});

describe("NotFound", () => {
  it("should render the not found page with correct translations", () => {
    render(<NotFound />);

    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Sorry, the page you are looking for doesn't exist or has been moved.",
      ),
    ).toBeInTheDocument();

    expect(Button).toHaveBeenCalled();

    const buttonProps = Button.mock.calls[0][0];
    expect(buttonProps.text).toBe("Back to home");
    expect(buttonProps.variant).toBe("redFullText");
    expect(buttonProps.linkUrl).toBe("/");
    expect(buttonProps["aria-label"]).toBe("Back to home");
  });
});
