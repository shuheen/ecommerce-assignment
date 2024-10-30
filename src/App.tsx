// App.tsx
import {Route, Routes, useLocation} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';

import withPageTransition from './hoc/withPageTransition'; // Import HOC
import ProductList from './pages/ProductList/ProductList';
import Cart from './pages/Cart/Cart';
import Login from './pages/Authentication/Login/Login';
import Register from './pages/Authentication/Register/Register';
import {ProtectedRoute, UnprotectedRoute} from './routes/Routes';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import ProtectedPage from './pages/ProtectedPage/ProtectedPage';

const AnimatedProductList = withPageTransition(ProductList);
const AnimatedCart = withPageTransition(Cart);
const AnimatedLogin = withPageTransition(Login);
const AnimatedRegister = withPageTransition(Register);
const AnimatedProductDetails = withPageTransition(ProductDetails);
const AnimatedProtectedPage = withPageTransition(ProtectedPage);

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<ProtectedRoute />}>
          {/* This is just to test the Protected Route */}
          <Route path="/protected" element={<AnimatedProtectedPage />} />
        </Route>

        <Route element={<UnprotectedRoute />}>
          <Route path="/" element={<AnimatedProductList />} />
          <Route path="/products" element={<AnimatedProductList />} />
          <Route path="/products/:id" element={<AnimatedProductDetails />} />
          <Route path="/cart" element={<AnimatedCart />} />
          <Route path="/login" element={<AnimatedLogin />} />
          <Route path="/register" element={<AnimatedRegister />} />
        </Route>

        <Route path="*" element={<>404 Not Found.</>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
