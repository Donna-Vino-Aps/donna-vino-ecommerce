import React from "react";
import { render, screen } from "@testing-library/react";
import RootLoading from "@/app/loading";
import Spinner from "@/components/UI/Spinner";

jest.mock("@/components/UI/Spinner", () => {
  return jest.fn(() => <div data-testid="spinner-mock" />);
});

describe("RootLoading", () => {
  it("should render the loading overlay", () => {
    render(<RootLoading />);

    const overlay = screen.getByTestId("spinner-mock").parentElement;
    expect(overlay).toHaveClass(
      "fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm",
    );

    expect(Spinner).toHaveBeenCalled();
    expect(Spinner.mock.calls[0][0]).toEqual({ size: "large" });
  });
});
