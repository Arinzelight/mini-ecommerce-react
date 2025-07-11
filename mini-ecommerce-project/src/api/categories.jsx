/* eslint-disable prettier/prettier */
const BASE_URL = "https://api.escuelajs.co/api/v1";

// Fetch categories
export const fetchCategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories`);

    if (!res.ok) throw new Error("Failed to fetch categories");

    return await res.json();
  } catch (error) {
    console.error("Categories fetch error:", error);

    return [];
  }
};
