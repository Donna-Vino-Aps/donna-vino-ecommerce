import React from "react";

const WineCardSmall = ({
  title = "Product Name",
  price = "Kr.0.00",
  imageUrl = "/images/exampleImageWine.png",
  isNew = true,
  buttons = [
    {
      icon: "/icons/card/cart.svg",
      tooltip: "Add To Cart",
      onClick: () => console.log("Add to cart clicked"),
    },
    {
      icon: "/icons/card/eye-alt.svg",
      tooltip: "Quick View",
      onClick: () => console.log("Quick view clicked"),
    },
    {
      icon: "/icons/card/heart.svg",
      tooltip: "Add to Favorites",
      onClick: () => console.log("Favorite clicked"),
    },
  ],
}) => {
  return (
    <div
      data-testid="wine-card"
      className="group relative max-w-xs cursor-pointer bg-white shadow-xl rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 w-[16.875rem]" 
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-[20rem] object-cover pt-[1.25rem] mb-[0.3125rem]"
          data-testid="wine-image"
        />
      </div>

      {isNew && (
        <span className="absolute right-2 top-2 flex items-center gap-1 rounded bg-[#ED1C24] px-2 py-1 text-xs text-white">
          New
          <img
            src="/icons/card/star-fill.svg"
            className="w-3 h-3 text-white"
            alt="New Badge"
          />
        </span>
      )}

      <div
        data-testid="wine-buttons"
        className="absolute bottom-[5.9375rem] left-1/2 flex gap-3 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100 w-[8.75rem] h-[5.375rem]" 
      >
        {buttons.map((button, index) => (
          <div key={index} className="relative">
            <div className="group/button relative flex items-center justify-center w-10 h-10 rounded-full">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition duration-300 hover:bg-[#ED1C24]"
                onClick={button.onClick}
              >
                <img
                  src={button.icon}
                  className="w-6 h-6 text-black transition-all duration-300 group-hover/button:brightness-0 group-hover/button:invert"
                  alt={button.tooltip}
                />
              </button>

              <div
                className="absolute -top-8 left-1/2 w-30 -translate-x-1/2 invisible bg-white text-black text-xs whitespace-nowrap px-3 py-1 rounded-md shadow-md 
              pointer-events-none opacity-0 transition-opacity duration-300 delay-200 group-hover/button:visible group-hover/button:opacity-100"
                data-testid={`tooltip-${index}`}
              >
                {button.tooltip}
                <div className="absolute left-1/2 -bottom-1 w-2 h-2 -translate-x-1/2 rotate-45 bg-white"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center w-full mt-13 pb-[1.25rem]"> 
        <div className="p-4 flex flex-col items-center text-center w-[13.25rem] h-[4.4375rem]">
          <h3
            data-testid="wine-title"
            className="mb-0 text-lg font-medium text-gray-800"
          >
            {title}
          </h3>
          <p
            data-testid="wine-price"
            className="text-xl font-bold text-gray-900"
          >
            {price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WineCardSmall;
