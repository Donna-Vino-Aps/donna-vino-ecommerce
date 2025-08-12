"use client";

import React from "react";
import Review from "@/components/Reviews/Review";
import PropTypes from "prop-types";
import Button from "@/components/Button/Button";

const reviewsMockData = [
  {
    userName: "Anna K.",
    imageUrl: "/icons/userMenu/account.svg",
    reviewDate: "2025-08-01",
    reviewTitle: "Fantastic wine and service!",
    reviewDescription:
      "Everything was perfect, from the packaging to the taste. Highly recommend!",
    ratingWine: 5,
  },
  {
    userName: "John D.",
    imageUrl: "/icons/userMenu/account.svg",
    reviewDate: "2025-08-03",
    reviewTitle: "Great but could improve delivery",
    reviewDescription:
      "Wine was excellent, but delivery took a bit longer than expected.",
    ratingWine: 4,
  },
  {
    userName: "Sofia L.",
    imageUrl: "/icons/userMenu/account.svg",
    reviewDate: "2025-08-05",
    reviewTitle: "Absolutely amazing!",
    reviewDescription:
      "The flavor was incredible. Will definitely order again.",
    ratingWine: 5,
  },
];

export default function ReviewsCard() {
  if (!reviewsMockData.length) {
    return <p>No reviews yet.</p>;
  }

  return (
    <section className="mx-14 mb-14 mt-20 flex flex-col gap-6">
      {reviewsMockData.map((review, id) => (
        <Review key={id} {...review} />
      ))}
      <Button text="Show more reviews" color="white" />
    </section>
  );
}

ReviewsCard.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(Review.propTypes)).isRequired,
};
