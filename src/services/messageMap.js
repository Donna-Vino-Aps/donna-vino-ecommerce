export const messageMap = {
  "No user was found associated with the provided email address. Please verify your email and try again or register if you are a new user.":
    "Email not found. Please sign up.",
  "An internal server error occurred. Please try again later or contact technical support if the issue persists.":
    "Server error. Please try later.",
};

export function mapBackendMessage(originalMsg) {
  return messageMap[originalMsg] || originalMsg;
}
