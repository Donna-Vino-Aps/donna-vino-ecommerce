import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LogoutButton from "@/components/Button/Logout";
import { useRouter } from "next/navigation";

// Mock Next.js router and its push method
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock the logoutUser function
import { logoutUser } from "@/services/authService";
jest.mock("@/services/authService", () => ({
  logoutUser: jest.fn().mockResolvedValue(),
}));

describe("LogoutButton Component", () => {
  beforeEach(() => {
    localStorage.setItem(
      "userCredentials",
      JSON.stringify({ id: "1", name: "Test" }),
    );
  });

  afterEach(() => {
    // Clean up localStorage and mocks
    localStorage.removeItem("userCredentials");
    jest.clearAllMocks();
  });

  test("renders the logout button when userCredentials exist", () => {
    render(<LogoutButton />);
    const button = screen.getByRole("button", { name: /logout/i });
    expect(button).toBeInTheDocument();
  });

  test("does not render the logout button when userCredentials do not exist", () => {
    localStorage.removeItem("userCredentials");
    render(<LogoutButton />);
    const button = screen.queryByRole("button", { name: /logout/i });
    expect(button).toBeNull();
  });

  test("calls logoutUser and navigates home when clicked", async () => {
    render(<LogoutButton />);
    const button = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(logoutUser).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
