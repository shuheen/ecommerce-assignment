import React from 'react'
import { CategoriesFilterTopProps } from '../../types/categories'


const CategoriesFilterTop = ({categories, selected}:CategoriesFilterTopProps) => {
  return (
    <div className="py-5 flex gap-4 px-4 items-center">
      <span className="cat text-md font-bold">Categories</span>
      <div className="categories-list flex gap-3">
        <button className="rounded-full border border-sky-700 text-gray-600 font-medium px-5 py-2 bg-sky-700 text-white hover:bg-sky-100">
          All
        </button>
        {categories!.map((category) => {
          return (
            <button
              key={category.replace(/ /g, '').toLowerCase()}
              className="rounded-full border border-gray-400 text-gray-600 font-medium px-5 py-2 outline-none hover:bg-sky-100"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesFilterTop