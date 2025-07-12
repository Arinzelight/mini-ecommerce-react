import React, { useState, useEffect, useRef } from 'react'; 
import DefaultLayout from '@/layouts/default';
import { useParams } from 'react-router-dom';
import { fetchProductDetails, fetchProductsByCategory } from '../api/products';
import ProductDisplay from '@/components/ProductDisplay'; 

// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_FAVORITE } from '@/store/actionTypes';

export default function ProductDetailPage() {
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true); 
  const [errorRelated, setErrorRelated] = useState(null);

  // Ref for the carousel container to enable scrolling
  const carouselRef = useRef(null);

  // Redux hooks
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favorites.items);
  const isFavorite = product ? favoriteItems.some((item) => item.id === product.id) : false;

  // Main Product Details Fetch Effect 
  useEffect(() => {
    const getProductDetails = async () => {
      setIsLoading(true);
      setError(null);
      setProduct(null);

      try {
        const fetchedProduct = await fetchProductDetails(productSlug);

        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("Product not found or failed to load.");
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        console.error("Error in ProductDetailPage:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (productSlug) {
      getProductDetails();
    } else {
      setIsLoading(false);
      setError("No product slug provided in the URL.");
    }
  }, [productSlug]);

  // Related Products Fetch Effect 
  useEffect(() => {
    const getRelatedProducts = async () => {
      if (!product || !product.category?.id) {
        setRelatedProducts([]); 
        setIsLoadingRelated(false);
        return;
      }

      setIsLoadingRelated(true);
      setErrorRelated(null);

      try {
        // Fetch products from the same category
        const allCategoryProducts = await fetchProductsByCategory(product.category.id, 0, 20); 

        // Filter out the current product and invalid products
        const validRelatedProducts = allCategoryProducts.filter(
          (prod) =>
            prod.id !== product.id && // Exclude the current product itself
            prod.title &&
            prod.images &&
            prod.images.length > 0 &&
            prod.images[0].startsWith('http')
        );
        setRelatedProducts(validRelatedProducts);
      } catch (err) {
        setErrorRelated("Failed to load related products.");
        console.error("Error fetching related products:", err);
        setRelatedProducts([]);
      } finally {
        setIsLoadingRelated(false);
      }
    };

    getRelatedProducts();
  }, [product]); // Re-run when the main 'product' object changes 

  // Redux Action Handler
  const handleToggleFavorite = () => {
    if (product) {
      dispatch({
        type: TOGGLE_FAVORITE,
        payload: product,
      });
      console.log(`${isFavorite ? 'Removed' : 'Added'} "${product.title}" from favorites!`);
    }
  };

  // Carousel Navigation Handlers
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300; 
      if (direction === 'left') {
        carouselRef.current.scrollLeft -= scrollAmount;
      } else {
        carouselRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  // Conditional Rendering for Main Product Details 
  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4.5rem)] text-primary">
          <p className="text-2xl font-semibold">Loading product details...</p>
        </div>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4.5rem)] bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
          <p className="text-2xl font-semibold">Error: {error}</p>
        </div>
      </DefaultLayout>
    );
  }

  if (!product) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4.5rem)] text-gray-600 dark:text-gray-400">
          <p className="text-2xl font-semibold">Product not found.</p>
        </div>
      </DefaultLayout>
    );
  }

  // Product Details Display
  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 py-8 md:py-10">
        {/* Main Product Details Section */}
        <div className="flex flex-col lg:flex-row gap-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12"> 
          {/* Product Image Section */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src={product.images[0] || `https://placehold.co/600x400/FDFBF8/07484A?text=No+Image`}
              alt={product.title}
              className="w-full max-w-lg h-auto rounded-lg object-contain border border-gray-200 dark:border-gray-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/600x400/FDFBF8/07484A?text=${encodeURIComponent(product.title || 'Product')}`;
              }}
            />
          </div>

          {/* Product Info Section */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-primary mb-2">{product.title}</h1>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">${product.price}</p>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Category Display */}
            {product.category && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Category: <span className="font-semibold text-primary">{product.category.name}</span>
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              {/* Add to Cart Button */}
              <button
                onClick={() => console.log("Add to Cart clicked! (Feature to be implemented by another developer)")}
                disabled
                className="w-full sm:w-auto bg-gray-300 text-gray-600 py-3 px-6 rounded-full font-semibold cursor-not-allowed shadow-md"
              >
                Add to Cart
              </button>

              {/* Add to Favorites Button  */}
              <button
                onClick={handleToggleFavorite}
                className={`w-full sm:w-auto py-3 px-6 rounded-full font-semibold transition-colors duration-200 ${
                  isFavorite
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'border border-primary text-primary hover:bg-primary-light hover:text-white'
                }`}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Carousel Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Other Related Products</h2>

          {isLoadingRelated ? (
            <div className="flex items-center justify-center h-48 text-primary">
              <p className="text-xl font-semibold">Loading related products...</p>
            </div>
          ) : errorRelated ? (
            <div className="flex items-center justify-center h-48 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
              <p className="text-xl font-semibold">Error loading related products: {errorRelated}</p>
            </div>
          ) : relatedProducts.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-600 dark:text-gray-400">
              <p className="text-xl font-semibold">No related products found.</p>
            </div>
          ) : (
            <div className="relative">
              {/* Left Scroll Button */}
              <button
                onClick={() => scrollCarousel('left')}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md z-10 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6 text-primary dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>

              {/* Carousel Track */}
              <div
                ref={carouselRef} 
                className="flex overflow-x-auto scroll-smooth space-x-4 p-2 hide-scrollbar" 
              >
                {relatedProducts.map(relatedProduct => (
                  <div key={relatedProduct.id} className="flex-none w-64"> 
                    <ProductDisplay product={relatedProduct} /> 
                  </div>
                ))}
              </div>

              {/* Right Scroll Button */}
              <button
                onClick={() => scrollCarousel('right')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md z-10 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6 text-primary dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}