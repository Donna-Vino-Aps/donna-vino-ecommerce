import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useCart } from "@/context/ShoppingCartContext";

const ShoppingCart = ({ onClick }) => {
  const { items } = useCart();

  const totalQuantityInCart = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  return (
    <div
      className="relative flex cursor-pointer items-center justify-center"
      onClick={onClick}
    >
      <img
        src={
          totalQuantityInCart > 0 ? "/icons/cart-full.svg" : "/icons/cart.svg"
        }
        alt="Cart icon"
        className="h-6 w-6 object-contain hover:opacity-85"
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
  onClick: PropTypes.func.isRequired,
};
