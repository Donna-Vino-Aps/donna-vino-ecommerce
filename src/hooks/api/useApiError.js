import { useEffect, useState } from "react";

export function useApiError(apiError) {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (apiError) {
      setMsg(
        typeof apiError === "string"
          ? apiError
          : apiError.message || "An unknown error occurred",
      );
    } else {
      setMsg("");
    }
  }, [apiError]);
  return msg;
}
