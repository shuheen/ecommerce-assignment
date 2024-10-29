import React, {BaseSyntheticEvent} from 'react';
import {FiMinus} from 'react-icons/fi';
import {BiPlus} from 'react-icons/bi';
import {GoTrash} from 'react-icons/go';
import Button from '../Button/Button';

interface CartQuantityControlProps {
  quantity: number;
  onIncrement: (e?: BaseSyntheticEvent) => void;
  onDecrement: (e?: BaseSyntheticEvent) => void;
  onRemove: (e?: BaseSyntheticEvent) => void;
  className?: string;
}

const CartQuantityControl = ({quantity, onIncrement, onDecrement, onRemove}: CartQuantityControlProps) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <Button
        onClick={onRemove}
        className="px-3 rounded-md py-3 hover:text-red-700 !bg-white hover:!bg-gray-100 flex w-auto !text-red-600"
      >
        <GoTrash size={20} />
      </Button>
      <div className="flex items-center justify-between">
        <Button
          onClick={onDecrement}
          className="px-3 py-3 bg-orange-500 text-white rounded-none rounded-l hover:bg-orange-600"
        >
          <FiMinus />
        </Button>
        <span className="px-4 py-2 bg-gray-100 flex-1 text-center text-black">{quantity}</span>
        <Button
          onClick={onIncrement}
          className="px-3 py-3 bg-orange-500 text-white rounded-none rounded-r hover:bg-orange-600"
        >
          <BiPlus />
        </Button>
      </div>
    </div>
  );
};

export default CartQuantityControl;
