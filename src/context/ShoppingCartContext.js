"use client";

import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import { logInfo } from "@/utils/logging";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] },
  );

  function handleAddItemToCart(item) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  }

  const contextValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
