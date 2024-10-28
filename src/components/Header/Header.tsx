import React, {useEffect, useState} from 'react';
import {FaCartShopping} from 'react-icons/fa6';
import {Link} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {cartAtom} from '../../state/cartAtom';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import AutoComplete from '../AutoComplete/AutoComplete';
import ProductSearch from '../ProductSearch/ProductSearch';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cart = useRecoilValue(cartAtom);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <header className="fixed top-0 left-0 w-full">
      <nav className="bg-white border-b w-full border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-80">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4">
          <Link to="/" className="font-extrabold text-gray-800 text-3xl text-center">
            ECOMMERCE APP
          </Link>

          <div className="flex items-center lg:order-2 gap-4">
            <ProductSearch />
            <Link to="/cart" className="p-2 hover:bg-gray-300 rounded-lg relative">
              <FaCartShopping size={24} className="text-gray-600" />
              <span className="absolute top-0 right-0 w-[20px] h-[20px] bg-red-500 text-white p-1 py-[2px] rounded-full text-xs text-center font-medium">
                {cartCount}
              </span>
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-gray-800 hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2 mr-2"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-white bg-sky-800 hover:bg-sky-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
