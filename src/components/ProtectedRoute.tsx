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
    }
    return <Outlet />;
};

export default ProtectedRoute;
