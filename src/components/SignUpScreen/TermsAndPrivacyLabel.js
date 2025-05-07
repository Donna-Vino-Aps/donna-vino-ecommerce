import React from "react";
import PropTypes from "prop-types";

const TermsAndPrivacyLabel = ({
  textTemplate,
  termsText,
  privacyText,
  termsUrl,
  privacyUrl,
  className = "text-bodyMedium text-secondary-dark sm:text-bodyLarge",
  linkClassName = "underline font-semibold",
}) => {
  if (!textTemplate || !termsText || !privacyText || !termsUrl || !privacyUrl) {
    console.warn("TermsAndPrivacyLabel: Missing required props.");
    return (
      <span className={className}>
        Accept the Terms of Use and Privacy Policy.*
      </span>
    );
  }

  const parts = textTemplate.split(/({terms}|{privacy})/g).filter(Boolean);

  const renderLink = (type, index) => {
    const config = {
      "{terms}": { text: termsText, url: termsUrl },
      "{privacy}": { text: privacyText, url: privacyUrl },
    };

    const { text, url } = config[type];

    return (
      <a
        key={`${type}-link-${index}`}
        className={linkClassName}
        href={url}
        aria-label={`Link to ${text}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  };

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part === "{terms}" || part === "{privacy}") {
          return renderLink(part, index);
        }

        return part;
      })}
    </span>
  );
};

TermsAndPrivacyLabel.propTypes = {
  textTemplate: PropTypes.string.isRequired,
  termsText: PropTypes.string.isRequired,
  privacyText: PropTypes.string.isRequired,
  termsUrl: PropTypes.string.isRequired,
  privacyUrl: PropTypes.string.isRequired,
  className: PropTypes.string,
  linkClassName: PropTypes.string,
};

export default TermsAndPrivacyLabel;
