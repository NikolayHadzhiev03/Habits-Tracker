import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router";
import { ownerHabit } from "../../apis/habitsapi";

interface Habit {
    _id: { $oid: string };
    payload: {
        title: string;
        done: boolean;
    };
}

export default function Profile() {
    const navigate = useNavigate();
    const [habits, setHabits] = useState<Habit[]>([]);
    const { user, logout, token } = useContext(UserContext);
    const { getOwnerOnes } = ownerHabit(token!);

    const logoutHandler = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        logout();
        navigate("/login");
    };

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const response = await getOwnerOnes();
                setHabits(response ?? []);
            } catch (err) {
                console.error("Error fetching habits:", err);
            }
        };

        fetchHabits();
    }, [user]);

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <img src="/images.png" alt="Avatar" className="profile-avatar" />
                <h2 className="profile-name">{user?.username}</h2>
                <p className="profile-email">{user?.email}</p>

                <div className="profile-buttons">
                    <button className="profile-button">Edit Profile</button>
                    <button onClick={logoutHandler} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>

            <div className="myhabits">
                <h1 className="myhabits-title">My Habits</h1>
                {habits.length > 0 ? (
                    habits.map((habit) => (
                        <div key={habit._id.$oid} className="habit-card">
                            <span>
                                {habit.payload.title} - {habit.payload.done ? "Done" : "Not Done"}
                            </span>
                            <button className="done-btn">Done</button>
                        </div>
                    ))
                ) : (
                    <p>No habits found.</p>
                )}
            </div>
        </div>
    );
}
