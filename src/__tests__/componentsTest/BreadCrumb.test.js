import React from "react";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {" "}
      {/* Render a simple <a> tag */}
      {children}
    </a>
  );
});

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/products/wines/red-wines"),
}));

describe("Breadcrumb Component", () => {
  it("renders the breadcrumbs correctly", () => {
    render(<BreadCrumb />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute("href")).toBe("/");

    const electronicsLink = screen.getByRole("link", { name: "Wines" });
    expect(electronicsLink).toBeInTheDocument();
    expect(electronicsLink.getAttribute("href")).toBe("/home/wines");

    const laptopsLink = screen.getByRole("link", { name: "Red Wines" });
    expect(laptopsLink).toBeInTheDocument();
    expect(laptopsLink.getAttribute("href")).toBe("/home/wines/red-wines");
  });

  it("renders no dynamic breadcrumbs for root path", () => {
    usePathname.mockImplementation(() => "/");
    render(<BreadCrumb />);

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(3);
  });
});
