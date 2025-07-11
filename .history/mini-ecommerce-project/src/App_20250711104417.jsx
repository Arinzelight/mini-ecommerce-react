/* eslint-disable prettier/prettier */
import { Route, Routes } from "react-router-dom";

import ProductPage from "./pages/product";
import CategoriesPage from "./pages/categories";

import IndexPage from "@/pages/index";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ProductPage />} path="/products" />
      <Route element={<CategoriesPage />} path="/categories" />
    </Routes>
  );
}

export default App;
