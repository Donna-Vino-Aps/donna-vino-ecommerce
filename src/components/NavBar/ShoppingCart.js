import React from "react";
import PropTypes from "prop-types";

const ShoppingCart = ({ totalQuantityInCart, onClick }) => {
  return (
    <div
      className="relative flex items-center justify-center"
      onClick={onClick}
    >
      <img
        src={
          totalQuantityInCart > 0 ? "/icons/cart-full.svg" : "/icons/cart.svg"
        }
        alt="Cart icon"
        className="h-6 w-6 cursor-pointer object-contain hover:opacity-85"
      />
      <span
        className={`relative -top-5 right-0 flex items-center justify-center rounded-full ${totalQuantityInCart > 0 ? "bg-primary-normal" : "bg-tertiary1-dark"} h-4 w-4 px-1 text-labelSmall text-tertiary2-light`}
      >
        {totalQuantityInCart || 0}
      </span>
    </div>
  );
};

export default ShoppingCart;

ShoppingCart.propTypes = {
  totalQuantityInCart: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
