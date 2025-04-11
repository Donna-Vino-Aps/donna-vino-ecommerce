import { logError } from "@/utils/logging";
import React from "react";
import PropTypes from "prop-types";

const ShopifyRichTextRenderer = ({ jsonString }) => {
  const renderRichText = (jsonString) => {
    let data;
    try {
      // Check if the input is already an object
      if (typeof jsonString === "object") {
        data = jsonString;
      } else {
        data = JSON.parse(jsonString);
      }
    } catch (error) {
      logError("Invalid JSON string:", error);
      return "<p>Invalid content format</p>";
    }

    return renderNode(data);
  };

  const renderNode = (node) => {
    if (!node) return "";

    switch (node.type) {
      case "root":
        return node.children.map(renderNode).join("");

      case "paragraph":
        return `<p>${node.children.map(renderNode).join("")}</p>`;

      case "text":
        let text = node.value;

        // Apply formatting
        if (node.bold) {
          text = `<strong>${text}</strong>`;
        }
        if (node.italic) {
          text = `<em>${text}</em>`;
        }
        if (node.underline) {
          text = `<u>${text}</u>`;
        }
        if (node.strikethrough) {
          text = `<s>${text}</s>`;
        }

        return text;

      case "link":
        return `<a href="${node.url}" target="_blank" rel="noopener noreferrer">${node.children.map(renderNode).join("")}</a>`;

      case "list":
        const listTag = node.listType === "ordered" ? "ol" : "ul";
        return `<${listTag}>${node.children.map(renderNode).join("")}</${listTag}>`;

      case "list-item":
        return `<li>${node.children.map(renderNode).join("")}</li>`;

      case "heading":
        const level = node.level || 1;
        return `<h${level}>${node.children.map(renderNode).join("")}</h${level}>`;

      case "image":
        return `<img src="${node.url}" alt="${node.alt || ""}" />`;

      default:
        console.warn(`Unhandled node type: ${node.type}`);
        return "";
    }
  };

  if (!jsonString) {
    return <div>No description available</div>;
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: renderRichText(jsonString) }} />
  );
};

ShopifyRichTextRenderer.propTypes = {
  jsonString: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ShopifyRichTextRenderer;
