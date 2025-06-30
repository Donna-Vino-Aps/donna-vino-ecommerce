import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import ModalCartItem from "./ModalCartItem.js";
import Button from "../Button/Button.js";
import { useLanguage } from "@/context/LanguageContext.js";

const CartModal = ({
  onClose,
  cartItems,
  setCartItems,
  setTotalQuantityInCart,
}) => {
  const { translations } = useLanguage();

  // Initialize total price in cart
  const [totalPrice, setTotalPrice] = useState(
    cartItems.reduce(
      (acc, item) => acc + item.price * item.quantitySelected,
      0,
    ),
  );

  // function for updating the total Price
  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantitySelected,
      0,
    );
    setTotalPrice(newTotal);
  }, [cartItems]);

  // function to update the quantity of an item in the cart
  const updateCartItemQuantity = (itemId, delta) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantitySelected: Math.max(1, item.quantitySelected + delta),
          }
        : item,
    );
    setCartItems(updatedItems);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-end">
      <div className="relative right-2 top-40 z-[60] w-[22.5rem] rounded-b-lg bg-white p-6 shadow-lg md:w-[26.25rem]">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="mb-4 text-headlineLarge font-normal">Shopping cart</h2>
          <Image
            onClick={onClose}
            src="/icons/cross-circle.svg"
            width="24"
            height="24"
            alt="closing button"
            className="cursor-pointer"
          />
        </div>
        {cartItems.length > 0 ? (
          <section>
            <div className="flex flex-col">
              {cartItems.map((item) => (
                <div className="my-1" key={item.id}>
                  <ModalCartItem
                    item={item}
                    updateCartItemQuantity={updateCartItemQuantity}
                    setTotalQuantityInCart={setTotalQuantityInCart}
                  />
                </div>
              ))}
            </div>
            <hr className="mt-2 border-t border-tertiary2-darker" />
            <div className="mt-8 flex items-center justify-between">
              <h3 className="text-titleLarge font-normal">Subtotal</h3>
              <h3 className="text-titleLarge font-normal">{totalPrice} kr</h3>
            </div>
            <div className="mt-3 text-labelSmall font-medium text-tertiary2-darker">
              <p>
                Shipping, taxes, & discounts are calculated during checkout.
              </p>
              <p>Pick up and hand delivery options are available.</p>{" "}
              <p>Estimated delivery time will be shown in the next steps.</p>
            </div>
            <Button
              text="Go to Checkout"
              variant="rounded"
              border="primary"
              color="primary"
              size="md"
              width="full"
              extraStyle="font-medium my-5"
              ariaLabel="Go to Checkout Button"
              testId="go-to-checkout-button"
            />
            <Button
              text="Continue Shopping"
              variant="rounded"
              border="secondary"
              color="secondary"
              size="md"
              width="full"
              extraStyle="font-medium"
              ariaLabel="Continue Shopping Button"
              testId="continue-shopping-button"
              onClick={onClose}
            />
            <div className="mb-2 mt-6 flex flex-col items-end gap-4 px-1">
              <p className="text-titleMedium text-tertiary2-darker">
                Secured Payment By
              </p>
              <div className="flex flex-row gap-3">
                <Image
                  src="/icons/mobilepay-logo.svg"
                  width="106"
                  height="21"
                  alt="Visa payment option"
                />
                <Image
                  src="/icons/visa-logo.svg"
                  width="49"
                  height="15"
                  alt="Visa payment option"
                />
                <Image
                  src="/icons/mastercard-logo.svg"
                  width="27"
                  height="16"
                  alt="Mastercard payment option"
                />
              </div>
            </div>
          </section>
        ) : (
          <div>
            <p>No items in your cart. </p>
            <p>Keep shopping and come back when you are ready to checkout!</p>
          </div>
        )}
      </div>
    </div>
  );
};

CartModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantitySelected: PropTypes.number.isRequired,
    }),
  ).isRequired,
  setTotalQuantityInCart: PropTypes.func.isRequired,
  setCartItems: PropTypes.func.isRequired,
  updateCartItemQuantity: PropTypes.func,
};

export default CartModal;
