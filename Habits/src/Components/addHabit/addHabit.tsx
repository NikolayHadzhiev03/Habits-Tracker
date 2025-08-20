import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/userContext";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Store/store";
import { addHabit } from "../../Store/habitSlice";

export default function CreateHabit() {
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const userID = user.user?.id ?? "";

    const handleCreate = async () => {
        if (!title.trim()) return;
        try {
            await dispatch(addHabit({ title, userID }))
            navigate("/stats");
        } catch (error) {
            console.error("Failed to create habit:", error);
        }
    };

    return (
        <div className="create-habit-page">
            <div>
                <h1>Add New Habit</h1>
                <input
                    type="text"
                    placeholder="Enter habit title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="habit-input"
                />
                <button onClick={handleCreate} className="habit-btn">
                    Create
                </button>
            </div>
        </div>
    );
}
