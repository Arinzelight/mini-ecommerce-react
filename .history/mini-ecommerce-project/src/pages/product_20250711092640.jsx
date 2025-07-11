import ProductCard from '@/components/ProductCard';
import { Spinner } from "@heroui/spinner";

function ProductPage() {
    
  return (
    <div>
      <h3>ProductPage</h3>
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

export default ProductPage