/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";

import DefaultLayout from "@/layouts/default";
import { fetchCategories } from "@/api/categories";
import { fetchProductsByCategory } from "@/api/products";
import ProductCard from "@/components/ProductCard";

const CATEGORIES_PER_PAGE = 3;

export default function IndexPage() {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const allCategories = await fetchCategories();

      const paginated = allCategories.slice(
        page * CATEGORIES_PER_PAGE,
        (page + 1) * CATEGORIES_PER_PAGE
      );
      setCategories(paginated);
      setHasMore((page + 1) * CATEGORIES_PER_PAGE < allCategories.length);

      const productFetches = await Promise.all(
        paginated.map((cat) => fetchProductsByCategory(cat.id, 0, 1))
      );
      const products = productFetches.map((list) => list[0]).filter(Boolean);
      setCategoryProducts(products);
      setLoading(false);
    };

    loadData();
  }, [page]);

  return (
    <DefaultLayout>
      <section className="flex flex-col gap-8 py-10 px-4 bg-secondary-blush dark:bg-primary-light rounded-md transition-all duration-500 min-h-screen">
        {/* Rich Intro Content */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">
            Welcome to Our Exclusive Store
          </h1>
          <p className="text-gray-700 dark:text-gray-200 text-lg">
            Explore handpicked products crafted to meet your needs. From trendy
            items to timeless essentials, discover quality that speaks for
            itself.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Shop with ease. Shop with confidence.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">
            Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-secondary-peach px-4 py-2 rounded-lg text-sm text-primary shadow-sm"
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>

        {/* Sample Products */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">
            Sample Products
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Spinner color="primary" size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Stylish Pagination */}
          {!loading && (
            <div className="flex justify-center gap-4 mt-10">
              {page > 0 && (
                <button
                  className="bg-white dark:bg-gray-900 border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all font-medium"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                >
                  ← Previous
                </button>
              )}
              {hasMore && (
                <button
                  className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition-all font-medium"
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next →
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
