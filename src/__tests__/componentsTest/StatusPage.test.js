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

  test("should render an image if image prop is provided", () => {
    const imageProps = {
      src: "/test-image.png",
      alt: "Test Image Alt",
      width: 50,
      height: 50,
    };
    render(<StatusPage {...defaultProps} image={imageProps} />);
    const imgElement = screen.getByAltText(imageProps.alt);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", imageProps.src);
    expect(imgElement).toHaveAttribute("width", imageProps.width.toString());
    expect(imgElement).toHaveAttribute("height", imageProps.height.toString());
  });

  test("should not render an image if image prop is not provided", () => {
    render(<StatusPage {...defaultProps} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("should render button and pass correct props if button prop is provided", () => {
    const buttonProps = {
      text: "Click Me",
      linkUrl: "/test-link",
      testId: "custom-button-id",
      ariaLabel: "Custom Button Aria Label",
    };
    render(<StatusPage {...defaultProps} button={buttonProps} />);

    expect(mockButton).toHaveBeenCalledWith(
      expect.objectContaining({
        text: buttonProps.text,
        linkUrl: buttonProps.linkUrl,
        testId: buttonProps.testId,
        ariaLabel: buttonProps.ariaLabel,
        color: "primary",
        width: "full",
        linkWidth: "w-full",
      }),
    );

    const buttonElement = screen.getByTestId(buttonProps.testId);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(buttonProps.text);
    expect(buttonElement).toHaveAttribute("href", buttonProps.linkUrl);
    expect(buttonElement).toHaveAttribute("aria-label", buttonProps.ariaLabel);
  });

  test("should use default button testId and ariaLabel if not provided in button prop", () => {
    const buttonProps = {
      text: "Default Test Button",
      linkUrl: "/default-test",
    };
    render(<StatusPage {...defaultProps} button={buttonProps} />);
    expect(mockButton).toHaveBeenCalledWith(
      expect.objectContaining({
        text: buttonProps.text,
        linkUrl: buttonProps.linkUrl,
        testId: "status-page-button",
        ariaLabel: buttonProps.text,
      }),
    );
    const buttonElement = screen.getByTestId("status-page-button");
    expect(buttonElement).toHaveTextContent(buttonProps.text);
    expect(buttonElement).toHaveAttribute("aria-label", buttonProps.text);
  });

  test("should not render button if button prop is not provided", () => {
    render(<StatusPage {...defaultProps} />);
    expect(mockButton).not.toHaveBeenCalled();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
