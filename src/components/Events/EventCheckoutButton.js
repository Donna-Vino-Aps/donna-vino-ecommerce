"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { createCheckoutUrl } from "@/lib/shopify/checkout";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/Button/Button";

const EventCheckoutButton = ({
  variantId,
  quantity = 1,
  disabled = false,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { translations } = useLanguage();

  const handleCheckout = () => {
    if (!variantId || disabled) return;

    try {
      setIsLoading(true);
      const checkoutUrl = createCheckoutUrl(variantId, quantity);

      // Open checkout
      window.open(checkoutUrl, "_blank");

      setIsLoading(false);
    } catch (error) {
      console.error("Checkout error:", error);
      if (onError) {
        onError(translations["event.checkout.error"]);
      }
      setIsLoading(false);
    }
  };

  return (
    <Button
      text={translations["event.checkout.button"]}
      variant="greenSubmit"
      onClick={handleCheckout}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      ariaLabel={translations["event.checkout.button"]}
      testId="event-checkout-button"
    />
  );
};

EventCheckoutButton.propTypes = {
  variantId: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  disabled: PropTypes.bool,
  onError: PropTypes.func,
};

export default EventCheckoutButton;
