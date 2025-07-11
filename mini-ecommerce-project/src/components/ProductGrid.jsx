/* eslint-disable prettier/prettier */
import ProductDisplay from "./ProductDisplay";

// ProductGrid component to display a grid of products
// Accepts an array of products and maps them to ProductDisplay components
export default function ProductGrid({ products = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductDisplay key={product.id} product={product} />
      ))}
    </div>
  );
}
