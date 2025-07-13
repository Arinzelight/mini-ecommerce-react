/* eslint-disable prettier/prettier */

import FavoriteButton from "./FavoriteButton";

// Utility function to generate a slug from a string
const generateSlug = (title) => {
  if (!title) return ''; // Handle empty or null titles

  return title
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with single hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 *  ProductCard component to display product details
 *  - The product object containing details like title, price, and images.
 * - JSX element representing the product card
 * */
export default function ProductCard({ product }) {
  return (
    <div className="bg-white h-[420px] flex flex-col justify-between dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        alt={product.title}
        className="w-full h-48 object-cover"
        src={
          product.images?.[0] ||
          `https://placehold.co/400x300/FDFBF8/07484A?text=No+Image`
        }
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/400x300/FDFBF8/07484A?text=${encodeURIComponent(
            product.title || "Product"
          )}`;
        }}
      />
      <FavoriteButton product={product} />
      {/* Product Details */}
      <div className="p-4 flex flex-col justify-between h-full">
        <h3 className="text-lg font-semibold text-primary dark:text-secondary-mint mb-1">
          {product.title}
        </h3>
        <p className="text-xl font-bold text-green-600 dark:text-green-400">
          ${product.price}
        </p>
        <button className="mt-4 w-full bg-primary text-white py-2 rounded-full font-semibold hover:bg-primary-light transition-colors duration-200">
          <a
            className="block text-center text-white w-full"
            href={`/products/${generateSlug(product.title)}`}
          >
            View Details
          </a>
        </button>
      </div>
    </div>
  );
}
