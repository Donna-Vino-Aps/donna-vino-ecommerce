import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

function InfoCard({
  title,
  imageUrl,
  imageAlt = "",
  description,
  winery,
  wine,
  bgClass,
}) {
  return (
    <div className={`${bgClass} shadow-md pb-4 rounded-[2rem]`}>
      {imageUrl && (
        <div className="relative w-full h-64 mb-2">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover rounded-[2rem]"
          />
        </div>
      )}

      <h3 className="text-displaySmall text-terniary1-darker font-medium font-barlow mb-6 pr-6 pl-6">
        {title}
      </h3>

      <p className="mb-2 pr-2 pl-6 text-bodyLarge">{description}</p>

      {bulletPoints.length > 0 && (
        <ul className="list-none space-y-1 pr-6 pl-6 text-bodyLarge">
          {bulletPoints.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bulletPoints: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  winery: PropTypes.string,
  wine: PropTypes.string,
  bgClass: PropTypes.string,
};

export default InfoCard;
