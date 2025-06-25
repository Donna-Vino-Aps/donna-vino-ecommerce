import React from "react";
import PropTypes from "prop-types";

const ShoppingCart = ({ quantityInCart, onClick }) => {
  return (
    <div
      className="relative flex items-center justify-center"
      onClick={onClick}
    >
      <img
        src={quantityInCart > 0 ? "/icons/cart-full.svg" : "/icons/cart.svg"}
        alt="Cart icon"
        className="h-6 w-6 object-contain cursor-pointer hover:opacity-85"
      />
      <span
        className={`relative right-0 -top-5 flex items-center justify-center rounded-full ${quantityInCart > 0 ? "bg-primary-normal" : "bg-tertiary1-dark"} h-4 w-4 px-1 text-labelSmall text-tertiary2-light`}
      >
        {quantityInCart || 0}
      </span>
    </div>
  );
};

export default ShoppingCart;

ShoppingCart.propTypes = {
  quantityInCart: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
