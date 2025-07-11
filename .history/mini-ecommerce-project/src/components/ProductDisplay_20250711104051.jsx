/* eslint-disable prettier/prettier */

export default function ProductDisplay({ product }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
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
      <Button
        isIconOnly
        aria-label="Like"
        className="absolute top-3 right-3  dark:bg-gray-800 rounded-full p-2 shadow hover:scale-105 transition-transform"
        color="danger"
      >
        <HeartIcon />
      </Button>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-1">
          {product.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-xl font-bold text-green-600 dark:text-green-400">
          ${product.price}
        </p>
        <button className="mt-4 w-full bg-primary text-white py-2 rounded-full font-semibold hover:bg-primary-light transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );
}
