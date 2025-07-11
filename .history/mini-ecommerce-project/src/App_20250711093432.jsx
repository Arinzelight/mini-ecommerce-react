/* eslint-disable prettier/prettier */
import { Route, Routes } from "react-router-dom";

import ProductPage from "./pages/product";

import IndexPage from "@/pages/index";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ProductPage />} path="/products" />
    </Routes>
  );
}

export default App;
