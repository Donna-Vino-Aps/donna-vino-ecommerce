import React from "react";
import { render, screen } from "@testing-library/react";
import StatusPage from "@/components/StatusPage/StatusPage";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} alt={props.alt || ""} />;
  },
}));

const mockButton = jest.fn();
jest.mock("@/components/Button/Button", () => ({
  __esModule: true,
  default: (props) => {
    mockButton(props);
    if (props.linkUrl) {
      return (
        <a
          href={props.linkUrl}
          data-testid={props.testId}
          aria-label={props.ariaLabel}
        >
          {props.text}
        </a>
      );
    }
    return (
      <button
        onClick={props.onClick}
        data-testid={props.testId}
        aria-label={props.ariaLabel}
      >
        {props.text}
      </button>
    );
  },
}));

describe("StatusPage Component", () => {
  const defaultProps = {
    title: "Test Title",
    message: "Test Message",
  };

  beforeEach(() => {
    mockButton.mockClear();
  });

  test("should render title and message correctly", () => {
    render(<StatusPage {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
  });

  test("should use default testIds if not provided", () => {
    render(<StatusPage {...defaultProps} />);
    expect(screen.getByTestId("status-page-title")).toHaveTextContent(
      defaultProps.title,
    );
    expect(screen.getByTestId("status-page-message")).toHaveTextContent(
      defaultProps.message,
    );
  });

  test("should use provided testIds", () => {
    const customTitleId = "custom-title-id";
    const customMessageId = "custom-message-id";
    render(
      <StatusPage
        {...defaultProps}
        titleId={customTitleId}
        dataTestId={customMessageId}
      />,
    );
    expect(screen.getByTestId(customTitleId)).toHaveTextContent(
      defaultProps.title,
    );
    expect(screen.getByTestId(customMessageId)).toHaveTextContent(
      defaultProps.message,
    );
  });
});
