import { LOGOUT_ENDPOINT } from "@/config/environment";

export const logoutUser = async () => {
  try {
    const response = await fetch(LOGOUT_ENDPOINT, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error logging out");
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Clear stored credentials (as saved in the login)
    localStorage.removeItem("userCredentials");
    // If you are also storing an authToken, remove it:
    sessionStorage.clear();
    // Redirect to login page (this will force a full reload)
    window.location.href = "/";
  }
};
