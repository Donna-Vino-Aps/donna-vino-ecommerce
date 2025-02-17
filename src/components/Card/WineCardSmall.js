import React from "react";
import PropTypes from "prop-types";

const WineCardSmall = ({
  title = "Barolo Terlo",
  price = 15.0,
  imageUrl = "/images/exampleImageWine.png",
  isNew = true,
  buttons = [
    {
      icon: "/icons/card/cart.svg",
      tooltip: "Add To Cart",
      onClick: () => console.warn("Add to cart clicked"),
    },
    {
      icon: "/icons/card/eye-alt.svg",
      tooltip: "Quick View",
      onClick: () => console.warn("Quick view clicked"),
    },
    {
      icon: "/icons/card/heart.svg",
      tooltip: "Add to Favorites",
      onClick: () => console.warn("Favorite clicked"),
    },
  ],
}) => {
  return (
    <section
      data-testid="wine-card"
      className="group relative flex justify-center items-center min-h-[550px] w-[320px]"
    >
      <div className="relative w-[270px] min-h-[411px] cursor-pointer bg-white shadow-xl rounded-lg overflow-visible transition-transform duration-300 hover:scale-105 flex flex-col mt-5 mb-5">
        {isNew && (
          <span className="absolute top-3 right-3 flex items-center gap-1 rounded bg-primary-normal px-2 py-1 text-xs text-white font-medium z-20">
            New
            <img
              src="/icons/card/star-fill.svg"
              className="w-3 h-3 text-white"
              alt="New Badge"
            />
          </span>
        )}

        {/* CONTENIDO */}
        <div className="relative w-full h-[270px] flex flex-col justify-center items-center mt-5">
          <img
            src={imageUrl}
            alt={title}
            className="w-[100%] h-auto object-contain mx-auto block"
            data-testid="wine-image"
          />

          <div
            data-testid="wine-buttons"
            className="absolute bottom-[50px] left-1/2 flex gap-3 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            {buttons.map((button, index) => (
              <div key={index} className="relative">
                <div className="group/button relative flex items-center justify-center w-10 h-10 rounded-full">
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition duration-300 hover:bg-primary-normal"
                    onClick={button.onClick}
                  >
                    <img
                      src={button.icon}
                      className="w-6 h-6 text-black transition-all duration-300 group-hover/button:brightness-0 group-hover/button:invert"
                      alt={button.tooltip}
                    />
                  </button>
                  <div
                    className="absolute -top-8 left-1/2 w-max -translate-x-1/2 invisible bg-white text-black text-xs whitespace-nowrap px-3 py-1 rounded-md shadow-md transition-opacity duration-300 delay-200 group-hover/button:visible group-hover/button:opacity-100"
                    data-testid={`tooltip-${index}`}
                  >
                    {button.tooltip}
                    <div className="absolute left-1/2 -bottom-1 w-2 h-2 -translate-x-1/2 rotate-45 bg-white"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TEXT CONTAINER */}
        <div className="flex flex-col justify-center items-center w-full pb-[1.25rem] flex-grow">
          <div className="p-4 flex flex-col items-center text-center w-full min-h-[71px]">
            <h3
              data-testid="wine-title"
              className="text-headlineLarge font-regular text-tertiary1-dark text-center break-words"
            >
              {title}
            </h3>
            <p
              data-testid="wine-price"
              className="text-xl font-regular text-gray-900 mt-2"
            >
              Kr. {price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

WineCardSmall.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      tooltip: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    }),
  ),
};

export default WineCardSmall;
