import React from "react";
import { render, screen } from "@testing-library/react";
import ShopifyRichTextRenderer from "@/components/common/ShopifyRichTextRenderer";
import { logError } from "@/utils/logging";

// Mock dependencies
jest.mock("@/utils/logging", () => ({
  logError: jest.fn(),
}));

describe("ShopifyRichTextRenderer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders 'No description available' when no jsonString is provided", () => {
    render(<ShopifyRichTextRenderer />);
    expect(screen.getByText("No description available")).toBeInTheDocument();
  });

  it("renders paragraph text correctly", () => {
    const jsonData = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "This is a paragraph",
            },
          ],
        },
      ],
    };

    render(<ShopifyRichTextRenderer jsonString={jsonData} />);
    expect(screen.getByText("This is a paragraph")).toBeInTheDocument();
  });

  it("renders formatted text correctly", () => {
    const jsonData = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "Bold text",
              bold: true,
            },
            {
              type: "text",
              value: "Italic text",
              italic: true,
            },
            {
              type: "text",
              value: "Underlined text",
              underline: true,
            },
            {
              type: "text",
              value: "Strikethrough text",
              strikethrough: true,
            },
          ],
        },
      ],
    };

    const { container } = render(
      <ShopifyRichTextRenderer jsonString={jsonData} />,
    );

    // Check HTML structure for formatting
    expect(container.innerHTML).toContain("<strong>Bold text</strong>");
    expect(container.innerHTML).toContain("<em>Italic text</em>");
    expect(container.innerHTML).toContain("<u>Underlined text</u>");
    expect(container.innerHTML).toContain("<s>Strikethrough text</s>");
  });

  it("renders links correctly", () => {
    const jsonData = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.com",
              children: [
                {
                  type: "text",
                  value: "Visit Example",
                },
              ],
            },
          ],
        },
      ],
    };

    const { container } = render(
      <ShopifyRichTextRenderer jsonString={jsonData} />,
    );

    // Check HTML structure for link
    expect(container.innerHTML).toContain(
      '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit Example</a>',
    );
  });

  it("renders lists correctly", () => {
    const jsonData = {
      type: "root",
      children: [
        {
          type: "list",
          listType: "unordered",
          children: [
            {
              type: "list-item",
              children: [
                {
                  type: "text",
                  value: "Item 1",
                },
              ],
            },
            {
              type: "list-item",
              children: [
                {
                  type: "text",
                  value: "Item 2",
                },
              ],
            },
          ],
        },
        {
          type: "list",
          listType: "ordered",
          children: [
            {
              type: "list-item",
              children: [
                {
                  type: "text",
                  value: "Ordered Item 1",
                },
              ],
            },
          ],
        },
      ],
    };

    const { container } = render(
      <ShopifyRichTextRenderer jsonString={jsonData} />,
    );

    // Check HTML structure for lists
    expect(container.innerHTML).toContain(
      "<ul><li>Item 1</li><li>Item 2</li></ul>",
    );
    expect(container.innerHTML).toContain("<ol><li>Ordered Item 1</li></ol>");
  });

  it("renders headings correctly", () => {
    const jsonData = {
      type: "root",
      children: [
        {
          type: "heading",
          level: 1,
          children: [
            {
              type: "text",
              value: "Heading 1",
            },
          ],
        },
        {
          type: "heading",
          level: 2,
          children: [
            {
              type: "text",
              value: "Heading 2",
            },
          ],
        },
      ],
    };

    const { container } = render(
      <ShopifyRichTextRenderer jsonString={jsonData} />,
    );

    // Check HTML structure for headings
    expect(container.innerHTML).toContain("<h1>Heading 1</h1>");
    expect(container.innerHTML).toContain("<h2>Heading 2</h2>");
  });

  it("renders images correctly", () => {
    const jsonData = {
      type: "root",
      children: [
        {
          type: "image",
          url: "https://example.com/image.jpg",
          alt: "Example image",
        },
      ],
    };

    const { container } = render(
      <ShopifyRichTextRenderer jsonString={jsonData} />,
    );

    // Check HTML structure for image
    expect(container.innerHTML).toContain(
      '<img src="https://example.com/image.jpg" alt="Example image">',
    );
  });

  it("handles unknown node types gracefully", () => {
    // Mock console.warn to prevent test output pollution
    const originalWarn = console.warn;
    console.warn = jest.fn();

    const jsonData = {
      type: "root",
      children: [
        {
          type: "unknown-type",
          children: [
            {
              type: "text",
              value: "This should not appear",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "This should appear",
            },
          ],
        },
      ],
    };

    render(<ShopifyRichTextRenderer jsonString={jsonData} />);

    // Check that warning was logged
    expect(console.warn).toHaveBeenCalledWith(
      "Unhandled node type: unknown-type",
    );

    // Check that valid content is still rendered
    expect(screen.getByText("This should appear")).toBeInTheDocument();

    // Restore original console.warn
    console.warn = originalWarn;
  });

  it("handles JSON string input", () => {
    const jsonString = JSON.stringify({
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "From JSON string",
            },
          ],
        },
      ],
    });

    render(<ShopifyRichTextRenderer jsonString={jsonString} />);
    expect(screen.getByText("From JSON string")).toBeInTheDocument();
  });

  it("handles invalid JSON string gracefully", () => {
    const invalidJson = "{ this is not valid JSON }";

    render(<ShopifyRichTextRenderer jsonString={invalidJson} />);

    // Check that error was logged
    expect(logError).toHaveBeenCalledWith(
      "Invalid JSON string:",
      expect.any(Error),
    );

    // Check that fallback message is displayed
    expect(screen.getByText("Invalid content format")).toBeInTheDocument();
  });

  it("handles null nodes gracefully", () => {
    const jsonData = {
      type: "root",
      children: [
        null,
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "After null node",
            },
          ],
        },
      ],
    };

    render(<ShopifyRichTextRenderer jsonString={jsonData} />);
    expect(screen.getByText("After null node")).toBeInTheDocument();
  });

  it("handles headings without specified level", () => {
    const jsonData = {
      type: "root",
      children: [
        {
          type: "heading",
          // No level specified, should default to h1
          children: [
            {
              type: "text",
              value: "Default Heading",
            },
          ],
        },
      ],
    };

    const { container } = render(
      <ShopifyRichTextRenderer jsonString={jsonData} />,
    );
    expect(container.innerHTML).toContain("<h1>Default Heading</h1>");
  });
});
