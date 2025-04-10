import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import ShopifyRichTextRenderer from "../common/ShopifyRichTextRenderer";

function InfoCard({ title, imageUrl, imageAlt = "", description, bgClass }) {
  return (
    <div
      data-testid="info-card"
      className={`${bgClass} shadow-md pb-4 rounded-[2rem] text-tertiary1-darker `}
    >
      {imageUrl && (
        <div
          data-testid="info-card-image-container"
          className="relative w-full h-52 mb-8"
        >
          <Image
            data-testid="info-card-image"
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover rounded-t-[2rem]"
          />
        </div>
      )}

      <h3
        data-testid="info-card-title"
        className="text-displaySmall font-medium mb-6 px-5"
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
