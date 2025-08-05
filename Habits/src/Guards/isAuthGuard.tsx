import { useNavigate, Outlet } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function IsAuthGuard() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();


    if (!user) {
        navigate('/404')
    }

    return <Outlet />;
}