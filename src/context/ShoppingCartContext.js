"use client";

import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  removeItemFromCart: () => {},
});

const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItem = action.payload;
      const updatedItems = [...state.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (item) => item.variantId === newItem.variantId,
      );

      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + newItem.quantity,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push(newItem);
      }
      return {
        ...state,
        items: updatedItems,
      };
    }
    case "UPDATE_ITEM_QUANTITY": {
      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.variantId === action.payload.variantId,
      );
      if (updatedItemIndex !== -1) {
        updatedItems[updatedItemIndex].quantity = action.payload.quantity;
      }
      return {
        ...state,
        items: updatedItems,
      };
    }
    case "REMOVE_ITEM": {
      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.variantId === action.payload.variantId,
      );
      if (updatedItemIndex !== -1) {
        updatedItems.splice(updatedItemIndex, 1);
      }
      return {
        ...state,
        items: updatedItems,
      };
    }
    default:
      return state;
  }
};

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
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
