import {useRecoilState} from 'recoil';
import {cartAtom} from '../../state/cartAtom';
import CartItem from './CartItem/CartItem';
import OrderSummary from './OrderSummary/OrderSummary';
import {Link} from 'react-router-dom';
import {removeFromCart} from '../../utils/products';

const Cart = () => {
  const [cart] = useRecoilState(cartAtom);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 2.0;
  const tax = subtotal * 0.01;
  const total = subtotal + shipping + tax;

  return (
    <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-4">
      {!cart.length ? (
        <div className="h-[calc(100vh-200px)] flex items-center justify-center flex-col">
          <img src="/images/empty-cart.png" alt="cart" width={300} />
          <span className="font-bold text-xl text-gray-700">Your Cart is Empty</span>
          <Link className="bg-orange-700 px-5 py-2 text-white hover:bg-orange-800 mt-5 rounded-md" to="/products">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-gray-800 text-center">Shopping Cart</h1>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              onCheckout={() => console.log('Checkout button clicked')}
              onContinueShopping={() => console.log('Continue Shopping button clicked')}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
