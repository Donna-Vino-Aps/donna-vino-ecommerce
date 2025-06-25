import React from "react";
import PropTypes from "prop-types";

const ShoppingCart = ({ quantityInCart }) => {
  return (
    <div>
      <img
        src="/icons/cart.svg"
        alt="Cart icon"
        className="absolute h-6 w-6 cursor-pointer hover:opacity-85"
      />
      <span
        className={`relative -right-6 -top-5 flex items-center justify-center rounded-full ${quantityInCart > 0 ? "bg-primary-normal" : "bg-tertiary1-dark"} h-4 w-4 px-1 text-labelSmall text-tertiary2-light`}
      >
        {quantityInCart || 0}
      </span>
    </div>
  );
};

export default ShoppingCart;

ShoppingCart.propTypes = {
  quantityInCart: PropTypes.number.isRequired,
};
