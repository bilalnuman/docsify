import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../util/cookies";

const PublicRoute: React.FC = () => {
    const token = getCookie("access_token");

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
