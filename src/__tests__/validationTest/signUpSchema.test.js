import { createSignUpSchema } from "@/validation/signUpSchema";
import dayjs from "dayjs";

describe("Sign Up Schema Validation", () => {
  // Mock translations
  const mockTranslations = {
    "signUp.validation.required": "This field is required",
    "validation.required": "This field is required.",
    "validation.emailFormat": "Please enter a valid email address",
    "signUp.validation.emailMatch":
      "Emails do not match. Please check and try again",
    "validation.passwordFormat":
      "Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character (e.g., !, @, #, $)",
    "validation.passwordMatch":
      "Passwords do not match. Please check and try again",
    "signUp.validation.birthdate": "Your date of birth in DD/MM/YYYY",
    "signUp.validation.ageRequirement":
      "You must be at least 18 years old to register",
    "signUp.validation.acceptTerms": "This checkbox is required",
  };

  let schema;

  beforeEach(() => {
    schema = createSignUpSchema(mockTranslations);
  });

  describe("Required Fields Validation", () => {
    test("validates that required fields are not empty", async () => {
      const testData = {
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        birthdate: "",
        acceptTerms: false,
      };

      try {
        await schema.validate(testData, { abortEarly: false });
        expect(true).toBe(false);
      } catch (err) {
        expect(
          err.inner.some(
            (error) =>
              error.message ===
                mockTranslations["signUp.validation.required"] &&
              error.path === "firstName",
          ),
        ).toBe(true);
        expect(
          err.inner.some(
            (error) =>
              error.message === mockTranslations["validation.required"] &&
              error.path === "email",
          ),
        ).toBe(true);
        expect(
          err.inner.some(
            (error) =>
              error.message === mockTranslations["validation.required"] &&
              error.path === "password",
          ),
        ).toBe(true);
        expect(
          err.inner.some(
            (error) =>
              error.message ===
                mockTranslations["signUp.validation.acceptTerms"] &&
              error.path === "acceptTerms",
          ),
        ).toBe(true);

        expect(err.inner.length).toBeGreaterThan(0);
      }
    });

    test("passes validation with all required fields filled", async () => {
      const validData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        confirmEmail: "john@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
        birthdate: "1990-01-01",
        acceptTerms: true,
      };

      await expect(schema.validate(validData)).resolves.toEqual(validData);
    });
  });

  describe("Email Validation", () => {
    test("validates email format", async () => {
      const invalidEmails = [
        "plainaddress",
        "#@%^%#$@#$@#.com",
        "@example.com",
        "email.example.com",
        "email@example@example.com",
      ];

      for (const invalidEmail of invalidEmails) {
        const testData = {
          firstName: "John",
          lastName: "Doe",
          email: invalidEmail,
          confirmEmail: invalidEmail,
          password: "Password123!",
          confirmPassword: "Password123!",
          birthdate: "1990-01-01",
          acceptTerms: true,
        };

        try {
          await schema.validate(testData);
          // Should not reach here
          expect(true).toBe(false);
        } catch (err) {
          expect(err.errors[0]).toEqual(
            mockTranslations["validation.emailFormat"],
          );
        }
      }
    });

    test("validates matching emails", async () => {
      const testData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        confirmEmail: "different@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
        birthdate: "1990-01-01",
        acceptTerms: true,
      };

      try {
        await schema.validate(testData);
        // Should not reach here
        expect(true).toBe(false);
      } catch (err) {
        expect(err.errors[0]).toEqual(
          mockTranslations["signUp.validation.emailMatch"],
        );
      }
    });

    test("accepts valid email formats", async () => {
      const validEmails = [
        "email@example.com",
        "firstname.lastname@example.com",
        "email@subdomain.example.com",
        "firstname+lastname@example.com",
        "1234567890@example.com",
        "email@example-one.com",
      ];

      for (const validEmail of validEmails) {
        const testData = {
          firstName: "John",
          lastName: "Doe",
          email: validEmail,
          confirmEmail: validEmail,
          password: "Password123!",
          confirmPassword: "Password123!",
          birthdate: "1990-01-01",
          acceptTerms: true,
        };

        await expect(schema.validate(testData)).resolves.toEqual(testData);
      }
    });
  });

  describe("Password Validation", () => {
    test("validates password complexity requirements", async () => {
      const invalidPasswords = [
        "short",
        "onlylowercase",
        "ONLYUPPERCASE",
        "1234567890",
        "password123",
        "Password123",
        "Password!",
      ];

      for (const invalidPassword of invalidPasswords) {
        const testData = {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          confirmEmail: "john@example.com",
          password: invalidPassword,
          confirmPassword: invalidPassword,
          birthdate: "1990-01-01",
          acceptTerms: true,
        };

        try {
          await schema.validate(testData);
          // Should not reach here
          expect(true).toBe(false);
        } catch (err) {
          expect(err.errors[0]).toEqual(
            mockTranslations["validation.passwordFormat"],
          );
        }
      }
    });

    test("validates matching passwords", async () => {
      const testData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        confirmEmail: "john@example.com",
        password: "Password123!",
        confirmPassword: "DifferentPassword123!",
        birthdate: "1990-01-01",
        acceptTerms: true,
      };

      try {
        await schema.validate(testData);
        // Should not reach here
        expect(true).toBe(false);
      } catch (err) {
        expect(err.errors[0]).toEqual(
          mockTranslations["validation.passwordMatch"],
        );
      }
    });

    test("accepts valid passwords", async () => {
      const validPasswords = [
        "Password123!",
        "Complex@Pass1",
        "SuperStr0ng!Pass",
        "A1b2C3d4!",
        "Test@1234",
      ];

      for (const validPassword of validPasswords) {
        const testData = {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          confirmEmail: "john@example.com",
          password: validPassword,
          confirmPassword: validPassword,
          birthdate: "1990-01-01",
          acceptTerms: true,
        };

        await expect(schema.validate(testData)).resolves.toEqual(testData);
      }
    });
  });

  describe("Terms Acceptance Validation", () => {
    test("validates terms acceptance is required", async () => {
      const testData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        confirmEmail: "john@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
        birthdate: "1990-01-01",
        acceptTerms: false,
      };

      try {
        await schema.validate(testData);
        // Should not reach here
        expect(true).toBe(false);
      } catch (err) {
        expect(err.errors[0]).toEqual(
          mockTranslations["signUp.validation.acceptTerms"],
        );
      }
    });
  });

  describe("Birthdate Validation", () => {
    test("validates birthdate is required", async () => {
      const testData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        confirmEmail: "john@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
        birthdate: "",
        acceptTerms: true,
      };

      try {
        await schema.validate(testData);
        // Should not reach here
        expect(true).toBe(false);
      } catch (err) {
        expect(err.errors[0]).toEqual(
          mockTranslations["signUp.validation.required"],
        );
      }
    });

    test("validates user must be at least 18 years old", async () => {
      // Generate a date for someone who is 17 years old
      const seventeenYearsAgo = dayjs()
        .subtract(17, "year")
        .format("YYYY-MM-DD");

      const testData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        confirmEmail: "john@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
        birthdate: seventeenYearsAgo,
        acceptTerms: true,
      };

      try {
        await schema.validate(testData);
        // Should not reach here
        expect(true).toBe(false);
      } catch (err) {
        expect(err.errors[0]).toEqual(
          mockTranslations["signUp.validation.ageRequirement"],
        );
      }
    });

    test("validates birthdate rejects invalid dates", async () => {
      const invalidDates = [
        "1212-12-12T00:00:00.000+00:00", // Very old date
        dayjs().add(1, "year").format("YYYY-MM-DD"), // Future date
        "invalid-date", // Not a date format
        "2100-01-01", // Unreasonable future date
      ];

      for (const invalidDate of invalidDates) {
        const testData = {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          confirmEmail: "john@example.com",
          password: "Password123!",
          confirmPassword: "Password123!",
          birthdate: invalidDate,
          acceptTerms: true,
        };

        try {
          await schema.validate(testData);
          // Should not reach here
          expect(true).toBe(false);
        } catch (err) {
          expect(err.errors[0]).toEqual(
            mockTranslations["signUp.validation.ageRequirement"],
          );
        }
      }
    });

    test("accepts valid birthdates for users who are 18 or older", async () => {
      // Exactly 18 years old
      const eighteenYearsAgo = dayjs()
        .subtract(18, "year")
        .format("YYYY-MM-DD");
      // 30 years old
      const thirtyYearsAgo = dayjs().subtract(30, "year").format("YYYY-MM-DD");
      // 65 years old
      const sixtyFiveYearsAgo = dayjs()
        .subtract(65, "year")
        .format("YYYY-MM-DD");

      const validDates = [
        eighteenYearsAgo,
        thirtyYearsAgo,
        sixtyFiveYearsAgo,
        "1990-01-01", // Static date for stable tests
      ];

      for (const validDate of validDates) {
        const testData = {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          confirmEmail: "john@example.com",
          password: "Password123!",
          confirmPassword: "Password123!",
          birthdate: validDate,
          acceptTerms: true,
        };

        await expect(schema.validate(testData)).resolves.toEqual(testData);
      }
    });
  });
});
