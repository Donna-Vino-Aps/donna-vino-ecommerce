import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PropTypes from "prop-types";
import { CartProvider, useCart } from "../../context/ShoppingCartContext";
import * as localStorage from "../../utils/localStorage";

jest.mock("../../utils/localStorage", () => ({
  getLocalItem: jest.fn(),
  setLocalItem: jest.fn(),
  LOCAL_KEYS: {
    SHOPPING_CART: "donnaVinoCart",
  },
}));

const TestComponent = ({ onTestAction }) => {
  const { items, addItemToCart, updateItemQuantity, removeItemFromCart } =
    useCart();

  return (
    <div>
      <div data-testid="cart-items-count">{items.length}</div>
      <div data-testid="cart-total-quantity">
        {items.reduce((sum, item) => sum + item.quantity, 0)}
      </div>
      <button
        data-testid="test-action-button"
        onClick={() =>
          onTestAction({
            addItemToCart,
            updateItemQuantity,
            removeItemFromCart,
          })
        }
      >
        Test Action
      </button>
      <ul>
        {items.map((item) => (
          <li key={item.variantId} data-testid={`cart-item-${item.variantId}`}>
            {item.variantTitle} - {item.quantity} x {item.price}
            <button
              data-testid={`remove-${item.variantId}`}
              onClick={() => removeItemFromCart(item.variantId)}
            >
              Remove
            </button>
            <button
              data-testid={`increase-${item.variantId}`}
              onClick={() =>
                updateItemQuantity(item.variantId, item.quantity + 1)
              }
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

TestComponent.propTypes = {
  onTestAction: PropTypes.func.isRequired,
};

describe("ShoppingCartContext", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.getLocalItem.mockReturnValue(null);
  });

  test("should initialize with empty cart when localStorage is empty", () => {
    render(
      <CartProvider>
        <TestComponent onTestAction={() => {}} />
      </CartProvider>,
    );

    expect(screen.getByTestId("cart-items-count").textContent).toBe("0");
    expect(localStorage.getLocalItem).toHaveBeenCalledWith(
      localStorage.LOCAL_KEYS.SHOPPING_CART,
      true,
    );
  });

  test("should initialize cart from localStorage", () => {
    const mockItems = [
      {
        variantId: "123",
        variantTitle: "Test Wine",
        price: 100,
        quantity: 2,
        imageUrl: "/test.jpg",
      },
    ];

    localStorage.getLocalItem.mockReturnValue(mockItems);

    render(
      <CartProvider>
        <TestComponent onTestAction={() => {}} />
      </CartProvider>,
    );

    expect(screen.getByTestId("cart-items-count").textContent).toBe("1");
    expect(localStorage.getLocalItem).toHaveBeenCalledWith(
      localStorage.LOCAL_KEYS.SHOPPING_CART,
      true,
    );
    expect(screen.getByTestId("cart-item-123")).toBeInTheDocument();
  });
});
