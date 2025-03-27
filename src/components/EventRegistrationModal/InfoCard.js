import React from "react";
import PropTypes from "prop-types";
function InfoCard({
  title,
  description,
  bulletPoints = [],
  imageUrl,
  bgClass = "bg-white",
}) {
  return (
    <div className={`${bgClass} shadow-md pb-4 rounded-t-[5rem] rounded-b-xl`}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto object-cover rounded-md mb-2"
        />
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
  bgClass: PropTypes.string,
};

export default InfoCard;
