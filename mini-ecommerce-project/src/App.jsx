/* eslint-disable prettier/prettier */
import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ProductPage from "./pages/product";
import CategoriesPage from "./pages/categories";
import FavoritesPage from "./pages/favorites";
import ProductDetailPage from "./pages/ProductDetails";



function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ProductPage />} path="/products" />
      <Route element={<CategoriesPage />} path="/categories" />
      <Route element={<FavoritesPage />} path="/favorites" />
      <Route element={<ProductDetailPage />} path="/products/:productSlug" />
    </Routes>
  );
}

export default App;
