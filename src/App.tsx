import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './pages/Home/Home';
import ProductList from './pages/ProductList/ProductList';

function App() {

  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/cart' element={<ProductList />} />
        <Route path='*' element={<>404 Not Found. </>} />
      </Routes>
  )
}

export default App
