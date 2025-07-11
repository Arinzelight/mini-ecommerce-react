/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { button as buttonStyles } from "@heroui/theme";

import { fetchProducts } from "@/api/products";
import { fetchCategories } from "@/api/categories";
import ProductCard from "@/components/ProductCard";
import SearchInput from "@/components/SearchInput";

function ProductPage() {
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0); // Reset to first page when searching
  };

  return (
    <DefaultLayout>
        
    </DefaultLayout>
    <div>
      <h3>ProductPage</h3>
      {/* Search Input */}
      <div className="max-w-md w-full mx-auto">
        <SearchInput
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-primary mb-4">Products</h2>

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
                className={buttonStyles({ color: "primary", radius: "full" })}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
