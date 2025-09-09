import React from "react";
import { Navigate, Outlet } from "react-router-dom";
<<<<<<< HEAD
import { useAppContext } from "@/context/AppContext";

const PublicRoute: React.FC = () => {
    const { user } = useAppContext()
    if (user?.is_subscribed) {
=======
import { getCookie } from "../util/cookies";

const PublicRoute: React.FC = () => {
    const token = getCookie("access_token");

    if (token) {
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
