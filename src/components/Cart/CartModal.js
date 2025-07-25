"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import ModalCartItem from "./ModalCartItem.js";
import Button from "../Button/Button.js";
import { useLanguage } from "@/context/LanguageContext.js";
import { useCart } from "@/context/ShoppingCartContext.js";
import { createCartCheckoutUrl } from "@/lib/shopify/checkout.js";
import { logError } from "@/utils/logging.js";

const CartModal = ({ onClose, isOpen }) => {
  const { translations } = useLanguage();
  const { items: cartItems, totalPrice } = useCart();

  const [shouldRender, setShouldRender] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let timeout;

    if (isOpen) {
      setShouldRender(true);
      setAnimate(false);
      requestAnimationFrame(() => {
        setAnimate(true);
      });
    } else {
      setAnimate(false);
      timeout = setTimeout(() => setShouldRender(false), 300);
    }

    return () => clearTimeout(timeout);
  }, [isOpen]);

  const handleCheckout = () => {
    try {
      if (cartItems.length === 0) return;

      const checkoutUrl = createCartCheckoutUrl(cartItems);

      window.open(checkoutUrl, "_blank");
    } catch (error) {
      logError("Checkout error:", error);
    }
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-tertiary1-darker bg-opacity-20 transition-opacity duration-300 ease-in-out ${
          animate ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Wrapper that listens for outside clicks */}
      <div
        className="fixed inset-0 z-50 flex items-start justify-end"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className={`relative top-24 mx-auto w-[22.5rem] transform rounded-b-lg bg-white p-6 shadow-lg transition-all duration-300 ease-in-out md:top-36 md:mx-2 md:w-[26.25rem] ${
            animate
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-4 scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
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
              <div className="max-h-[27vh] flex-1 flex-col overflow-y-auto overscroll-contain md:max-h-[29vh]">
                {cartItems.map((item) => (
                  <div className="my-1" key={item.variantId}>
                    <ModalCartItem item={item} />
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
                    className={`text-titleLarge font-normal ${cartItems.length > 2 ? "relative right-2" : ""}`}
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
                  onClick={handleCheckout}
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
                      className="h-[21px] w-[106px]"
                    />
                    <Image
                      src="/icons/visa-logo.svg"
                      width="49"
                      height="15"
                      alt="Visa payment option"
                      className="h-[15px] w-[49px]"
                    />
                    <Image
                      src="/icons/mastercard-logo.svg"
                      width="27"
                      height="16"
                      alt="Mastercard payment option"
                      className="h-[16px] w-[27px]"
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
    </>
  );
};

CartModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

export default CartModal;
