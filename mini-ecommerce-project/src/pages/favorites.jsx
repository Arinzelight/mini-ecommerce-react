/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
// Redux action type for toggling favorites
import { TOGGLE_FAVORITE } from "@/store/actionTypes";

/**
 * FavoritesPage Component
 * -------------------------
 * Displays and manages user's favorite products.
 * Allows sorting by price and removing/viewing individual items.
 */
const FavoritesPage = () => {
  const dispatch = useDispatch();

  // Get favorite products from Redux store
  const favoriteItems = useSelector((state) => state.favorites.items);

  // State to handle sorting
  const [sortOrder, setSortOrder] = useState("default");

  // Handle removing a favorite
  const handleRemove = (product) => {
    dispatch({ type: TOGGLE_FAVORITE, payload: product });
  };

  // Handle sorting logic
  const sortedFavorites = [...favoriteItems].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;

    return 0; // default (no sort)
  });

  return (
    <DefaultLayout>
      <section className="flex flex-col gap-8 py-10 px-4 bg-secondary-blush dark:bg-transparent rounded-md transition-all duration-500 min-h-screen">
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary dark:text-secondary-mint">
            Your Favorites
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl mx-auto">
            All the products you&apos;ve saved in one place.
          </p>
        </div>

        {/* Sort Dropdown */}
        {favoriteItems.length > 0 && (
          <div className="flex justify-end mb-4">
            <select
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm dark:text-white"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Sort by</option>
              <option value="lowToHigh">Price: Low → High</option>
              <option value="highToLow">Price: High → Low</option>
            </select>
          </div>
        )}

        {/* Favorite Products */}
        {sortedFavorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedFavorites.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                  src={product.images?.[0]}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-primary dark:text-secondary-mint">
                    {product.category?.name}
                  </p>
                  <p className="text-primary dark:text-secondary-mint font-bold text-lg">
                    ${product.price}
                  </p>

                  {/* Actions: View + Remove */}
                  <div className="flex justify-between items-center pt-3">
                    <Link
                      className="text-sm text-primary dark:text-secondary-mint font-medium hover:underline"
                      to={`/product/${product.slug}`}
                    >
                      View
                    </Link>
                    <button
                      className="text-sm text-red-600 dark:text-red-400 hover:underline"
                      onClick={() => handleRemove(product)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-20 space-y-4">
            <p className="text-gray-500 dark:text-gray-300 text-lg">
              No favorite products yet.
            </p>
          </div>
        )}
      </section>
    </DefaultLayout>
  );
};

export default FavoritesPage;
