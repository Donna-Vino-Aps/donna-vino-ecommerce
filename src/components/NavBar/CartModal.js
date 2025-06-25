import React from "react";
import PropTypes from "prop-types";

const CartModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50">
      <div className="w-96 bg-white p-6 shadow-lg">
        <button onClick={onClose} className="mb-4 block ml-auto text-gray-500">
          ✖
        </button>
        <h2 className="text-lg font-bold">Your Shopping Cart</h2>
        <p>Items go here...</p>
      </div>
    </div>
  );
};
CartModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default CartModal;
