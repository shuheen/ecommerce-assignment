import {Fragment} from 'react';
import {useRecoilState} from 'recoil';
import {cartAtom} from '../../state/cartAtom';
import CartItem from './CartItem/CartItem';
import OrderSummary from './OrderSummary/OrderSummary';
import {Link} from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartAtom);

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleProductQuantity = (type: 'inc' | 'dec', id: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? {...item, quantity: type === 'inc' ? item.quantity + 1 : item.quantity - 1} : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 2.0;
  const tax = subtotal * 0.01;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    // Handle checkout logic here
    console.log('Checkout button clicked');
  };

  const handleContinueShopping = () => {
    // Handle continue shopping logic here
    console.log('Continue Shopping button clicked');
  };

  return (
    <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Shopping Cart</h1>

      {!cart.length ? (
        <div className="h-[calc(100vh-200px)] flex items-center justify-center flex-col">
          <img src="/images/empty-cart.png" alt="cart" width={300} />
          <span className="font-bold text-xl text-gray-700">Your Cart is Empty</span>
          <Link className="bg-sky-700 px-5 py-2 text-white hover:bg-sky-800 mt-5 rounded-md" to="/products">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <Fragment key={item.id}>
                <CartItem item={item} onRemove={handleRemoveFromCart} onQuantityChange={handleProductQuantity} />
                {index === cart.length - 1 && <hr className="border-gray-300" />}
              </Fragment>
            ))}
          </div>

          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            onCheckout={handleCheckout}
            onContinueShopping={handleContinueShopping}
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
