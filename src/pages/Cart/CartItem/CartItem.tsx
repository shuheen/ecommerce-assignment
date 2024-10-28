import {BsTrash} from 'react-icons/bs';
import {FiMinus} from 'react-icons/fi';
import {BiPlus} from 'react-icons/bi';
import {CartItem as CartItemType} from '../../../types/cart';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
  onQuantityChange: (type: 'inc' | 'dec', id: number) => void;
}

const CartItem = ({item, onRemove, onQuantityChange}: CartItemProps) => {
  return (
    <div className="grid grid-cols-3 items-start gap-4">
      <div className="col-span-2 flex items-start gap-4">
        <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
          <img src={item.images[0]} alt={item.title} className="w-full h-full object-contain" />
        </div>

        <div className="flex flex-col">
          <h3 className="text-base font-bold text-gray-800">{item.title}</h3>

          <button
            type="button"
            className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0"
            onClick={() => onRemove(item.id)}
          >
            <BsTrash />
            REMOVE
          </button>
        </div>
      </div>

      <div className="ml-auto">
        <h4 className="text-lg max-sm:text-base font-bold text-gray-800">${item.price}</h4>

        <div className="mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
          <FiMinus className="cursor-pointer" onClick={() => onQuantityChange('dec', item.id)} />
          <span className="mx-3 font-bold">{item.quantity}</span>
          <BiPlus className="cursor-pointer" onClick={() => onQuantityChange('inc', item.id)} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
