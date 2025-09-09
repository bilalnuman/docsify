import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

export default function RoleRoute({
  allow,
  deny,
  redirectTo = "/dashboard",
  fallback = null,
}: {
  allow?: string[];
  deny?: string[];
  redirectTo?: string;
  fallback?: React.ReactNode;
}) {
  const { user } = useAppContext();

  const r = user?.profile?.role ?? "";
  if (allow?.length) return allow.map(x => x.toLowerCase()).includes(r) ? <Outlet /> : <Navigate to={redirectTo} replace />;
  if (deny?.length)  return deny.map(x => x.toLowerCase()).includes(r)  ? <Navigate to={redirectTo} replace /> : <Outlet />;
  return <Outlet />;
}
