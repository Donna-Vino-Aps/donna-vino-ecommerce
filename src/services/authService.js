import { useRouter } from "next/navigation";
import useFetch from "@/hooks/api/useFetch";

export const useLogoutUser = () => {
  const router = useRouter();
  const { performFetch } = useFetch("/user/log-out", "POST");

  const logoutUser = async () => {
    try {
      await performFetch();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear stored credentials (as saved in the login)
      localStorage.removeItem("userCredentials");
      localStorage.removeItem("userCredentialsToken");
      sessionStorage.clear();
      // Redirect to login page using Next.js router
      router.push("/");
    }
  };

  return logoutUser;
};
