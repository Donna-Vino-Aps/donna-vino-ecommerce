import * as Yup from "yup";
import dayjs from "dayjs";
import { emailValidation } from "./emailValidation";
import { passwordSchema } from "./passwordValidation";

export const createSignUpSchema = (translations) => {
  const validateBirthdate = (value) => {
    if (!value) return false;

    const birthDate = dayjs(value);

    if (!birthDate.isValid()) return false;

    const birthYear = birthDate.year();
    const currentYear = dayjs().year();
    if (birthYear < 1900 || birthYear > currentYear) return false;

    const today = dayjs();
    const age = today.diff(birthDate, "year");

    return age >= 18;
  };

  const signUpSchema = Yup.object({
    firstName: Yup.string().required(
      translations["signUp.validation.required"] || "This field is required.",
    ),
    lastName: Yup.string().required(
      translations["signUp.validation.required"] || "This field is required.",
    ),
    email: emailValidation(translations),
    confirmEmail: Yup.string()
      .oneOf(
        [Yup.ref("email"), null],
        translations["signUp.validation.emailMatch"] ||
          "Emails do not match. Please check and try again.",
      )
      .required(
        translations["signUp.validation.required"] || "This field is required.",
      ),
    birthdate: Yup.string()
      .required(
        translations["signUp.validation.required"] || "This field is required.",
      )
      .test(
        "age-validation",
        translations["signUp.validation.ageRequirement"] ||
          "You must be at least 18 years old to register.",
        validateBirthdate,
      ),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      translations["signUp.validation.acceptTerms"] ||
        "This checkbox is required.",
    ),
  });
  return signUpSchema.concat(passwordSchema(translations));
};
