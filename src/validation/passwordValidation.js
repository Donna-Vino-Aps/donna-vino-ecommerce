import * as Yup from "yup";

export const passwordSchema = (translations) =>
  Yup.object({
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        translations["validation.passwordFormat"] ||
          "Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character.",
      )
      .required(
        translations["validation.required"] || "This field is required.",
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        translations["validation.passwordMatch"] ||
          "Passwords do not match. Please check and try again.",
      )
      .required(
        translations["validation.required"] || "This field is required.",
      ),
  });
