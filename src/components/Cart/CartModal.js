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
  totalQuantityInCart,
  setTotalQuantityInCart,
}) => {
  const { translations } = useLanguage();

  const nrOfCartItems = cartItems.length;

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
    let updatedItems = cartItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantitySelected: Math.max(1, item.quantitySelected + delta),
          }
        : item,
    );
    setCartItems(updatedItems);
  };

  const removeCartItem = (itemId) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);
    if (!itemToRemove) return;

    const newTotalQuantity =
      totalQuantityInCart - itemToRemove.quantitySelected;
    const newTotalPrice =
      totalPrice - itemToRemove.price * itemToRemove.quantitySelected;
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);

    setCartItems(updatedCartItems);
    setTotalQuantityInCart(newTotalQuantity);
    // Update total price after removing an item
    setTotalPrice(newTotalPrice);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-end">
      <div className="relative top-24 z-[60] mx-auto w-[22.5rem] rounded-b-lg bg-white p-6 shadow-lg md:top-36 md:mx-2 md:w-[26.25rem] ">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="mb-2 text-headlineMedium font-normal md:mb-4 md:text-headlineLarge">
            {translations["cart.title"]}
          </h2>
          <Image
            onClick={onClose}
            src="/icons/cross-circle.svg"
            width="24"
            height="24"
            alt="closing button"
            className="relative bottom-1 right-1 cursor-pointer"
          />
        </div>
        {cartItems.length > 0 ? (
          <section>
            <div className="max-h-[32vh] flex-1 flex-col overflow-y-auto overscroll-contain md:max-h-[35vh]">
              {cartItems.map((item) => (
                <div className="my-1" key={item.id}>
                  <ModalCartItem
                    item={item}
                    nrOfCartItems={nrOfCartItems}
                    updateCartItemQuantity={updateCartItemQuantity}
                    removeCartItem={removeCartItem}
                    setTotalQuantityInCart={setTotalQuantityInCart}
                  />
                </div>
              ))}
            </div>
            <div className="bottom-0">
              <hr className="mt-1 border-t border-tertiary2-darker" />
              <div className="mt-3 flex items-center justify-between md:mt-6">
                <h3 className="text-titleLarge font-normal">
                  {translations["cart.subtotal"]}
                </h3>
                <h3
                  className={`text-titleLarge font-normal ${nrOfCartItems > 2 ? "relative right-2" : ""}`}
                >
                  {totalPrice.toFixed(2).replace(".", ",")} kr
                </h3>
              </div>
              <div className="mt-3 text-labelSmall font-medium text-tertiary2-darker">
                <p>{translations["cart.info1"]}</p>
                <p>{translations["cart.info2"]}</p>{" "}
                <p>{translations["cart.info3"]}</p>
              </div>
              <Button
                text={translations["cart.button-checkout"]}
                variant="rounded"
                border="primary"
                color="primary"
                size="md"
                width="full"
                extraStyle="font-medium my-4 md:my-5"
                ariaLabel="Go to Checkout Button"
                testId="go-to-checkout-button"
              />
              <Button
                text={translations["cart.button-continue-shopping"]}
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
              <div className="mb-1 mt-4 flex flex-col items-end gap-4 px-1 md:mb-2 md:mt-5">
                <p className="text-titleMedium font-medium text-tertiary2-darker">
                  {translations["cart.payment"]}
                </p>
                <div className="flex flex-row gap-3">
                  <Image
                    src="/icons/mobilepay-logo.svg"
                    width="106"
                    height="21"
                    alt="MobilePay payment option"
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
            </div>
          </section>
        ) : (
          <div className="mb-2 mt-6">
            <p>{translations["cart.no-items1"]}</p>
            <br />
            <p>{translations["cart.no-items2"]}</p>
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
  totalQuantityInCart: PropTypes.number.isRequired,
  setTotalQuantityInCart: PropTypes.func.isRequired,
  setCartItems: PropTypes.func.isRequired,
  updateCartItemQuantity: PropTypes.func,
};

export default CartModal;
