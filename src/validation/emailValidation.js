import * as Yup from "yup";

export const emailValidation = (translations) =>
  Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      translations["validation.emailFormat"] ||
        "Please enter a valid email address.",
    )
    .required(
      translations["validation.required"] || "This field is required.",
    );
