import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/CatalogueProducts/Navbar/Navbar";
import { ProtectedRoute } from "./pages/ProtectedRoutes/ProtectedRoute";
import { PublicRoute } from "./pages/PublicRoutes/PublicRoutes";

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

const ChangePassword = lazy(() =>
  import("./pages/ChangePassword/ChangePassword").then((module) => ({
    default: module.ChangePassword,
  }))
);

const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword").then((module) => ({
    default: module.ForgotPassword,
  }))
);

const ResetPassword = lazy(() =>
  import("./pages/ForgotPassword/ResetPassword/ResetPassword").then(
    (module) => ({
      default: module.ResetPassword,
    })
  )
);

const NotFound = lazy(() =>
  import("./pages/NotFound/NotFound").then((module) => ({
    default: module.NotFound,
  }))
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <Routes>
        {/* Public routes */}

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<CatalogueProductsView />} />
          <Route path="/register" element={<CreateRole />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
