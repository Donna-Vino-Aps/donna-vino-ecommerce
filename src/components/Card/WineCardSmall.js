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
      className="group relative flex min-h-[550px] w-[320px] items-center justify-center"
    >
      <div className="relative mb-5 mt-5 flex min-h-[411px] w-[300px] cursor-pointer flex-col overflow-visible rounded-lg bg-tertiary2-light shadow-xl transition-transform duration-300 hover:scale-105">
        {isNew && (
          <span className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded bg-primary-normal px-2 py-1 text-bodyMedium font-medium text-tertiary2-light">
            New
            <img
              src="/icons/card/star-fill.svg"
              className="h-3 w-3 text-tertiary2-light"
              alt="New Badge"
            />
          </span>
        )}

        <div className="relative mt-5 flex h-[270px] w-full flex-col items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-contain"
            data-testid="wine-image"
          />

          <div
            data-testid="wine-buttons"
            className="absolute bottom-[50px] left-1/2 flex -translate-x-1/2 gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            {buttons.map((button, index) => (
              <div key={index} className="relative">
                <div className="group/button relative flex h-10 w-10 items-center justify-center rounded-full">
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition duration-300 hover:bg-primary-normal"
                    onClick={button.onClick}
                  >
                    <img
                      src={button.icon}
                      className="h-6 w-6 text-tertiary1-darker transition-all duration-300 group-hover/button:brightness-0 group-hover/button:invert"
                      alt={button.tooltip}
                    />
                  </button>
                  <div
                    className="invisible absolute -top-8 left-1/2 w-max -translate-x-1/2 whitespace-nowrap rounded-md bg-tertiary2-light px-3 py-1 text-tertiary1-darker shadow-md transition-opacity delay-200 duration-300 group-hover/button:visible group-hover/button:opacity-100"
                    data-testid={`tooltip-${index}`}
                  >
                    {button.tooltip}
                    <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-tertiary2-light"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-grow items-center justify-center pb-[1.25rem]">
          <div className="flex min-h-[71px] w-full flex-col items-center p-4 text-center">
            <h3
              data-testid="wine-title"
              className="break-words text-center text-headlineSmall font-regular text-tertiary1-normal"
            >
              {title}
            </h3>
            <p
              data-testid="wine-price"
              className="mt-2 text-bodyLarge font-medium text-tertiary1-normal"
            >
              Kr. {price.toFixed(2)}
            </p>
          </div>
          <div className="flex min-h-[71px] w-full flex-col items-center p-4 text-center"></div>
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
