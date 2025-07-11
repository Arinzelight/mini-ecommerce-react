/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { button as buttonStyles } from "@heroui/theme";

// API function to fetch products
import { fetchProducts } from "@/api/products";
// UI components
import SearchInput from "@/components/SearchInput";
import DefaultLayout from "@/layouts/default";
import ProductDisplay from "@/components/ProductDisplay";

// Number of products per page for pagination
const PRODUCTS_PER_PAGE = 10;

/**
 * ProductPage Component
 * - Displays a searchable and paginated list of products.
 * - Uses a layout wrapper, custom search input, and grid display.
 */
function ProductPage() {
  // ---------- STATE ----------
  const [products, setProducts] = useState([]); // Product data
  const [page, setPage] = useState(0); // Pagination: current page
  const [searchTerm, setSearchTerm] = useState(""); // Current search query
  const [loading, setLoading] = useState(false); // Loader toggle
  const [hasMore, setHasMore] = useState(true); // Flag to disable "Next" button

  // ---------- FETCH PRODUCTS ----------
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true); // Start loader

      const data = await fetchProducts(page, PRODUCTS_PER_PAGE, searchTerm);

      setProducts(data);
      setHasMore(data.length === PRODUCTS_PER_PAGE); // If fewer items returned, no more pages
      setLoading(false); // Stop loader
    };

    loadProducts();
  }, [page, searchTerm]);

  // ---------- HANDLE SEARCH ----------
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0); // Reset pagination when a new search is performed
  };

  return (
    <DefaultLayout>
      {/* Main wrapper for spacing and background */}
      <div className="flex flex-col gap-8 py-5 px-4 bg-secondary-blush dark:bg-transparent rounded-md transition-all duration-500 min-h-screen">
        <h1 className="text-center text-5xl font-semibold dark:text-secondary-mint">
          Products
        </h1>

        <section className="flex flex-col gap-8 py-10 px-4 bg-secondary-blush dark:bg-transparent rounded-md transition-all duration-500 min-h-screen">
          {/* Search Input Field */}
          <div className="max-w-md w-full mx-auto">
            <SearchInput
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Product Display Section */}
          <div>
            {loading ? (
              // Loader displayed during fetch
              <div className="flex justify-center items-center py-10">
                <Spinner color="primary" size="lg" />
              </div>
            ) : (
              // Product Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductDisplay key={product.id} product={product} />
                ))}

                {/* No Results Message */}
                {!hasMore && products.length === 0 && (
                  <div className="col-span-full text-center text-primary font-semibold">
                    No products found. Try a different search term.
                  </div>
                )}
              </div>
            )}

            {/* Pagination Buttons */}
            {!loading && (
              <div className="flex justify-center gap-4 mt-6">
                {/* Previous Page Button */}
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

                {/* Next Page Button */}
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
