import React from "react";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Breadcrumb Component", () => {
  it("renders breadcrumbs with wines label handling", () => {
    usePathname.mockReturnValue("/wines");
    render(<BreadCrumb />);

    const winesLink = screen.getByRole("link", { name: "Wines" });
    expect(winesLink).toBeInTheDocument();
    expect(winesLink.getAttribute("href")).toBe("/wines");
  });

  it("renders breadcrumbs with offers label handling", () => {
    usePathname.mockReturnValue("/offers");
    render(<BreadCrumb />);

    const offersLink = screen.getByRole("link", { name: "Offers" });
    expect(offersLink).toBeInTheDocument();
    expect(offersLink.getAttribute("href")).toBe("/offers");
  });

  it("renders breadcrumbs with grapes & zones label handling", () => {
    usePathname.mockReturnValue("/grapes-zones");
    render(<BreadCrumb />);

    const grapesLink = screen.getByRole("link", { name: "Grapes & Zones" });
    expect(grapesLink).toBeInTheDocument();
    expect(grapesLink.getAttribute("href")).toBe("/grapes-zones");
  });
});
