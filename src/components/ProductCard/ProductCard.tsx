import React from 'react'
import { Product } from '../../types/product';

const ProductCard = ( { id, image, name, price }: Product ) => {
    
  return (
        <div key={id} className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow">
          <img src={image} alt={name} className="w-full h-40 object-contain rounded-md" />
          <h2 className="mt-2 text-lg font-semibold">{name}</h2>
          <p className="text-gray-600">${price}</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add to Cart</button>
        </div>
  );
}

export default ProductCard