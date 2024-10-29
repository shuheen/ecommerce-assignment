import React from 'react';
import Reviews from '../Reviews/Reviews';
import {useRecoilState} from 'recoil';
import {cartAtom} from '../../../state/cartAtom';
import {CartItem} from '../../../types/cart';
import {addOneItem, addToCart, removeFromCart, removeOneItem} from '../../../utils/products';
import {Product} from '../../../types/product';
import CartQuantityControl from './../../../components/CartQuantityControl/CartQuantityControl';
import Button from '../../../components/Button/Button';

interface ProductPriceProps {
  price: number;
  discountPercentage?: number;
}

const ProductPrice = ({price, discountPercentage}: ProductPriceProps) => (
  <div className="flex flex-wrap gap-4 mt-4">
    <p className="text-gray-800 text-xl font-bold">${price}</p>
    {discountPercentage && (
      <p className="text-gray-400 text-xl">
        <span className="line-through">${(price * (1 + discountPercentage / 100)).toFixed(2)}</span>
        <span className="text-sm ml-1">Tax included</span>
      </p>
    )}
  </div>
);

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({description}: ProductDescriptionProps) => (
  <div className="mt-8">
    <h3 className="text-xl font-bold text-gray-800">About the product</h3>
    <p className="mt-4 text-sm text-gray-800">{description}</p>
  </div>
);

const ProductInfo = ({id, images, title, price, category, discountPercentage, description, thumbnail}: Product) => {
  const [cart, setCart] = useRecoilState<CartItem[]>(cartAtom);

  const handleAddToCart = () => {
    setCart((prevCart) => addToCart(prevCart, id, images, title, price, category, thumbnail));
  };

  const handleIncrement = () => {
    setCart((prevCart) => addOneItem(prevCart, id));
  };

  const handleDecrement = () => {
    setCart((prevCart) => removeOneItem(prevCart, id, title));
  };

  const handleRemoveFromCart = () => {
    setCart((prevCart) => removeFromCart(prevCart, id, title));
  };

  const cartItem = cart.find((item) => item.id === id);

  return (
    <div className="lg:col-span-3">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <ProductPrice price={price} discountPercentage={discountPercentage} />
      <ProductDescription description={description!} />
      {cartItem ? (
        <CartQuantityControl
          quantity={cartItem.quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onRemove={handleRemoveFromCart}
        />
      ) : (
        <Button
          onClick={handleAddToCart}
          type="button"
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-md mt-6 w-[20%]"
        >
          Add to cart
        </Button>
      )}
      <Reviews />
    </div>
  );
};

export default ProductInfo;
