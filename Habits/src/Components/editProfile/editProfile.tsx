import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { updateUser } from "../../apis/authapi";
import { useNavigate } from "react-router";

export default function EditProfile() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)
    const { update } = updateUser();

    const [form, setForm] = useState({
        username: user?.username ?? "",
        email: user?.email ?? "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const res = await update(form.username, form.email, form.password);
            setUser(res);
            navigate("/profile");
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    return (
        <div className="edit-profile-page">
            <h2>Edit Profile</h2>
            <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="New username"
            />
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="New email"
            />
            <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="New password"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => navigate("/profile")}>Cancel</button>
        </div>
    );
}