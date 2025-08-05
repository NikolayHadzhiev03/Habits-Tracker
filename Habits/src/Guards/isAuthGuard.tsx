import { useNavigate, Outlet } from "react-router";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

export default function IsAuthGuard() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])

    return <Outlet />;
}