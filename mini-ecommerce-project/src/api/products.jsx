/* eslint-disable prettier/prettier */
export const fetchProducts = async (page = 0, limit = 10, title = "") => {
  try {
    const query = new URLSearchParams({
      offset: (page * limit).toString(),
      limit: limit.toString(),
    });

    if (title) query.append("title", title);

    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products?${query.toString()}`,
    );

    if (!res.ok) throw new Error("Failed to fetch products");

    return await res.json();
  } catch (error) {
    console.error("Product fetch error:", error);

    return [];
  }
};
