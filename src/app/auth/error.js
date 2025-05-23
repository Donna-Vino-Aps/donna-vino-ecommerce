import { useRouter } from "next/router";
import Link from "next/link";

const errorMessages = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The sign in link is no longer valid.",
  CredentialsSignin: "Invalid email or password. Please try again.",
  Default: "An unexpected error occurred. Please try again.",
};

export default function AuthErrorPage() {
  const { query } = useRouter();
  const error = query.error;
  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "auto",
        padding: 20,
        textAlign: "center",
      }}
    >
      <h1>Authentication Error</h1>
      <p>{errorMessage}</p>
      <Link href="/login">
        <button style={{ marginTop: 20 }}>Back to Login</button>
      </Link>
    </div>
  );
}
