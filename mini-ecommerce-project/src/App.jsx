/* eslint-disable prettier/prettier */
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy load all route components
const IndexPage = lazy(() => import("@/pages/index"));
const ProductPage = lazy(() => import("./pages/product"));
const CategoriesPage = lazy(() => import("./pages/categories"));
const FavoritesPage = lazy(() => import("./pages/favorites"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetails"));
const CartPage = lazy(() => import("./pages/CartPage"));

// Optional: fallback UI
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-primary text-lg font-medium">Loading...</p>
  </div>
);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<ProductPage />} path="/products" />
        <Route element={<CategoriesPage />} path="/categories" />
        <Route element={<FavoritesPage />} path="/favorites" />
        <Route element={<CartPage />} path="/cart" />
        <Route element={<ProductDetailPage />} path="/products/:productSlug" />
      </Routes>
    </Suspense>
  );
}

export default App;
