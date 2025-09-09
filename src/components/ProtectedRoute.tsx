<<<<<<< HEAD
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

const ProtectedRoute = () => {
const { user, isReady } = useAppContext();
    const location = useLocation();
    console.log(user,"protected")
    if (!isReady) return null;
    
    if (!user) {
        if (location.pathname !== "/login") {
            return <Navigate to="/login" replace state={{ from: location }} />;
        }
        return <Outlet />;
    }
    if (user.is_subscribed === false) {
        if (location.pathname !== "/") {
            return <Navigate to="/" replace />;
        }
        return <Outlet />;
=======
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    isAuth: boolean;
    redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    isAuth,
    redirectPath = "/login",
}) => {
    if (!isAuth) {
        return <Navigate to={redirectPath} replace />;
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
    }
    return <Outlet />;
};

export default ProtectedRoute;
