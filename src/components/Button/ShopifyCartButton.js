"use client"; // for Next.js 13+ if you're using app directory
import React from "react";
import { useEffect, useRef } from "react";
let shopifyInitialized = 0;

export default function ShopifyBuyButton() {
  const containerRef = useRef(null);

  useEffect(() => {
    let isScriptLoaded = !!window.ShopifyBuy;

    const loadShopifyScript = () => {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
      script.onload = initShopifyBuy;
      document.head.appendChild(script);
    };

    const initShopifyBuy = () => {
      if (
        shopifyInitialized == 1 ||
        containerRef.current?.childElementCount > 0
      )
        return;
      shopifyInitialized++;

      const client = window.ShopifyBuy.buildClient({
        domain: "0qqxpn-qp.myshopify.com",
        storefrontAccessToken: "74cc29d0ddd9227dd753037748de8685",
      });

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent("product", {
          id: "10153455092058",
          node: containerRef.current,
          moneyFormat: "{{amount_with_comma_separator}} kr",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    maxWidth: "calc(25% - 20px)",
                    marginLeft: "20px",
                    marginBottom: "50px",
                  },
                },
                button: {
                  fontFamily: "Lato, sans-serif",
                  fontWeight: "bold",
                  fontSize: "16px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  backgroundColor: "#5a78ff",
                  ":hover": { backgroundColor: "#516ce6" },
                  ":focus": { backgroundColor: "#516ce6" },
                },
                quantityInput: {
                  fontSize: "16px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                },
              },
              contents: {
                img: false,
                title: false,
                price: false,
              },
              text: {
                button: "Add to cart",
              },
              googleFonts: ["Lato"],
            },
            productSet: {
              styles: {
                products: {
                  "@media (min-width: 601px)": {
                    marginLeft: "-20px",
                  },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    maxWidth: "100%",
                    marginLeft: "0px",
                    marginBottom: "0px",
                  },
                },
                button: {
                  fontFamily: "Lato, sans-serif",
                  fontWeight: "bold",
                  fontSize: "16px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  backgroundColor: "#5a78ff",
                  ":hover": { backgroundColor: "#516ce6" },
                  ":focus": { backgroundColor: "#516ce6" },
                },
                quantityInput: {
                  fontSize: "16px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                },
              },
              googleFonts: ["Lato"],
              text: {
                button: "Add to cart",
              },
            },
            option: {},
            cart: {
              styles: {
                button: {
                  fontFamily: "Lato, sans-serif",
                  fontWeight: "bold",
                  fontSize: "16px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  backgroundColor: "#5a78ff",
                  ":hover": { backgroundColor: "#516ce6" },
                  ":focus": { backgroundColor: "#516ce6" },
                },
              },
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
              googleFonts: ["Lato"],
            },
            toggle: {
              styles: {
                toggle: {
                  fontFamily: "Lato, sans-serif",
                  fontWeight: "bold",
                  backgroundColor: "#5a78ff",
                  ":hover": { backgroundColor: "#516ce6" },
                  ":focus": { backgroundColor: "#516ce6" },
                },
                count: {
                  fontSize: "16px",
                },
              },
              googleFonts: ["Lato"],
            },
          },
        });
      });
    };

    if (isScriptLoaded && window.ShopifyBuy.UI) {
      initShopifyBuy();
    } else {
      loadShopifyScript();
    }
  }, []);

  return <div ref={containerRef} />;
}
