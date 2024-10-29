import {useRecoilState} from 'recoil';
import {cartAtom} from '../../state/cartAtom';
import {Product} from '../../types/product';
import {CartItem} from '../../types/cart';
import {addOneItem, addToCart, removeFromCart, removeOneItem} from '../../utils/products';
import {GrCart} from 'react-icons/gr';
import {BaseSyntheticEvent, useCallback, useEffect, useState} from 'react';
import CartQuantityControl from './../../components/CartQuantityControl/CartQuantityControl';
import MotionLink from '../MotionLink/MotionLink';
import {motion, useAnimation} from 'framer-motion';
import Button from '../Button/Button';

const ProductCard = ({id, images, title, price, category, thumbnail}: Product) => {
  const [cart, setCart] = useRecoilState<CartItem[]>(cartAtom);
  const [isAdded, setIsAdded] = useState(false);
  const buttonControls = useAnimation();

  const handleAddToCart = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    setIsAdded(true);

    // Animate button
    await buttonControls.start({opacity: 0, x: 50, transition: {duration: 0.2}}); // Flyaway effect

    // Add item to cart
    setCart((prevCart) => addToCart(prevCart, id, images, title, price, category));

    // Final fade-out and reset after animation completes
    setTimeout(() => {
      buttonControls.start({opacity: 1, x: 0});
      setIsAdded(false);
    }, 700); // Adjust timing as needed
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
    <MotionLink
      key={id}
      initial={{opacity: 0, y: 30}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: 30}}
      transition={{duration: 0.1}}
      to={`/products/${id}`}
      className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-all cursor-pointer relative"
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
          <motion.span initial={{opacity: 1}} animate={buttonControls} transition={{duration: 0.2}}>
            <Button className="flex items-center gap-3 mt-4" onClick={(e) => handleAddToCart(e!)}>
              <GrCart /> Add to Cart
            </Button>
          </motion.span>
        </div>
      )}
    </MotionLink>
  );
};

export default ProductCard;
