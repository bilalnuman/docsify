import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

const PublicRoute: React.FC = () => {
    const { user } = useAppContext()
    if (user?.is_subscribed) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
