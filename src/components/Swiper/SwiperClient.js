"use client";

import React from "react";
import { Swiper } from "swiper/react";
import { A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropTypes from "prop-types";

const SwiperClient = ({ children, ...props }) => {
  return (
    <Swiper modules={[A11y]} {...props}>
      {children}
    </Swiper>
  );
};

SwiperClient.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SwiperClient;
