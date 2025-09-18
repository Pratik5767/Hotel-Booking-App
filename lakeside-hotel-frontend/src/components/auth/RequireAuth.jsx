import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children, requireAdmin = false }) => {
    const location = useLocation();
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
        return <Navigate to={"/login"} state={{ path: location.pathname }} />
    }

    if (requireAdmin && userRole !== "ROLE_ADMIN") {
        return <Navigate to={"/"} state={{ message: "Unauthorized Access!", type: "error" }} />
    }

    return children;
}

export default RequireAuth;