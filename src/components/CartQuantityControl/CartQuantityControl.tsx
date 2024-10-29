import React, {BaseSyntheticEvent} from 'react';
import {FiMinus} from 'react-icons/fi';
import {BiPlus} from 'react-icons/bi';
import {GoTrash} from 'react-icons/go';

interface CartQuantityControlProps {
  quantity: number;
  onIncrement: (e?: BaseSyntheticEvent) => void;
  onDecrement: (e?: BaseSyntheticEvent) => void;
  onRemove: (e?: BaseSyntheticEvent) => void;
}

const CartQuantityControl = ({quantity, onIncrement, onDecrement, onRemove}: CartQuantityControlProps) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        onClick={onRemove}
        className="px-3 rounded-md py-3 text-red-600 rounded-l hover:text-red-700 bg-white hover:bg-gray-100"
      >
        <GoTrash size={20} />
      </button>
      <div className="flex items-center justify-between">
        <button onClick={onDecrement} className="px-3 py-3 bg-orange-600 text-white rounded-l hover:bg-orange-700">
          <FiMinus />
        </button>
        <span className="px-4 py-2 bg-gray-100 flex-1 text-center text-black">{quantity}</span>
        <button onClick={onIncrement} className="px-3 py-3 bg-orange-600 text-white rounded-r hover:bg-orange-700">
          <BiPlus />
        </button>
      </div>
    </div>
  );
};

export default CartQuantityControl;
