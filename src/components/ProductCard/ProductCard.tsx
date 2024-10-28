import {useRecoilState} from 'recoil';
import {cartAtom} from '../../state/cartAtom';
import {Product} from '../../types/product';
import {CartItem} from '../../types/cart';
import {BiPlus} from 'react-icons/bi';
import {FiMinus} from 'react-icons/fi';
import {showSuccessToast, showWarningToast} from '../../utils/toastUtils'; // Adjust the import path

const ProductCard = ({id, images, title, price, category}: Product) => {
  const [cart, setCart] = useRecoilState(cartAtom);

  const handleAddToCart = () => {
    setCart((prevCart: CartItem[]) => {
      const existingItem = prevCart.find((item) => item.id === id);

      if (existingItem) {
        // Increment the quantity if the item already exists in the cart
        return prevCart.map((item) => (item.id === id ? {...item, quantity: item.quantity + 1} : item)) as CartItem[];
      } else {
        // Add a new item to the cart
        const newItem: CartItem = {id, images, title, price, category, quantity: 1};
        showSuccessToast(`${title} added to cart!`); // Show success toast
        return [...prevCart, newItem];
      }
    });
  };

  const handleIncrement = () => {
    setCart(
      (prevCart: CartItem[]) =>
        prevCart.map((item) => (item.id === id ? {...item, quantity: item.quantity + 1} : item)) as CartItem[]
    );
  };

  const handleDecrement = () => {
    setCart((prevCart: CartItem[]) => {
      const updatedCart = prevCart
        .map((item) => (item.id === id ? {...item, quantity: item.quantity - 1} : item))
        .filter((item) => item.quantity > 0) as CartItem[];

      if (updatedCart.length < prevCart.length) {
        // If the length of the updated cart is less than the previous cart,
        // it means an item was removed.
        showWarningToast(`${title} removed from cart!`); // Show success toast
      }

      return updatedCart;
    });
  };

  const cartItem = cart.find((item: CartItem) => item.id === id);

  return (
    <div key={id} className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow">
      <img loading="lazy" src={images[0]} alt={title} className="w-full h-40 object-contain rounded-md" />
      <h2 title={title} className="mt-2 text-lg font-semibold line-clamp-1">
        {title}
      </h2>
      <p className="text-gray-600">${price}</p>
      {cartItem ? (
        <div className="mt-4 flex items-center justify-between">
          <button onClick={handleDecrement} className="px-3 py-3 bg-sky-600 text-white rounded-l hover:bg-sky-700">
            <FiMinus />
          </button>
          <span className="px-4 py-2 bg-gray-100 flex-1 text-center text-black">{cartItem.quantity}</span>
          <button onClick={handleIncrement} className="px-3 py-3 bg-sky-600 text-white rounded-r hover:bg-sky-700">
            <BiPlus />
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
