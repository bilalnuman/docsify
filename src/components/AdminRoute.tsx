import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { parseJwt } from "../util/jwt";

const AdminRoute: React.FC<{ redirectTo?: string }> = ({ redirectTo = "/dashboard" }) => {
    const payload = parseJwt();
    const role = payload?.role?.toLowerCase() ?? "";
    return role === "admin" ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default AdminRoute;
