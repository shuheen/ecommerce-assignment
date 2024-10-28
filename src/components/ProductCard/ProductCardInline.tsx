import React from 'react';
import {Product} from '../../types/product';
import {Link} from 'react-router-dom';

const ProductCardInline = ({title, images, id, price}: Product) => {
  return (
    <Link
      to={`/products/${id}`}
      className="flex flex-col gap-3 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-2 mb-1"
    >
      <img
        className="object-contain w-full rounded-t-lg  max-h-12 md:h-auto md:w-12 md:rounded-none md:rounded-s-lg"
        src={images[0]}
        alt={title}
      />
      <div className="flex flex-col justify-between leading-normal">
        <h5 title={title} className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{price}</p>
      </div>
    </Link>
  );
};

export default ProductCardInline;
