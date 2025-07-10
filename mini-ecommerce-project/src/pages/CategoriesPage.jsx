import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../api/categories';
import DefaultLayout from '@/layouts/default';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState(null); 

  useEffect(() => {
    const getCategoriesData = async () => { 
      setIsLoading(true);
      setError(null); 

      try {
        // Call the external API function.
        const data = await fetchCategories();

        // Filter out categories with null/empty names or invalid image URLs
        const validCategories = data.filter(cat => cat.name && cat.image && cat.image.startsWith('http'));
        setCategories(validCategories);

      } catch (err) {
        setError("Failed to load categories. Please try again later."); 
        console.error("Error setting categories data:", err); 
      } finally {
        setIsLoading(false); 
      }
    };

    getCategoriesData(); // Execute the data fetching
  }, []); 

  // Filter categories based on search term for both sidebar and cards
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-primary">
        <p className="text-2xl font-semibold">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
        <p className="text-2xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <DefaultLayout>
    <div className="container mx-auto p-4 py-8 md:py-10"> 
      <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-8">
        Explore by Category
      </h1>

      <div className="flex flex-col lg:flex-row gap-8"> 

        {/* Left Section: Category Navigation Menu */}
        <div className="lg:w-1/4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md
                      lg:sticky lg:top-[4.5rem] lg:self-start lg:max-h-[calc(100vh-4.5rem)] lg:overflow-y-auto">
          <h2 className="text-xl font-semibold text-primary mb-4">Categories</h2>

          {/* Search Bar for Categories */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search category..."
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Search Icon (SVG) */}
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          {/* List of Categories */}
          <ul className="space-y-2 mb-6 pr-2">
            {filteredCategories.map(category => (
              <li key={category.id}>
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-2 rounded-md transition-colors duration-200
                    ${selectedCategory === category.id
                      ? 'bg-primary text-white' 
                      : 'text-primary hover:bg-primary-light hover:text-white' 
                    }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>

          {/* View All Categories Button */}
          <button className="w-full bg-primary text-white py-2 px-4 rounded-full font-semibold hover:bg-primary-light transition-colors duration-200 flex items-center justify-center gap-2">
            View All Categories
            {/* Arrow Icon (SVG) */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </button>
        </div>

        {/* Right Section: Category Cards Display */}
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCategories.map(category => (
            <div
              key={category.id}
              className="relative group rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105"
            >
              {/* Category Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-70"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/600x400/FDFBF8/07484A?text=${category.name.replace(/\s/g, '+')}`;
                }}
              />

              {/* Overlay for Category Name and Explore Button (hidden by default, visible on hover) */}
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                <a
                  href={`/categories/${category.name.toLowerCase().replace(/\s/g, '-')}`}
                  className="bg-primary text-white py-2 px-4 rounded-full font-semibold hover:bg-primary-light transition-colors duration-200"
                >
                  Explore Category
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </DefaultLayout>
  );
}