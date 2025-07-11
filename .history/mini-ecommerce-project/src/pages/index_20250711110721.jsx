/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { button as buttonStyles } from "@heroui/theme";

import DefaultLayout from "@/layouts/default";
import { fetchCategories, fetchOneProductByCategory } from "@/api/products";
import ProductCard from "@/components/ProductCard";

const CATEGORIES_PER_PAGE = 3;

export default function IndexPage() {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const paginatedCategories = categories.slice(
    page * CATEGORIES_PER_PAGE,
    (page + 1) * CATEGORIES_PER_PAGE
  );

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      setLoading(true);
      const products = await Promise.all(
        paginatedCategories.map(async (cat) => {
          const product = await fetchOneProductByCategory(cat.id);
          return { category: cat, product };
        })
      );
      setCategoryProducts(products);
      setLoading(false);
    };

    if (paginatedCategories.length > 0) {
      loadCategoryProducts();
    }
  }, [paginatedCategories]);

  const hasNext = (page + 1) * CATEGORIES_PER_PAGE < categories.length;

  return (
    <DefaultLayout>
      <section className="flex flex-col gap-8 py-10 px-4 bg-secondary-blush dark:bg-primary-light rounded-md min-h-screen">
        {/* Intro Content */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Explore a Taste of Every Category</h1>
          <p className="text-gray-700 dark:text-gray-200 text-lg">
            Preview one hot-selling item from each category to get inspired. Shop smart.
          </p>
        </div>

        {/* Categories and 1 Product Each */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner color="primary" size="lg" />
          </div>
        ) : (
          <div className="grid gap-10">
            {categoryProducts.map(({ category, product }) => (
              <div key={category.id}>
                <h2 className="text-xl font-semibold text-primary mb-4">{category.name}</h2>
                {product ? (
                  <ProductCard product={product} />
                ) : (
                  <p className="text-gray-600 italic">No product available.</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-10">
          {page > 0 && (
            <button
              className="bg-white dark:bg-gray-900 border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all font-medium"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            >
              ← Previous
            </button>
          )}
          {hasNext && (
            <button
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition-all font-medium"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next →
            </button>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
