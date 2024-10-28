interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

const OrderSummary = ({subtotal, shipping, tax, total, onCheckout, onContinueShopping}: OrderSummaryProps) => {
  return (
    <div className="bg-gray-100 rounded-md p-4 h-max">
      <h3 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">Order Summary</h3>

      <form className="mt-6">
        <div>
          <h3 className="text-base font-semibold mb-4">Enter Details</h3>
          <div className="space-y-3"></div>
        </div>
      </form>

      <ul className="text-gray-800 mt-6 space-y-3">
        <li className="flex justify-between text-sm">
          Subtotal <span className="font-bold">${subtotal.toFixed(2)}</span>
        </li>
        <li className="flex justify-between text-sm">
          Shipping <span className="font-bold">${shipping.toFixed(2)}</span>
        </li>
        <li className="flex justify-between text-sm">
          Tax <span className="font-bold">${tax.toFixed(2)}</span>
        </li>
        <hr className="border-gray-300" />
        <li className="flex justify-between text-sm font-bold">
          Total <span>${total.toFixed(2)}</span>
        </li>
      </ul>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={onCheckout}
          className="text-sm w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md py-2.5"
        >
          Checkout
        </button>
        <button
          type="button"
          onClick={onContinueShopping}
          className="text-sm w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md py-2.5"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
