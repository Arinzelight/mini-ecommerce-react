#  Frontend Test Project: E-Commerce App with Platzi Fake Store API

This project involves building a simple and performant e-commerce frontend using **React**, **Vite**, **Tailwind CSS**, and **Redux Toolkit**. You'll interact with a real API to fetch product data, implement search and filtering features, and manage state for favorites and recently visited products.

---

##  API Reference

Platzi Fake Store API: [https://fakeapi.platzi.com](https://fakeapi.platzi.com)  
Example endpoints:
- `/api/v1/products`
- `/api/v1/categories`
- `/api/v1/products/category/{categoryName}`

---

## 🛠 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- Axios or Fetch API

---

##  Navigation Menu

- Home
- Categories
- Favorites
- Search bar
- (Bonus) Dark mode toggle

---

##  Features & Requirements (Total: 100 Points)

### 1. Home Page (20 points)
- ✅ (10 pts) Fetch and display a list of product categories from the API (`/categories`)
- ✅ (10 pts) Implement a search bar to filter products by title
- (5 pts Bonus) Show the last 5 favorited and 5 last visited products using localStorage or Redux

---

### 2. Categories Page (20 points)
- ✅ (10 pts) Display a list of categories fetched from the API
- ✅ (10 pts) When a category is clicked, show products from that category (`/products/category/{categoryName}`)
-  (5 pts Bonus) Add pagination (e.g., 10 products per page)

---

### 3. Product Listing Page (20 points)
- ✅ (20 pts) Display products in a table with:
  - Product Image
  - Name
  - Price
  - Category
  - Favorite  toggle button
-  (5 pts Bonus) Add pagination for product listing

---

### 4. Product Details Page (20 points)
-  (20 pts) Show the full product info:
  - Product image
  - Name
  - Price
  - Description
  - Category

---

### 5. Favorites Page (20 points)
-  (10 pts) Show a list of favorite products with:
  - Image
  - Name
  - Price
  - Category
- (10 pts) Allow removing products from favorites

---

### 🎁 Bonus (Optional - 5 Points)
-  Add sorting (e.g., by price or name)
-  Add dark mode toggle using Tailwind’s dark mode class

---


