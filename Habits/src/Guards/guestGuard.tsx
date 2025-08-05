import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../context/userContext";

export default function IsGuest() {
    const { user } = useContext(UserContext);

    if (user) {
        return <Navigate to="/404" replace />;
    }

    return <Outlet />;
}