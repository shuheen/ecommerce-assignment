import React from 'react';
import ProductCardLoader from '../ProductCardLoader';

const ProductListPageLoader = () => {
  return (
    <div className="h-screen max-w-screen-xl mx-auto pt-1 flex flex-col justify-start items-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-1 py-1 w-full">
        <ProductCardLoader />
        <ProductCardLoader />
        <ProductCardLoader />
        <ProductCardLoader />
        <ProductCardLoader />
        <ProductCardLoader />
        <ProductCardLoader />
        <ProductCardLoader />
        <ProductCardLoader />
        <ProductCardLoader />
      </div>
    </div>
  );
};

export default ProductListPageLoader;
