import { useContext, useState } from "react";
import { createHabit } from "../../apis/habitsapi";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/userContext";

export default function CreateHabit() {
    const { create } = createHabit();
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const userId = user.user?.id;

    const handleCreate = async () => {
        if (!title.trim()) return;
        try {
            await create(title, userId ?? "");
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
