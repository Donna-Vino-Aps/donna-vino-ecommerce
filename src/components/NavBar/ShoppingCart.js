import React from "react";

const ShoppingCart = () => {
  return (
    <div>
      <img
        src="/icons/cart.svg"
        alt="Search icon"
        className="cursor-pointer hover:opacity-85"
      />
      {/* <span className="absolute -top-1 -right-1 bg-primary-normal text-white text-xs rounded-full px-1">
        0
      </span> */}
    </div>
  );
};

export default ShoppingCart;
