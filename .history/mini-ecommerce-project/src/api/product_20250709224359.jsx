const BASE_URL = "https://api.escuelajs.co/api/v1";

export const fetchProducts = async (page = 0, limit = 10) => {
  try {
    const res = await fetch(
      `${BASE_URL}/products?offset=${page * limit}&limit=${limit}`
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (error) {
    console.error("Product fetch error:", error);
    return [];
  }
};
