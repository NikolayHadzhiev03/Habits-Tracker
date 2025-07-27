import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router";
import { ownerHabit } from "../../apis/habitsapi";
import { updateHabit } from "../../apis/habitsapi";

interface Habit {
    _id: string;
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
    const { markHabitAsDone } = updateHabit();

    const logoutHandler = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        logout();
        navigate("/login");
    };

    const fetchHabits = async () => {
        try {
            const response = await getOwnerOnes();
            setHabits(response ?? []);
        } catch (err) {
            console.error("Error fetching habits:", err);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, [user]);

    const updatehabit = async (habitId: string) => {
        try {
            await markHabitAsDone(habitId);
            await fetchHabits();
        } catch (err) {
            console.error("Error updating habit:", err);
        }
    };

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
                    habits.map((habit) => {
                        return (
                            <div
                                key={habit._id}
                                className={`habit-card ${habit.payload.done ? "done-habit" : ""}`}
                            >
                                <span>
                                    {habit?.payload?.title} -{" "}
                                    {habit?.payload?.done ? "Done" : "Not Done"}
                                </span>
                                {!habit.payload.done && (
                                    <button
                                        className="done-btn"
                                        onClick={() => updatehabit(habit._id)}
                                    >
                                        Done
                                    </button>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p>No habits found.</p>
                )}
            </div>
        </div>
    );
}
