import React, { useState, useEffect } from "react";
import { Spinner } from "@heroui/spinner";

import { fetchCategories } from "../api/categories";
import { fetchProductsByCategory } from "../api/products";

import DefaultLayout from "@/layouts/default";
import ProductGrid from "@/components/ProductGrid";

// Number of categories to display in the sidebar
const SIDEBAR_CATEGORY_LIMIT = 5;

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const PRODUCTS_PER_PAGE = 10;

  // Fetch all valid categories on initial load
  useEffect(() => {
    const getCategoriesData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchCategories();
        const validCategories = data.filter(
          (cat) => cat.name && cat.image && cat.image.startsWith("http"),
        );
        setCategories(validCategories);
      } catch (err) {
        setError(`Failed to load categories. Please try again later: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    getCategoriesData();
  }, []);

  // Fetch products when a category is selected
  useEffect(() => {
    const getProductsForCategory = async () => {
      if (!selectedCategory) {
        setProducts([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const allProducts = await fetchProductsByCategory(selectedCategory);
        const validProducts = allProducts.filter(
          (prod) =>
            prod.title &&
            prod.images &&
            prod.images.length > 0 &&
            prod.images[0].startsWith("http"),
        );
        setProducts(validProducts.slice(0, PRODUCTS_PER_PAGE));
      } catch (err) {
        setError(`Failed to load products for category. ${err.message}`);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getProductsForCategory();
  }, [selectedCategory]);

  // Handle selecting a specific category
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Reset to show all categories
  const handleViewAllCategoriesClick = () => {
    setSelectedCategory(null);
    setSearchTerm("");
  };

  // Filter categories based on search input
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Limit sidebar categories to display
  const sidebarCategories = filteredCategories.slice(0, SIDEBAR_CATEGORY_LIMIT);

  // Show loading state for categories
  if (isLoading && !selectedCategory) {
    return (
      <DefaultLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-primary">
          <div className="flex flex-col items-center">
            <Spinner color="primary" size="lg" />
            <h2 className="text-xl font-semibold text-primary dark:text-secondary-mint mb-4">
              Loading categories...
            </h2>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  // Show error state for categories
  if (error && !selectedCategory) {
    return (
      <DefaultLayout>
        <div className="min-h-screen flex items-center justify-center bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
          <p className="text-2xl font-semibold">Error: {error}</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 py-8 md:py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center pb-10 text-primary mb-8 dark:text-secondary-mint">
          Explore by Category
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar: Category Filter */}
          <div
            className="lg:w-1/4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md
                        lg:sticky lg:top-[4.5rem] lg:self-start lg:max-h-[calc(100vh-4.5rem)] lg:overflow-y-auto"
          >
            <h2 className="text-xl font-semibold text-primary dark:text-secondary-mint mb-4">
              Categories
            </h2>

            {/* Search bar for category filtering */}
            <div className="relative mb-6">
              <input
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Search Item...."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* All categories button */}
            <button
              className={`w-full text-left p-2 rounded-md transition-colors duration-200 mb-6
                ${
                  selectedCategory === null
                    ? "bg-primary dark:text-secondary-mint text-white"
                    : "text-primary dark:text-secondary-mint hover:bg-primary-light hover:text-white"
                }`}
              onClick={handleViewAllCategoriesClick}
            >
              All Categories
            </button>

            {/* Sidebar category buttons */}
            <ul className="space-y-2 mb-6 pr-2 hidden lg:block">
              {sidebarCategories.map((category) => (
                <li key={category.id}>
                  <button
                    className={`w-full text-left p-2 rounded-md transition-colors duration-200
                      ${
                        selectedCategory === category.id
                          ? "bg-primary dark:text-secondary-mint text-white"
                          : "text-primary dark:text-secondary-mint hover:bg-primary-light hover:text-white"
                      }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main content: Category cards or product grid */}
          <div className="lg:w-3/4">
            {selectedCategory === null ? (
              // Show all category cards
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                  <div
                    key={category.id}
                    className="relative group rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 transition-transform duration-300 lg:hover:scale-105"
                  >
                    <img
                      alt={category.name}
                      className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-70"
                      src={category.image}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x400/FDFBF8/07484A?text=${category.name.replace(/\s/g, "+")}`;
                      }}
                    />
                    <div
                      className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <h3 className="text-white text-xl font-bold mb-2">
                        {category.name}
                      </h3>
                      <button
                        className="bg-primary text-white py-2 px-4 rounded-full font-semibold hover:bg-primary-light transition-colors duration-200"
                        onClick={() => handleCategoryClick(category.id)}
                      >
                        Explore Category
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Show products under selected category
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6 dark:text-secondary-lavender">
                  Products in{" "}
                  {categories.find((cat) => cat.id === selectedCategory)
                    ?.name || "Selected Category"}
                </h2>

                {isLoading ? (
                  <div className="flex items-center justify-center h-48 text-primary">
                    <p className="text-xl font-semibold">Loading products...</p>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-48 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                    <p className="text-xl font-semibold">
                      Error loading products: {error}
                    </p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="flex items-center justify-center h-48 text-gray-600 dark:text-gray-400">
                    <p className="text-xl font-semibold">
                      No products found for this category.
                    </p>
                  </div>
                ) : (
                  <ProductGrid products={products} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
