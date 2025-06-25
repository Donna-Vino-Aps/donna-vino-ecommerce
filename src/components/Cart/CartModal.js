import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import ModalCartItem from "./ModalCartItem.js";

const CartModal = ({ onClose, cartItems, setQuantityInCart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="relative right-2 top-40 w-[22.5rem] rounded-b-lg bg-white p-6 shadow-lg md:w-[26.25rem]">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-headlineLarge font-normal">Shopping cart</h2>
          <Image
            onClick={onClose}
            src="/icons/cross-circle.svg"
            width="24"
            height="24"
            alt="closing button"
          />
        </div>
        {cartItems.length > 0 ? (
          <div className="flex flex-col">
            {cartItems.map((item) => (
              <ModalCartItem
                key={item.id}
                item={item}
                setQuantityInCart={setQuantityInCart}
              />
            ))}
          </div>
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
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  setQuantityInCart: PropTypes.func.isRequired,
};
export default CartModal;
