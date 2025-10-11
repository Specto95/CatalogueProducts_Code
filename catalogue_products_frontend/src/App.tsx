import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/CatalogueProducts/Navbar/Navbar";
import { ProtectedRoute } from "./pages/ProtectedRoutes/ProtectedRoute";

const CatalogueProductsView = lazy(() =>
  import("./components/CatalogueProducts/CatalogueProductsView").then(
    (module) => ({
      default: module.CatalogueProductsView,
    })
  )
);

const Login = lazy(() =>
  import("./components/Auth/Login/Login").then((module) => ({
    default: module.Login,
  }))
);

const CreateRole = lazy(() =>
  import("./pages/Roles/Create/CreateRole").then((module) => ({
    default: module.CreateRole,
  }))
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<CatalogueProductsView />} />
          <Route path="/register" element={<CreateRole />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
