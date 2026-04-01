import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
//   const isAuth = localStorage.getItem("token");
    const user = localStorage.getItem("user");
     // debug
    console.log("ProtectedRoute user:", user);
    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;

//   return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;