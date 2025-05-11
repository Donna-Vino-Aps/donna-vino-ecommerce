import * as Yup from "yup";
import dayjs from "dayjs";

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

  return Yup.object({
    firstName: Yup.string().required(
      translations["signUp.validation.required"] || "This field is empty",
    ),
    lastName: Yup.string().required(
      translations["signUp.validation.required"] || "This field is empty",
    ),
    email: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        translations["signUp.validation.emailFormat"] ||
          "Please enter a valid email address",
      )
      .required(
        translations["signUp.validation.required"] || "This field is empty",
      ),
    confirmEmail: Yup.string()
      .oneOf(
        [Yup.ref("email"), null],
        translations["signUp.validation.emailMatch"] || "Emails do not match",
      )
      .required(
        translations["signUp.validation.required"] || "This field is empty",
      ),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        translations["signUp.validation.passwordFormat"] ||
          "Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character (e.g., !, @, #, $)",
      )
      .required(
        translations["signUp.validation.required"] || "This field is empty",
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        translations["signUp.validation.passwordMatch"] ||
          "Passwords do not match",
      )
      .required(
        translations["signUp.validation.required"] || "This field is empty",
      ),
    birthdate: Yup.string()
      .required(
        translations["signUp.validation.required"] || "This field is required",
      )
      .test(
        "age-validation",
        translations["signUp.validation.ageRequirement"] ||
          "You must be at least 18 years old to register",
        validateBirthdate,
      ),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      translations["signUp.validation.acceptTerms"] ||
        "Please check the box to proceed",
    ),
  });
};
