/* eslint-disable prettier/prettier */
import React from "react";
import ProductDisplay from "./ProductDisplay";

export default function ProductGrid({ products = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductDisplay key={product.id} product={product} />
      ))}
    </div>
  );
}
