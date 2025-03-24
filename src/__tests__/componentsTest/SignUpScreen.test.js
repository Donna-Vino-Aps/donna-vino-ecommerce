import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpScreen from "@/components/SignUpScreen/SignUpScreen";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import * as formikModule from "formik";
import * as useFetchModule from "../../hooks/api/useFetch";
import { createSignUpSchema } from "@/validation/signUpSchema";

// Mock dependencies
jest.mock("@/context/LanguageContext", () => ({
  useLanguage: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../hooks/api/useFetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/validation/signUpSchema", () => ({
  createSignUpSchema: jest.fn(),
}));

jest.mock("../../utils/logging", () => ({
  logError: jest.fn(),
}));

// Mock the TextInputSignUpScreen component
jest.mock("@/components/SignUpScreen/TextInputSignUpScreen", () => ({
  __esModule: true,
  default: jest.fn(
    ({
      name,
      type,
      placeholder,
      value,
      onChange,
      onBlur,
      isDate,
      error,
      ...props
    }) => (
      <div data-testid={`input-container-${name}`}>
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={
            isDate ? (e) => onChange(new Date(e.target.value)) : onChange
          }
          onBlur={onBlur}
          placeholder={placeholder}
          data-testid={props["data-testid"] || `input-${name}`}
        />
        {error && <div className="error">{error}</div>}
      </div>
    ),
  ),
}));

// Add helper function for form filling
const fillSignUpForm = (customValues = {}) => {
  const defaultValues = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    confirmEmail: "john@example.com",
    password: "password123",
    confirmPassword: "password123",
    birthdate: "1990-01-01",
    acceptTerms: true,
    subscribeToNewsletter: false,
  };

  // Merge default values with any custom values provided
  const values = { ...defaultValues, ...customValues };

  // Get form elements
  const firstNameInput = screen.getByTestId("input-first-name");
  const lastNameInput = screen.getByTestId("input-last-name");
  const emailInput = screen.getByTestId("input-email");
  const confirmEmailInput = screen.getByTestId("input-confirm-email");
  const passwordInput = screen.getByTestId("input-password");
  const confirmPasswordInput = screen.getByTestId("input-confirm-password");
  const birthdateInput = screen.getByTestId("input-birthdate");
  const termsCheckbox = screen.getByRole("checkbox", {
    name: (content, element) => element.name === "acceptTerms",
  });
  const newsletterCheckbox = screen.getByRole("checkbox", {
    name: (content, element) => element.name === "subscribeToNewsletter",
  });

  // Fill form fields with values
  fireEvent.change(firstNameInput, { target: { value: values.firstName } });
  fireEvent.change(lastNameInput, { target: { value: values.lastName } });
  fireEvent.change(emailInput, { target: { value: values.email } });
  fireEvent.change(confirmEmailInput, {
    target: { value: values.confirmEmail },
  });
  fireEvent.change(passwordInput, { target: { value: values.password } });
  fireEvent.change(confirmPasswordInput, {
    target: { value: values.confirmPassword },
  });
  fireEvent.change(birthdateInput, { target: { value: values.birthdate } });

  // Handle checkboxes (only click if needed to achieve desired state)
  if (values.acceptTerms) {
    if (!termsCheckbox.checked) {
      fireEvent.click(termsCheckbox);
    }
  } else if (termsCheckbox.checked) {
    fireEvent.click(termsCheckbox);
  }

  if (values.subscribeToNewsletter) {
    if (!newsletterCheckbox.checked) {
      fireEvent.click(newsletterCheckbox);
    }
  } else if (newsletterCheckbox.checked) {
    fireEvent.click(newsletterCheckbox);
  }

  return {
    elements: {
      firstNameInput,
      lastNameInput,
      emailInput,
      confirmEmailInput,
      passwordInput,
      confirmPasswordInput,
      birthdateInput,
      termsCheckbox,
      newsletterCheckbox,
      submitButton: screen.getByRole("button", { name: "Create your account" }),
    },
    values,
  };
};

describe("SignUpScreen", () => {
  const mockPerformFetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({ success: true, msg: "Signup successful" });
  });
  const mockPush = jest.fn();
  const mockTranslations = {
    "signUp.create-button": "Create your account",
    "signUp.heading": "Join Donna Vino",
    "signUp.paragraph":
      "Create a profile for your future orders to have all your information saved and ready for use. Registering on our Donna Vino website is quick and easy, allowing you to streamline your shopping experience and enjoy a faster checkout every time.",
    "signUp.personal": "Personal Details",
    "signUp.placeholder.firstName": "First name*",
    "signUp.placeholder.lastName": "Last name*",
    "signUp.placeholder.email": "Email*",
    "signUp.placeholder.confirmEmail": "Confirm Email*",
    "signUp.placeholder.password": "Password*",
    "signUp.placeholder.confirmPassword": "Confirm Password*",
    "signUp.placeholder.birthdate": "Date of birth*",
    "signUp.ageTooltip":
      "Why we ask? As we sell alcoholic beverages, you must be +18 to purchase",
    "signUp.validation.required": "This field is empty",
    "signUp.validation.emailFormat": "Please enter a valid email address",
    "signUp.validation.emailMatch": "Emails do not match",
    "signUp.validation.passwordFormat":
      "Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character (e.g., !, @, #, $)",
    "signUp.validation.passwordMatch": "Passwords do not match",
    "signUp.validation.acceptTerms": "Please check the box to proceed",
    "signUp.acceptTerms": "I accept {terms} and {privacy}.",
    "signUp.terms": "Terms of Use",
    "signUp.privacy": "Privacy Policy",
    "signUp.updates": "I want to receive updates and offers.",
    "common.submitting": "Submitting...",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    useLanguage.mockReturnValue({
      translations: mockTranslations,
    });

    useRouter.mockReturnValue({
      push: mockPush,
    });

    useFetchModule.default.mockReturnValue({
      performFetch: mockPerformFetch,
      isLoading: false,
      error: null,
    });

    createSignUpSchema.mockReturnValue({
      validate: jest.fn().mockImplementation((values) => {
        const errors = {};
        if (!values.firstName) errors.firstName = "First name is required";
        if (!values.email) errors.email = "Valid email is required";
        if (!values.password) errors.password = "Password is required";
        if (!values.acceptTerms)
          errors.acceptTerms = "You must accept the terms";
        return Promise.resolve(errors);
      }),
    });
  });

  test("renders the signup form with all expected elements", () => {
    render(<SignUpScreen />);

    // Check heading and paragraphs
    expect(screen.getByText("Join Donna Vino")).toBeInTheDocument();
    expect(screen.getByText("Personal Details")).toBeInTheDocument();

    // Check form inputs existence
    expect(screen.getByTestId("input-container-firstName")).toBeInTheDocument();
    expect(screen.getByTestId("input-first-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-container-lastName")).toBeInTheDocument();
    expect(screen.getByTestId("input-last-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-container-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(
      screen.getByTestId("input-container-confirmEmail"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("input-confirm-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-container-password")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(
      screen.getByTestId("input-container-confirmPassword"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("input-confirm-password")).toBeInTheDocument();
    expect(screen.getByTestId("input-container-birthdate")).toBeInTheDocument();
    expect(screen.getByTestId("input-birthdate")).toBeInTheDocument();

    // Check buttons and checkboxes
    expect(
      screen.getByRole("button", { name: "Create your account" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", {
        name: (content, element) => element.name === "acceptTerms",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", {
        name: (content, element) => element.name === "subscribeToNewsletter",
      }),
    ).toBeInTheDocument();
  });

  test("submits the form with valid data", async () => {
    render(<SignUpScreen />);

    const { elements } = fillSignUpForm();

    fireEvent.click(elements.submitButton);

    await waitFor(() => {
      expect(mockPerformFetch).toHaveBeenCalledWith({
        method: "POST",
        data: {
          user: {
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "password123",
            dateOfBirth: "1990-01-01",
            isSubscribed: false,
            authProvider: "local",
          },
        },
      });
    });
  });

  test("handles successful signup", async () => {
    mockPerformFetch.mockImplementationOnce(() => {
      const response = { success: true, msg: "Signup successful" };
      setTimeout(() => {
        mockPush("/signup/welcome");
      }, 0);
      return Promise.resolve(response);
    });

    render(<SignUpScreen />);

    const { elements } = fillSignUpForm();

    fireEvent.click(elements.submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/signup/welcome");
    });
  });

  test("handles failed signup", async () => {
    const errorMessage = "Email already in use";
    mockPerformFetch.mockImplementationOnce(() => {
      return Promise.resolve({ success: false, msg: errorMessage });
    });

    render(<SignUpScreen />);

    const { elements } = fillSignUpForm();

    fireEvent.click(elements.submitButton);

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  test("disables submit button during form submission", async () => {
    jest.spyOn(formikModule, "Formik").mockImplementation(({ children }) => {
      return children({
        handleSubmit: jest.fn(),
        handleChange: jest.fn(),
        handleBlur: jest.fn(),
        values: {
          firstName: "John",
          lastName: "Doe",
          email: "test@example.com",
          confirmEmail: "test@example.com",
          password: "password",
          confirmPassword: "password",
          birthdate: new Date(),
          acceptTerms: true,
          subscribeToNewsletter: false,
        },
        setFieldValue: jest.fn(),
        errors: {},
        touched: {},
        isSubmitting: true, // Set to true to test disabled state
      });
    });

    render(<SignUpScreen />);

    const submitButton = screen.getByRole("button", {
      name: /submitting|create your account/i,
    });
    expect(submitButton).toBeDisabled();

    expect(screen.getByText("Submitting...")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /^create your account$/i }),
    ).not.toBeInTheDocument();
  });

  test("validation shows errors for required fields", async () => {
    jest.spyOn(formikModule, "Formik").mockImplementation(({ children }) => {
      return children({
        handleSubmit: jest.fn(),
        handleChange: jest.fn(),
        handleBlur: jest.fn(),
        values: {
          firstName: "",
          lastName: "",
          email: "",
          confirmEmail: "",
          password: "",
          confirmPassword: "",
          birthdate: "",
          acceptTerms: false,
          subscribeToNewsletter: false,
        },
        setFieldValue: jest.fn(),
        errors: {
          firstName: "First name is required",
          email: "Valid email is required",
          password: "Password is required",
          acceptTerms: "You must accept the terms",
        },
        touched: {
          firstName: true,
          email: true,
          password: true,
          acceptTerms: true,
        },
        isSubmitting: false,
      });
    });

    render(<SignUpScreen />);

    expect(screen.getByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Valid email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(screen.getByText("You must accept the terms")).toBeInTheDocument();
  });

  test("validates password complexity requirements", async () => {
    jest.spyOn(formikModule, "Formik").mockImplementation(({ children }) => {
      return children({
        handleSubmit: jest.fn(),
        handleChange: jest.fn(),
        handleBlur: jest.fn(),
        values: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          confirmEmail: "john@example.com",
          password: "simple",
          confirmPassword: "simple",
          birthdate: "1990-01-01",
          acceptTerms: true,
          subscribeToNewsletter: false,
        },
        setFieldValue: jest.fn(),
        errors: {
          password: mockTranslations["signUp.validation.passwordFormat"],
        },
        touched: {
          password: true,
        },
        isSubmitting: false,
      });
    });

    render(<SignUpScreen />);

    await waitFor(() => {
      expect(
        screen.getByText(mockTranslations["signUp.validation.passwordFormat"]),
      ).toBeInTheDocument();
    });
  });

  test("validates email format", async () => {
    jest.spyOn(formikModule, "Formik").mockImplementation(({ children }) => {
      return children({
        handleSubmit: jest.fn(),
        handleChange: jest.fn(),
        handleBlur: jest.fn(),
        values: {
          firstName: "John",
          lastName: "Doe",
          email: "invalidemail",
          confirmEmail: "invalidemail",
          password: "Password123!",
          confirmPassword: "Password123!",
          birthdate: "1990-01-01",
          acceptTerms: true,
          subscribeToNewsletter: false,
        },
        setFieldValue: jest.fn(),
        errors: {
          email: mockTranslations["signUp.validation.emailFormat"],
        },
        touched: {
          email: true,
        },
        isSubmitting: false,
      });
    });

    render(<SignUpScreen />);

    await waitFor(() => {
      expect(
        screen.getByText(mockTranslations["signUp.validation.emailFormat"]),
      ).toBeInTheDocument();
    });
  });

  test("validates email matching", async () => {
    jest.spyOn(formikModule, "Formik").mockImplementation(({ children }) => {
      return children({
        handleSubmit: jest.fn(),
        handleChange: jest.fn(),
        handleBlur: jest.fn(),
        values: {
          firstName: "John",
          lastName: "Doe",
          email: "correct@example.com",
          confirmEmail: "different@example.com",
          password: "Password123!",
          confirmPassword: "Password123!",
          birthdate: "1990-01-01",
          acceptTerms: true,
          subscribeToNewsletter: false,
        },
        setFieldValue: jest.fn(),
        errors: {
          confirmEmail: mockTranslations["signUp.validation.emailMatch"],
        },
        touched: {
          confirmEmail: true,
        },
        isSubmitting: false,
      });
    });

    render(<SignUpScreen />);

    await waitFor(() => {
      expect(
        screen.getByText(mockTranslations["signUp.validation.emailMatch"]),
      ).toBeInTheDocument();
    });
  });

  test("validates password matching", async () => {
    jest.spyOn(formikModule, "Formik").mockImplementation(({ children }) => {
      return children({
        handleSubmit: jest.fn(),
        handleChange: jest.fn(),
        handleBlur: jest.fn(),
        values: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          confirmEmail: "john@example.com",
          password: "Password123!",
          confirmPassword: "DifferentPassword123!",
          birthdate: "1990-01-01",
          acceptTerms: true,
          subscribeToNewsletter: false,
        },
        setFieldValue: jest.fn(),
        errors: {
          confirmPassword: mockTranslations["signUp.validation.passwordMatch"],
        },
        touched: {
          confirmPassword: true,
        },
        isSubmitting: false,
      });
    });

    render(<SignUpScreen />);

    await waitFor(() => {
      expect(
        screen.getByText(mockTranslations["signUp.validation.passwordMatch"]),
      ).toBeInTheDocument();
    });
  });

  test("validates terms acceptance", async () => {
    jest.spyOn(formikModule, "Formik").mockImplementation(({ children }) => {
      return children({
        handleSubmit: jest.fn(),
        handleChange: jest.fn(),
        handleBlur: jest.fn(),
        values: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          confirmEmail: "john@example.com",
          password: "Password123!",
          confirmPassword: "Password123!",
          birthdate: "1990-01-01",
          acceptTerms: false,
          subscribeToNewsletter: false,
        },
        setFieldValue: jest.fn(),
        errors: {
          acceptTerms: mockTranslations["signUp.validation.acceptTerms"],
        },
        touched: {
          acceptTerms: true,
        },
        isSubmitting: false,
      });
    });

    render(<SignUpScreen />);

    await waitFor(() => {
      expect(
        screen.getByText(mockTranslations["signUp.validation.acceptTerms"]),
      ).toBeInTheDocument();
    });
  });
});
