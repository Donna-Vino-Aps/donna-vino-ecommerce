"use client";
import React from "react";
import PropTypes from "prop-types";
import Breadcrumb from "../BreadCrumb/BreadCrumb";
import Image from "next/image";

const Event = ({ type }) => {
  return (
    <div>
      <Breadcrumb />
      <div>
        <div></div>
        <Image />
      </div>
    </div>
  );
};

Event.propTypes = {
  type: PropTypes.oneOf(["Tasting-class", "Sommelier-table", "Private-table"]),
};

export default Event;
