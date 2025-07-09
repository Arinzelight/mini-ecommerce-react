/* eslint-disable prettier/prettier */
import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <button
          className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-full p-2 shadow hover:scale-105 transition-transform"
          title="Add to favorites"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 8.25c0-3.728-3.022-6.75-6.75-6.75a6.749 6.749 0 00-5.625 3.037A6.75 6.75 0 002.25 8.25c0 7.219 9.75 12.75 9.75 12.75s9.75-5.531 9.75-12.75z"
            />
          </svg>
        </button>
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
