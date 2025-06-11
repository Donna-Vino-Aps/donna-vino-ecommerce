"use client";
import React from "react";
import PropTypes from "prop-types";

function SEO({
  title,
  description,
  url,
  robots = true,
  includeOpenGraph = false,
}) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {robots && <meta name="robots" content="index,follow" />}

      {includeOpenGraph && (
        <>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={url} />
        </>
      )}
    </>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  robots: PropTypes.bool,
  includeOpenGraph: PropTypes.bool,
};

export default SEO;
