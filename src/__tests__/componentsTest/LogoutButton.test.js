import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LogoutButton from "@/components/Button/Logout";

// Create a mock for router.push
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Create a mock for the logout hook that simulates the router push call.
const mockLogout = jest.fn(async () => {
  // Simulate the redirect inside the hook.
  mockPush("/");
});

// Mock the useLogoutUser hook to return our mockLogout function.
jest.mock("@/services/authService", () => ({
  useLogoutUser: () => ({ logoutUser: mockLogout }),
}));

describe("LogoutButton Component", () => {
  beforeEach(() => {
    localStorage.setItem(
      "userCredentials",
      JSON.stringify({ id: "1", name: "Test" }),
    );
  });

  afterEach(() => {
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
      expect(mockLogout).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
