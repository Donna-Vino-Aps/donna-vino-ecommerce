"use client";
import PropTypes from "prop-types";
import React from "react";

function MetaTags({ title, description }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
    </>
  );
}

export default MetaTags;

MetaTags.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
