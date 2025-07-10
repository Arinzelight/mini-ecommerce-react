/* eslint-disable prettier/prettier */
import { Route, Routes } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";

import IndexPage from "@/pages/index";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<CategoriesPage />} path="/categories" />
    </Routes>
  );
}

export default App;
