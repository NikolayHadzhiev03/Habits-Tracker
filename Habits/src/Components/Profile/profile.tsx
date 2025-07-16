import { useContext } from "react"
import { UserContext } from "../../context/userContext"

export default function Profile() {
    const { user } = useContext(UserContext);


    return (
        <div className="profile-container">
            <img src="/images.png" alt="Avatar" className="profile-avatar" />
            <h2 className="profile-name">{user?.username}</h2>
            <p className="profile-email">{user?.email}</p>
            <button className="profile-button">Edit Profile</button>
        </div>
    )
}