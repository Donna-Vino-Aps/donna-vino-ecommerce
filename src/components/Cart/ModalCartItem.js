import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { QuantitySelector } from "../QuantitySelector/QuantitySelector";
import { useCart } from "@/context/ShoppingCartContext";

const ModalCartItem = ({ item }) => {
  const { items, removeItemFromCart, updateItemQuantity } = useCart();

  return (
    <div className="mb-4 flex items-center justify-between font-barlow">
      <div className="flex items-center">
        <img
          src={item.imageUrl}
          alt={item.variantTitle}
          className="relative top-1 size-20 object-contain"
        />
        <div className="ml-5 mt-1 flex flex-col gap-1">
          <h3 className="text-titleSmall font-medium md:text-titleMedium">
            {item.variantTitle}
          </h3>
          <QuantitySelector
            selectedQuantity={item.quantity}
            setSelectedQuantity={(newQuantity) =>
              updateItemQuantity(item.variantId, newQuantity)
            }
            min={0}
          />
        </div>
      </div>
      <div
        className={`${items.length > 2 ? "relative right-4" : ""} mt-3 flex flex-col justify-center gap-2`}
      >
        <button
          onClick={() => removeItemFromCart(item.variantId)}
          className="flex justify-end"
        >
          <Image
            src="/icons/trash-can.svg"
            width="24"
            height="24"
            alt="trash can icon"
          />
        </button>
        <p className="text-titleMedium font-medium text-tertiary1-dark">
          {(item.quantity * item.price).toFixed(2).replace(".", ",")} kr
        </p>
      </div>
    </div>
  );
};

export default ModalCartItem;

ModalCartItem.propTypes = {
  item: PropTypes.shape({
    variantId: PropTypes.string.isRequired,
    variantTitle: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};
