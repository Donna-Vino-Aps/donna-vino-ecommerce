import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { QuantitySelector } from "../QuantitySelector/QuantitySelector";

const ModalCartItem = ({
  item,
  removeCartItem,
  setTotalQuantityInCart,
  updateCartItemQuantity,
  nrOfCartItems,
}) => {
  const [selectedQuantity, setSelectedQuantity] = React.useState(
    item.quantitySelected,
  );

  return (
    <div className="mb-4 flex items-center justify-between font-barlow">
      <div className="flex items-center">
        <img
          src={item.image}
          alt={item.name}
          className="relative top-1 h-20 w-20 object-cover"
        />
        <div className="ml-5 mt-1 flex flex-col gap-1">
          <h3 className="text-titleSmall font-medium md:text-titleMedium">
            {item.name}
          </h3>
          <QuantitySelector
            item={item}
            quantityAvailable={item.quantityAvailable}
            selectedQuantity={selectedQuantity}
            setSelectedQuantity={setSelectedQuantity}
            setTotalQuantityInCart={setTotalQuantityInCart}
            updateCartItemQuantity={updateCartItemQuantity}
            preSale={item.preSale}
          />
        </div>
      </div>
      <div
        className={`${nrOfCartItems > 2 ? "relative right-4" : ""} mt-3 flex flex-col justify-center gap-2`}
      >
        <button
          onClick={() => removeCartItem(item.id)}
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
          {item.quantitySelected * item.price.toFixed(2)} kr
        </p>
      </div>
    </div>
  );
};

export default ModalCartItem;

ModalCartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantityAvailable: PropTypes.number.isRequired,
    quantitySelected: PropTypes.number.isRequired,
    preSale: PropTypes.bool,
  }).isRequired,
  removeCartItem: PropTypes.func.isRequired,
  setTotalQuantityInCart: PropTypes.func.isRequired,
  updateCartItemQuantity: PropTypes.func.isRequired,
  nrOfCartItems: PropTypes.number.isRequired,
};
