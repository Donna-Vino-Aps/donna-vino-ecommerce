"use client";

import React from "react";
import Review from "@/components/Reviews/Review";
import PropTypes from "prop-types";

export default function ReviewsCard({ reviews }) {
  if (!reviews.length) {
    return <p>No reviews yet.</p>;
  }

  return (
    <section>
      {reviews.map((review, id) => (
        <Review key={id} {...review} />
      ))}
    </section>
  );
}

ReviewsCard.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(Review.propTypes)).isRequired,
};
