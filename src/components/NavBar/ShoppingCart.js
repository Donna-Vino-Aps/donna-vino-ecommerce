"use client";

import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCart } from "@/context/ShoppingCartContext";

const ShoppingCart = ({ onClick }) => {
  const { items } = useCart();
  const [isClient, setIsClient] = useState(false);

  // Only show dynamic content after client-side hydration is complete
  useEffect(() => {
    setIsClient(true);
  }, []);

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
          isClient && totalQuantityInCart > 0
            ? "/icons/cart-full.svg"
            : "/icons/cart.svg"
        }
        alt="Cart icon"
        className="h-6 w-6 object-contain hover:opacity-85"
      />
      <span
        className={`relative -top-5 right-0 flex items-center justify-center rounded-full ${isClient && totalQuantityInCart > 0 ? "bg-primary-normal" : "bg-tertiary1-dark"} h-4 w-4 px-1 text-labelSmall text-tertiary2-light`}
      >
        {isClient ? totalQuantityInCart || 0 : 0}
      </span>
    </div>
  );
};

export default ShoppingCart;

ShoppingCart.propTypes = {
  onClick: PropTypes.func.isRequired,
};
