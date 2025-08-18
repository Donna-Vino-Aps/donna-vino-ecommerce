"use client";

import React from "react";
import ReviewItem from "@/components/Reviews/ReviewItem";
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

export default function ReviewList() {
  if (!reviewsMockData.length) {
    return <p>No reviews yet.</p>;
  }

  return (
    <section className="flex w-full items-center justify-center">
      <div className="mx-14 mt-20 flex w-full max-w-7xl flex-col ">
        <div className="flex flex-col gap-6">
          {reviewsMockData.map((review, id) => (
            <ReviewItem key={id} {...review} />
          ))}
        </div>
        <div className="mb-10 mt-20 flex justify-center gap-2">
          <Button
            text="Show more reviews"
            width="extraWide"
            icon="/reviews/showMore.svg"
            iconPosition="left"
            data-testid="show-more-reviews-button"
            aria-label="Show more reviews"
            variant="outlineThin"
            border="darkest"
            color="primaryLight"
          />
        </div>
      </div>
    </section>
  );
}

ReviewList.propTypes = {
  review: PropTypes.arrayOf(PropTypes.shape(ReviewItem.propTypes)).isRequired,
};
