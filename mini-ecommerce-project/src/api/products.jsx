/* eslint-disable prettier/prettier */
const BASE_URL = "https://api.escuelajs.co/api/v1";

// Fetch product
export const fetchProducts = async (page = 0, limit = 10, title = "") => {
  try {
    const query = new URLSearchParams({
      offset: (page * limit).toString(),
      limit: limit.toString(),
    });

    if (title) query.append("title", title);

    const res = await fetch(`${BASE_URL}/products?${query.toString()}`);

    if (!res.ok) throw new Error("Failed to fetch products");

    return await res.json();
  } catch (error) {
    console.error("Product fetch error:", error);

    return [];
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (
  categoryId,
  offset = 0,
  limit = 10
) => {
  try {
    const query = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    });

    // API call to the specific category products endpoint
    const res = await fetch(
      `${BASE_URL}/categories/${categoryId}/products?${query.toString()}`
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch products for category ${categoryId}. Status: ${res.status}`
      );
    }

    const data = await res.json();

    // The API might return an empty array if categoryId is invalid ensure its array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);

    return [];
  }
};

// Fetch product by slug
export const fetchProductDetails = async (productSlug) => { 
  try {
    const res = await fetch(`${BASE_URL}/products/slug/${productSlug}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch product with slug "${productSlug}". Status: ${res.status}`);
    }

    const data = await res.json();

    // The API might return an object with a 'statusCode' if not found,
    // instead of a direct 404 HTTP status code. Check for this.
    if (data && data.statusCode === 404) {
      throw new Error(`Product with slug "${productSlug}" not found.`);
    }

    return data; 
  } catch (error) {
    console.error(`Error fetching product with slug "${productSlug}":`, error);
    return null; 
  }
};