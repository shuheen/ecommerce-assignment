import {CartItem} from '../types/cart';
import {showSuccessToast, showWarningToast} from './toastUtils';

const removeOneItem = (prevCart: CartItem[], id: number, title: string) => {
  const updatedCart = prevCart
    .map((item) => (item.id === id ? {...item, quantity: item.quantity - 1} : item))
    .filter((item) => item.quantity > 0) as CartItem[];

  if (updatedCart.length < prevCart.length) {
    // If the length of the updated cart is less than the previous cart,
    // it means an item was removed.
    showWarningToast(`${title} removed from cart!`); // Show success toast
  }

  return updatedCart;
};

const addOneItem = (prevCart: CartItem[], id: number) => {
  return prevCart.map((item) => (item.id === id ? {...item, quantity: item.quantity + 1} : item)) as CartItem[];
};

const addToCart = (
  prevCart: CartItem[],
  id: number,
  images: string[],
  title: string,
  price: number,
  category: string
) => {
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
};

const removeFromCart = (prevCart: CartItem[], id: number, title: string) => {
  const itemToRemove = prevCart.find((item) => item.id === id);
  let updatedCart;
  if (itemToRemove) {
    updatedCart = prevCart
      .map((item) => (item.id === id ? {...item, quantity: 0} : item))
      .filter((item) => item.quantity > 0) as CartItem[];
    showWarningToast(`${title} removed from cart!`);
    //return updated Cart state
    return updatedCart;
  }
  //return Prev Cart state
  return prevCart;
};

export {addOneItem, addToCart, removeOneItem, removeFromCart};
