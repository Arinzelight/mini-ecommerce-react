/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { button as buttonStyles } from "@heroui/theme";

import { fetchProducts } from "@/api/products";
import ProductCard from "@/components/ProductCard";
import SearchInput from "@/components/SearchInput";
import DefaultLayout from "@/layouts/default";

const PRODUCTS_PER_PAGE = 10;

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0); // Reset to first page when searching
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-8 py-10 px-4 bg-secondary-blush dark:bg-primary-light rounded-md transition-all duration-500 min-h-screen">
        <h3 className="text">ProductPage</h3>
        <section className="flex flex-col gap-8 py-10 px-4 bg-secondary-blush dark:bg-primary-light rounded-md transition-all duration-500 min-h-screen">
          {/* Search Input */}
          <div className="max-w-md w-full mx-auto">
            <SearchInput
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4">
              Products
            </h2>

            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Spinner color="primary" size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {!hasMore && products.length === 0 && (
                  <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center text-primary font-semibold">
                    No products found. Try a different search term.
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {!loading && (
              <div className="flex justify-center gap-4 mt-6">
                {page > 0 && (
                  <button
                    className={buttonStyles({
                      variant: "bordered",
                      radius: "full",
                    })}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  >
                    Previous
                  </button>
                )}
                {hasMore && (
                  <button
                    className={buttonStyles({
                      color: "primary",
                      radius: "full",
                    })}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}

export default ProductPage;
