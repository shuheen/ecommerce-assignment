import React, {useEffect, useState} from 'react';
import {FaCartShopping} from 'react-icons/fa6';
import {Link} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {cartAtom} from '../../state/cartAtom';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import ProductSearch from '../ProductSearch/ProductSearch';
import {LuLogOut} from 'react-icons/lu';
import {motion, useAnimation} from 'framer-motion';
import Button from '../Button/Button';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cart = useRecoilValue(cartAtom);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const controls = useAnimation();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  // Animate the cart icon when the cartCount changes
  useEffect(() => {
    if (cartCount > 0) {
      controls.start({
        scale: [1, 1.5, 1],
        rotate: [0, -30, 30, -30, 30, 0],
        transition: {duration: 0.4},
      });
    }
  }, [cartCount, controls]);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <nav className="border-b border-gray-200 px-4 py-3 lg:px-6">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="font-extrabold text-gray-800 text-xl">
            E-COMMERCE APP
          </Link>

          <div className="flex items-center gap-4">
            {/* Cart and Auth Buttons for Large Screens */}
            <div className="hidden md:flex items-center gap-4">
              <ProductSearch />
              <Link to="/cart" className="p-3 hover:bg-gray-100 rounded-lg relative header-cart">
                <motion.div animate={controls}>
                  <FaCartShopping size={24} className="text-gray-600" />
                </motion.div>
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-xs text-center font-medium">
                  {cartCount}
                </span>
              </Link>
              {isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  className="!text-gray-800 hover:!bg-gray-100 !bg-white font-medium rounded-lg text-sm px-4 py-2 sm:max-w-[20%]"
                >
                  Logout
                </Button>
              ) : (
                <Link
                  to="/login"
                  className="text-white bg-orange-800 hover:bg-orange-600 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Log in
                </Link>
              )}
            </div>

            {/* Mobile View: Cart and Auth Buttons */}
            <div className="flex md:hidden items-center gap-4">
              <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-lg relative header-cart">
                <motion.div animate={controls}>
                  <FaCartShopping size={24} className="text-gray-600" />
                </motion.div>
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-xs text-center font-medium">
                  {cartCount}
                </span>
              </Link>
              {isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  className="!text-gray-800 hover:!bg-gray-100 !bg-white font-medium rounded-lg text-sm px-4 py-2 sm:max-w-[20%]"
                >
                  Logout
                </Button>
              ) : (
                <Link
                  to="/login"
                  className="text-white bg-orange-800 hover:bg-orange-600 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>

          {/* Mobile View: Full-width Search Bar */}
          <div className="w-full md:hidden mt-3">
            <ProductSearch />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
