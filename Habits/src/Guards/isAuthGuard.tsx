import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function IsAuthGuard() {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}