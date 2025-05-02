// components/ShopifyBuyButton.js
"use client"; // Only if you're in an app directory in Next.js 13+

import React from "react";
import { useEffect, useRef } from "react";

const ShopifyBuyButton = () => {
  const buyButtonRef = useRef(null);

  useEffect(() => {
    const scriptURL =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

    const loadScript = () => {
      const script = document.createElement("script");
      script.async = true;
      script.src = scriptURL;
      document.head.appendChild(script);
      script.onload = ShopifyBuyInit;
    };

    const ShopifyBuyInit = () => {
      if (!window.ShopifyBuy) return;
      if (window.ShopifyBuy.UI) {
        const client = window.ShopifyBuy.buildClient({
          domain: "0qqxpn-qp.myshopify.com",
          storefrontAccessToken: "74cc29d0ddd9227dd753037748de8685",
        });

        window.ShopifyBuy.UI.onReady(client).then((ui) => {
          ui.createComponent("product", {
            id: "10153455092058",
            node: buyButtonRef.current,
            moneyFormat: "%7B%7Bamount_with_comma_separator%7D%7D%20kr",
            options: {
              product: {
                styles: {
                  product: {
                    "@media (min-width: 601px)": {
                      "max-width": "calc(25% - 20px)",
                      "margin-left": "20px",
                      "margin-bottom": "50px",
                    },
                  },
                  button: {
                    "font-family": "Lato, sans-serif",
                    "font-weight": "bold",
                    "font-size": "16px",
                    "padding-top": "16px",
                    "padding-bottom": "16px",
                    ":hover": {
                      "background-color": "#516ce6",
                    },
                    "background-color": "#5a78ff",
                    ":focus": {
                      "background-color": "#516ce6",
                    },
                  },
                  quantityInput: {
                    "font-size": "16px",
                    "padding-top": "16px",
                    "padding-bottom": "16px",
                  },
                },
                buttonDestination: "checkout",
                contents: {
                  img: false,
                  title: false,
                  price: false,
                },
                text: {
                  button: "Checkout",
                },
                googleFonts: ["Lato"],
              },
              // Include other options like cart, modalProduct, toggle if needed
            },
          });
        });
      }
    };

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }
  }, []);

  return <div ref={buyButtonRef} />;
};

export default ShopifyBuyButton;
