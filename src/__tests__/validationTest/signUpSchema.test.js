import { createSignUpSchema } from "@/validation/signUpSchema";

describe("Sign Up Schema Validation", () => {
  // Mock translations
  const mockTranslations = {
    "signUp.validation.required": "This field is empty",
    "signUp.validation.emailFormat": "Please enter a valid email address",
    "signUp.validation.emailMatch": "Emails do not match",
    "signUp.validation.passwordFormat":
      "Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character (e.g., !, @, #, $)",
    "signUp.validation.passwordMatch": "Passwords do not match",
    "signUp.validation.acceptTerms": "Please check the box to proceed",
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
              error.message ===
                mockTranslations["signUp.validation.required"] &&
              error.path === "email",
          ),
        ).toBe(true);
        expect(
          err.inner.some(
            (error) =>
              error.message ===
                mockTranslations["signUp.validation.required"] &&
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
          expect(err.message).toEqual(
            mockTranslations["signUp.validation.emailFormat"],
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
        expect(err.message).toEqual(
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
          expect(err.message).toEqual(
            mockTranslations["signUp.validation.passwordFormat"],
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
        expect(err.message).toEqual(
          mockTranslations["signUp.validation.passwordMatch"],
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
        expect(err.message).toEqual(
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
        expect(err.message).toEqual(
          mockTranslations["signUp.validation.required"],
        );
      }
    });
  });
});
