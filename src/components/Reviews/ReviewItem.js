import Image from "next/image";
import React from "react";
import Button from "@/components/Button/Button";
import PropTypes from "prop-types";

export default function ReviewItem({
  userName,
  imageUrl,
  reviewDate,
  reviewTitle,
  reviewDescription,
  ratingWine,
  // likes,
  // replies,
}) {
  return (
    <section className="px-12 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image width={56} height={56} alt={userName} src={imageUrl} />
          <div className="flex items-baseline gap-2 pl-4">
            <div className="font-barlow text-titleMedium text-others-darkDark">
              {userName}
            </div>
            <div className="font-barlow text-bodySmall text-others-primaryText">
              {reviewDate}
            </div>
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
      <div className="flex gap-6">
        <Button
          text="Reply"
          width="xs"
          variant="outlineThin"
          border="darkest"
          color="primaryLight"
        />
        <div className="flex items-center gap-3">
          <img
            alt="like"
            src="/reviews/like.svg"
            className="h-[18px] w-[18px] cursor-pointer text-primary-darkest"
          />
          <p className="font-barlow text-labelXLarge font-medium text-primary-darkest">
            5
          </p>
        </div>
        <div className="flex items-center gap-3">
          <img
            alt="like"
            src="/reviews/reply.svg"
            className="h-[18px] w-[18px] cursor-pointer text-primary-darkest"
          />
          <p className="font-barlow text-labelXLarge font-medium text-primary-darkest">
            5
          </p>
        </div>
      </div>
    </section>
  );
}

ReviewItem.propTypes = {
  userName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  reviewDate: PropTypes.string.isRequired,
  reviewTitle: PropTypes.string.isRequired,
  reviewDescription: PropTypes.string.isRequired,
  ratingWine: PropTypes.number.isRequired,
  // likes: PropTypes.number.isRequired,
  // replies: PropTypes.number.isRequired,
};
