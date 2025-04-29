import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import ShopifyRichTextRenderer from "../common/ShopifyRichTextRenderer";

function InfoCard({ title, imageUrl, imageAlt = "", description, bgClass }) {
  return (
    <div
      data-testid="info-card"
      className={`${bgClass} rounded-[2rem] pb-4 text-tertiary1-darker shadow-md `}
    >
      {imageUrl && (
        <div
          data-testid="info-card-image-container"
          className="relative mb-8 h-52 w-full"
        >
          <Image
            data-testid="info-card-image"
            src={imageUrl}
            alt={imageAlt || "Decorative image for " + title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="rounded-t-[2rem] object-cover"
          />
        </div>
      )}

      <h3
        data-testid="info-card-title"
        className="mb-6 px-5 text-displaySmall font-medium"
      >
        {title}
      </h3>

      <div
        data-testid="info-card-description"
        className="mb-8 px-5 text-bodyLarge"
      >
        <ShopifyRichTextRenderer jsonString={description} />
      </div>
    </div>
  );
}

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bulletPoints: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  bgClass: PropTypes.string,
};

export default InfoCard;
