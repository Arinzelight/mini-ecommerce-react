import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { button as buttonStyles } from "@heroui/theme";
import { SearchIcon } from "@/components/icons";

import DefaultLayout from "@/layouts/default";
import { fetchProducts } from "@/api/products";
import { fetchCategories } from "@/api/categories";
import ProductCard from "@/components/ProductCard";

const PRODUCTS_PER_PAGE = 10;

export default function IndexPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data.slice(0, 6));
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts(page, PRODUCTS_PER_PAGE, searchTerm);
      setProducts(data);
      setHasMore(data.length === PRODUCTS_PER_PAGE);
      setLoading(false);
    };

    loadProducts();
  }, [page, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0); // Reset to first page when searching
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col gap-8 py-10 px-4 bg-secondary-blush dark:bg-primary-light rounded-md transition-all duration-500 min-h-screen">
        {/* Categories */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">Categories</h2>
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

        {/* Search Input */}
        <div className="max-w-md w-full mx-auto">
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-3 text-base text-gray-400 pointer-events-none" />
            <input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-lavender dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Products */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">Products</h2>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Spinner size="lg" color="primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && (
            <div className="flex justify-center gap-4 mt-6">
              {page > 0 && (
                <button
                  className={buttonStyles({ variant: "bordered", radius: "full" })}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                >
                  Previous
                </button>
              )}
              {hasMore && (
                <button
                  className={buttonStyles({ color: "primary", radius: "full" })}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
