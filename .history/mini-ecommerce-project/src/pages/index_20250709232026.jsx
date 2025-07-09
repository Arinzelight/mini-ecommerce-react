/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { button as buttonStyles } from "@heroui/theme";

import DefaultLayout from "@/layouts/default";
import { fetchProducts } from "@/api/products";
import { fetchCategories } from "@/api/categories";
import ProductCard from "@/components/ProductCard";

export default function IndexPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();

      setCategories(data.slice(0, 6));
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts(page);

      setProducts(data);
    };

    loadProducts();
  }, [page]);

  return (
    <DefaultLayout>
      <section className="flex flex-col gap-8 py-10 px-4 bg-secondary-blush dark:bg-primary-d rounded-md transition-all duration-500 min-h-screen">
        {/* Categories */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">
            Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-secondary-peach px-4 py-2 rounded-lg text-sm text-primary"
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              className={buttonStyles({ variant: "bordered", radius: "full" })}
              disabled={page === 0}
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            >
              Previous
            </button>
            <button
              className={buttonStyles({ color: "primary", radius: "full" })}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
