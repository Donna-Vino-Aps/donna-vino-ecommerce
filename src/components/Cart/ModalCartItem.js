import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const ModalCartItem = ({ item, onRemove, setQuantityInCart }) => {
  const [selectedQuantity, setSelectedQuantity] = React.useState(item.quantity);
  const min = 1;
  const max = 999;

  const handleIncrement = () => {
    if (selectedQuantity < max) {
      setSelectedQuantity(selectedQuantity + 1);
      setQuantityInCart((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    // Ensure quantity does not go below the minimum
    if (selectedQuantity > min) {
      setSelectedQuantity(selectedQuantity - 1);
      setQuantityInCart((prev) => prev - 1);
    }
  };

  return (
    <div className="mb-4 flex items-center justify-between font-barlow">
      <div className="flex items-center">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 object-cover"
        />
        <div className="ml-4 mt-1 flex flex-col gap-1">
          <h3 className="text-titleMedium font-medium">{item.name}</h3>
          <div className="grid h-9 w-[7.125rem] grid-cols-[28%_44%_28%] rounded-md border border-solid border-tertiary1-light">
            <button
              onClick={handleDecrement}
              disabled={selectedQuantity <= 1}
              className="flex items-center justify-center border-r border-tertiary1-light disabled:opacity-50"
            >
              <Image
                src="/icons/minus.svg"
                width="12"
                height="12"
                alt="Decrease"
              />
            </button>

            <span className="flex items-center justify-center border-x border-tertiary1-light px-4 text-center text-titleMedium font-semibold">
              {selectedQuantity}
            </span>

            <button
              onClick={handleIncrement}
              disabled={selectedQuantity >= max}
              className="flex items-center justify-center border-l border-tertiary1-light disabled:opacity-50"
            >
              <Image
                src="/icons/plus.svg"
                width="12"
                height="12"
                alt="Increase"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="ml-2 mt-1 flex flex-col justify-center gap-1">
        <button onClick={() => onRemove(item.id)} className="flex justify-end">
          <Image
            src="/icons/trash-can.svg"
            width="24"
            height="24"
            alt="trash can icon"
          />
        </button>
        <p className="text-titleMedium font-medium text-tertiary1-dark">
          ${item.price.toFixed(2)}
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
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  setQuantityInCart: PropTypes.func.isRequired,
};
