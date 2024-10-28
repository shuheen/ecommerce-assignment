import {Route, Routes} from 'react-router-dom';

import Home from './pages/Home/Home';
import ProductList from './pages/ProductList/ProductList';
import Cart from './pages/Cart/Cart';
import Login from './pages/Authentication/Login/Login';
import Register from './pages/Authentication/Register/Register';
import {ProtectedRoute, UnprotectedRoute} from './routes/Routes'; // Adjust path as necessary

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      <Route element={<UnprotectedRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<>404 Not Found.</>} />
    </Routes>
  );
}

export default App;
