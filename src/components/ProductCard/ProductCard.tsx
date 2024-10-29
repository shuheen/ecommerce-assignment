import {useRecoilState} from 'recoil';
import {cartAtom} from '../../state/cartAtom';
import {Product} from '../../types/product';
import {CartItem} from '../../types/cart';
import {addOneItem, addToCart, removeFromCart, removeOneItem} from '../../utils/products';
import {GrCart} from 'react-icons/gr';
import {Link} from 'react-router-dom';
import {BaseSyntheticEvent} from 'react';
import CartQuantityControl from './../../components/CartQuantityControl/CartQuantityControl';

const ProductCard = ({id, images, title, price, category, thumbnail}: Product) => {
  const [cart, setCart] = useRecoilState<CartItem[]>(cartAtom);

  const handleAddToCart = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setCart((prevCart) => addToCart(prevCart, id, images, title, price, category));
  };

  const handleIncrement = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setCart((prevCart) => addOneItem(prevCart, id));
  };

  const handleDecrement = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setCart((prevCart) => removeOneItem(prevCart, id, title));
  };

  const handleRemoveFromCart = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setCart((prevCart) => removeFromCart(prevCart, id, title));
  };

  const cartItem = cart.find((item) => item.id === id);

  return (
    <Link
      to={`/products/${id}`}
      key={id}
      className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow"
    >
      <img loading="lazy" src={thumbnail} alt={title} className="w-full h-40 object-contain rounded-md" />
      <h2 title={title} className="mt-2 text-lg font-semibold line-clamp-1">
        {title}
      </h2>
      <p className="text-gray-600">${price}</p>

      {cartItem ? (
        <CartQuantityControl
          quantity={cartItem.quantity}
          onIncrement={(e) => handleIncrement(e!)}
          onDecrement={(e) => handleDecrement(e!)}
          onRemove={(e) => handleRemoveFromCart(e!)}
        />
      ) : (
        <div className="flex justify-between items-center">
          <button
            onClick={(e) => handleAddToCart(e)}
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-70 flex justify-between gap-4 items-center"
          >
            <GrCart /> Add to Cart
          </button>
        </div>
      )}
    </Link>
  );
};

export default ProductCard;
