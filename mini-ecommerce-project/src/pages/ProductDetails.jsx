import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { fetchProductDetails, fetchProductsByCategory } from "../api/products";

import DefaultLayout from "@/layouts/default";
import ProductDisplay from "@/components/ProductDisplay";

import { TOGGLE_FAVORITE } from "@/store/actionTypes";
import { HeartIcon, HeartFilledIcon } from "@/components/icons";

export default function ProductDetailPage() {
  const { productSlug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true);
  const [errorRelated, setErrorRelated] = useState(null);
  const [currentImage, setCurrentImage] = useState('');

  const carouselRef = useRef(null);

  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favorites.items);
  const isFavorite = product
    ? favoriteItems.some((item) => item.id === product.id)
    : false;

  // Fetch product details based on slug
  useEffect(() => {
    const getProductDetails = async () => {
      setIsLoading(true);
      setError(null);
      setProduct(null);
      setCurrentImage('');

      try {
        const fetchedProduct = await fetchProductDetails(productSlug);

        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setCurrentImage(fetchedProduct.images?.[0] || `https://placehold.co/600x400/FDFBF8/07484A?text=No+Image`);
        } else {
          setError("Product not found or failed to load.");
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred." + err);
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

  // Fetch related products based on the same category
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
        const allCategoryProducts = await fetchProductsByCategory(
          product.category.id,
          0,
          20,
        );

        const validRelatedProducts = allCategoryProducts.filter(
          (prod) =>
            prod.id !== product.id &&
            prod.title &&
            prod.images &&
            prod.images.length > 0 &&
            prod.images[0].startsWith("http"),
        );

        setRelatedProducts(validRelatedProducts);
      } catch (err) {
        setErrorRelated("Failed to load related products." + err);
        setRelatedProducts([]);
      } finally {
        setIsLoadingRelated(false);
      }
    };

    getRelatedProducts();
  }, [product]);

  // Toggle product as favorite
  const handleToggleFavorite = () => {
    if (product) {
      dispatch({
        type: TOGGLE_FAVORITE,
        payload: product,
      });
    }
  };

  // Scroll carousel left or right
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;

      if (direction === "left") {
        carouselRef.current.scrollLeft -= scrollAmount;
      } else {
        carouselRef.current.scrollLeft += scrollAmount;
      }
    }
  };

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

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 py-8 md:py-10">
        {/* Main Product Details Section */}
        <div className="flex flex-col lg:flex-row gap-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
          {/* Product Image Section */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              alt={product.title}
              className="w-full max-w-lg h-auto rounded-lg object-contain border border-gray-200 dark:border-gray-700"
              src={currentImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/600x400/FDFBF8/07484A?text=${encodeURIComponent(product.title || "Product")}`;
              }}
            />
          </div>

          {/* Product Info Section */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-primary dark:text-secondary-mint mb-2">
              {product.title}
            </h1>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
              ${product.price}
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Category Display */}
            {product.category && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Category:{" "}
                <span className="font-semibold text-primary dark:text-secondary-mint">
                  {product.category.name}
                </span>
              </p>
            )}

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex overflow-x-auto scroll-smooth space-x-2 p-2 hide-scrollbar w-full max-w-lg justify-center mb-6">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} - view ${index + 1}`}
                    className={clsx(
                      "w-20 h-20 object-cover rounded-md cursor-pointer border-2",
                      "transition-all duration-200",
                      image === currentImage
                        ? "border-primary dark:border-secondary-mint"
                        : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                    )}
                    onClick={() => setCurrentImage(image)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/80x80/FDFBF8/07484A?text=Img`;
                    }}
                  />
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                disabled
                className="w-full sm:w-auto bg-gray-300 text-gray-600 py-3 px-6 rounded-full font-semibold cursor-not-allowed shadow-md"
                onClick={() =>
                  console.log(
                    "Add to Cart clicked! (Feature to be implemented by another developer)"
                  )
                }
              >
                Add to Cart
              </button>

              <button
                className={`w-full sm:w-auto py-3 px-6 rounded-full font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
                  isFavorite
                    ? "bg-transparent border border-red-600  hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white dark:border-red-500 text-red-500"
                    : "border border-primary text-primary hover:bg-primary-light dark:hover:bg-green-500 dark:hover:text-white dark:border-green-500 dark:text-green-500 hover:text-white"
                }`}
                onClick={handleToggleFavorite}
              >
                {isFavorite ? (
                  <HeartFilledIcon className="w-5 h-5" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Carousel Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-primary dark:text-secondary-mint mb-6">
            Other Related Products
          </h2>

          {isLoadingRelated ? (
            <div className="flex items-center justify-center h-48 text-primary">
              <p className="text-xl font-semibold">
                Loading related products...
              </p>
            </div>
          ) : errorRelated ? (
            <div className="flex items-center justify-center h-48 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
              <p className="text-xl font-semibold">
                Error loading related products: {errorRelated}
              </p>
            </div>
          ) : relatedProducts.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-600 dark:text-gray-400">
              <p className="text-xl font-semibold">
                No related products found.
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Scroll left button */}
              <button
                aria-label="Scroll left"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md z-10 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                onClick={() => scrollCarousel("left")}
              >
                <svg
                  className="w-6 h-6 text-primary dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>

              {/* Carousel container */}
              <div
                ref={carouselRef}
                className="flex overflow-x-auto scroll-smooth space-x-4 p-2 scrollbar-hide"
              >
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="flex-none w-40 sm:w-48 md:w-56 lg:w-64 relative"
                  >
                    <ProductDisplay product={relatedProduct} />
                  </div>
                ))}
              </div>

              {/* Scroll right button */}
              <button
                aria-label="Scroll right"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md z-10 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                onClick={() => scrollCarousel("right")}
              >
                <svg
                  className="w-6 h-6 text-primary dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
