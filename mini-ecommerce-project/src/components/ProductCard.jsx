/* eslint-disable prettier/prettier */

import FavoriteButton from "./FavoriteButton";

/**
 *  ProductCard component to display product details
 *  - The product object containing details like title, price, and images.
 * - JSX element representing the product card
 * */
export default function ProductCard({ product }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-xl"
          src={product.images?.[0]}
        />
        <FavoriteButton product={product} />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {product.category?.name}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">${product.price}</span>
        </div>
      </div>
    </div>
  );
}
