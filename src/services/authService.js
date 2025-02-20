import { LOGOUT_ENDPOINT } from "@/config/environment";
import { useRouter } from "next/navigation";

export const useLogoutUser = () => {
  const router = useRouter();

  const logoutUser = async () => {
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
      sessionStorage.clear();
      // Redirect to login page using Next.js router
      router.push("/");
    }
  };

  return logoutUser;
};
