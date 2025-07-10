"use client";

import React from "react";
import PropTypes from "prop-types";
import { PreSaleWinesProvider } from "@/context/PreSaleWinesContext";

export default function PreSaleLayout({ children }) {
  return <PreSaleWinesProvider>{children}</PreSaleWinesProvider>;
}

PreSaleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
