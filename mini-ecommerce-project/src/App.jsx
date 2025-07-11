/* eslint-disable prettier/prettier */
import { Route, Routes } from "react-router-dom";

import ProductPage from "./pages/product";
import CategoriesPage from "./pages/categories";
import FavoritesPage from "./pages/favorites";

import IndexPage from "@/pages/index";


function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ProductPage />} path="/products" />
      <Route element={<CategoriesPage />} path="/categories" />
      <Route element={<FavoritesPage />} path="/favorites" />
    </Routes>
  );
}

export default App;
