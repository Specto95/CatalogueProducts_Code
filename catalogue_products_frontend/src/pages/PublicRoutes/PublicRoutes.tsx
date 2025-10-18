import { Navigate, Outlet } from "react-router-dom";
import { useSessionProvider } from "../../hooks/useSessionProvider";

export function PublicRoute() {
  const { isUserLogged } = useSessionProvider();

  return isUserLogged ? <Navigate to="/" replace /> : <Outlet />;
}
