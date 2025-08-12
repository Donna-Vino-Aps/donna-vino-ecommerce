import Image from "next/image";
import React from "react";
import Button from "@/components/Button/Button";
import PropTypes from "prop-types";

export default function Review({
  userName,
  imageUrl,
  reviewDate,
  reviewTitle,
  reviewDescription,
  ratingWine,
}) {
  return (
    <section className="px-12 py-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image width={56} height={56} alt={userName} src={imageUrl} />
          <div className="pl-4 pr-2 font-barlow text-titleMedium text-others-darkDark">
            {userName}
          </div>
          <div className="font-barlow text-bodySmall text-others-primaryText">
            {reviewDate}
          </div>
        </div>
        <div>
          <div>{ratingWine}</div>
        </div>
      </div>
      <div>
        <h2 className="pb-4 pt-8 font-barlow text-titleLarge text-others-darkDark">
          {reviewTitle}
        </h2>
        <p className="pb-8 font-barlow text-bodyLarge text-others-primaryText">
          {reviewDescription}
        </p>
      </div>
      <div>
        <Button text="Reply" color="white" />
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
