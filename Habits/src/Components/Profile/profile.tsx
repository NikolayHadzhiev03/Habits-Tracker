import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import { useNavigate } from "react-router";
export default function Profile() {
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);
    const logoutHandler = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        logout();
        navigate("/login");
    };



    return (
        <div className="profile-container">
            <img src="/images.png" alt="Avatar" className="profile-avatar" />
            <h2 className="profile-name">{user?.username}</h2>
            <p className="profile-email">{user?.email}</p>
            <button className="profile-button">Edit Profile</button>
            <button onClick={logoutHandler} className="logout-link">
                Logout
            </button>
        </div>
    )
}