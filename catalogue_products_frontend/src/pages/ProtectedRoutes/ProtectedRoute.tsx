import { Navigate, Outlet } from "react-router-dom";
import { useSessionProvider } from "../../hooks/useSessionProvider";

export function ProtectedRoute() {
  const { isUserLogged } = useSessionProvider();

  return isUserLogged ? <Outlet /> : <Navigate to="/login" />;
}
