/* eslint-disable prettier/prettier */
import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<IndexPage />} path="/produc" />
    </Routes>
  );
}

export default App;
