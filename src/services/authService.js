import { useRouter } from "next/navigation";
import useFetch from "@/hooks/api/useFetch";
import { logInfo } from "@/utils/logging";

export const useLogoutUser = () => {
  const router = useRouter();

  // Handle the response from the logout API.
  const onReceived = (response) => {
    logInfo("Logout response:", response);
  };

  // Initialize useFetch with the onReceived callback.
  const { performFetch, error, isLoading } = useFetch(
    "/user/log-out",
    "POST",
    null,
    {},
    onReceived,
  );

  const logoutUser = async () => {
    try {
      // Make the logout API call.
      await performFetch({ method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Clear stored credentials regardless of the API response.
      localStorage.removeItem("userCredentials");
      localStorage.removeItem("userCredentialsToken");
      sessionStorage.clear();
      // Redirect the user to the login page.
      router.push("/");
    }
  };

  return { logoutUser, error, isLoading };
};
