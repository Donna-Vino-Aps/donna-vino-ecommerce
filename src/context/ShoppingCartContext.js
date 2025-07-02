"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { getLocalItem, setLocalItem, LOCAL_KEYS } from "@/utils/localStorage";
import { logError } from "@/utils/logging";

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
      const existingItem = state.items.find(
        (item) => item.variantId === newItem.variantId,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.variantId === newItem.variantId
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, newItem],
      };
    }

    case "UPDATE_ITEM_QUANTITY": {
      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.variantId === action.payload.variantId,
      );
      if (updatedItemIndex !== -1) {
        updatedItems[updatedItemIndex].quantity = action.payload.newQuantity;
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

const loadCartFromLocalStorage = () => {
  try {
    const savedItems = getLocalItem(LOCAL_KEYS.SHOPPING_CART, true);
    return { items: savedItems || [] };
  } catch (error) {
    logError("Error loading cart from localStorage:", error);
    return { items: [] };
  }
};

export const CartProvider = ({ children }) => {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    null,
    loadCartFromLocalStorage,
  );

  useEffect(() => {
    setLocalItem(LOCAL_KEYS.SHOPPING_CART, shoppingCartState.items);
  }, [shoppingCartState.items]);

  function handleAddItemToCart(item) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  }

  function handleUpdateItemQuantity(variantId, newQuantity) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM_QUANTITY",
      payload: { variantId, newQuantity },
    });
  }

  function handleRemoveItemFromCart(variantId) {
    shoppingCartDispatch({
      type: "REMOVE_ITEM",
      payload: { variantId },
    });
  }

  const contextValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateItemQuantity,
    removeItemFromCart: handleRemoveItemFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
