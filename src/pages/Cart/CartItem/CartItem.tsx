import {motion, useAnimation} from 'framer-motion';
import {CartItem as CartItemType} from '../../../types/cart';
import CartQuantityControl from '../../../components/CartQuantityControl/CartQuantityControl';
import {useRecoilState} from 'recoil';
import {cartAtom} from '../../../state/cartAtom';
import {addOneItem, removeFromCart, removeOneItem} from '../../../utils/products';
import {useEffect} from 'react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({item}: CartItemProps) => {
  const [cart, setCart] = useRecoilState<CartItemType[]>(cartAtom);
  const {id, title} = item;
  const control = useAnimation();

  const handleIncrement = () => {
    setCart((prevCart) => addOneItem(prevCart, id));
  };

  const handleDecrement = () => {
    setCart((prevCart) => removeOneItem(prevCart, id, title));
  };

  const handleRemoveFromCart = async () => {
    await control.start({opacity: 0, x: -150, transition: {duration: 0.2}});

    setCart((prevCart) => removeFromCart(prevCart, id, title));
  };

  const storeCartItem = cart.find((item) => item.id === id);

  useEffect(() => {
    control.start({opacity: 1, x: 0, transition: {duration: 0.4}});
  }, []);
  return (
    <motion.div
      initial={{opacity: 0, x: -50}} // Start slightly above and transparent
      animate={control} // Animate to original position and full opacity
      className="grid grid-cols-3 items-start gap-4"
      key={item.id}
    >
      <div className="col-span-2 flex items-start gap-4">
        <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
        </div>

        <div className="flex flex-col items-start">
          <h3 className="text-base font-bold text-gray-800">{item.title}</h3>
          <CartQuantityControl
            quantity={storeCartItem!.quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemoveFromCart}
          />
        </div>
      </div>

      <div className="ml-auto">
        <h4 className="text-lg max-sm:text-base font-bold text-gray-800">${item.price}</h4>
      </div>
    </motion.div>
  );
};

export default CartItem;
