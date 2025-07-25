import Image from "next/image";
import React from "react";
import Button from "@/components/Button/Button";
import PropTypes from "prop-types";

// const reviewsMockData = [];

export default function Review({
  userName,
  imageUrl,
  reviewDate,
  reviewTitle,
  reviewDescription,
}) {
  return (
    <section>
      <div>
        <Image alt={userName} src={imageUrl} />
        <div>{userName}</div>
        <div>{reviewDate}</div>
        <div>Rating</div>
      </div>
      <div>
        <h2>{reviewTitle}</h2>
        <p>{reviewDescription}</p>
      </div>
      <div>
        <Button text="Reply" />
      </div>
    </section>
  );
}

Review.propTypes = {
  userName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  reviewDate: PropTypes.string.isRequired,
  reviewTitle: PropTypes.string.isRequired,
  reviewDescription: PropTypes.string.isRequired,
  ratingWine: PropTypes.number.isRequired,
};
