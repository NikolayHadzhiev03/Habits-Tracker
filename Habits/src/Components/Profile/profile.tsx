import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/userContext";
import { type AppDispatch, type RootState } from "../../Store/store";
import { changeHabit, ownerHabits } from "../../Store/habitSlice";
import toast from "react-hot-toast";
export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { user, logout, token } = useContext(UserContext);
    const { items: habits, loading, error } = useSelector(
        (state: RootState) => state.habits
    );
    const [removingHabitIds, setRemovingHabitIds] = useState<string[]>([]);

    const logoutHandler = () => {
        logout();
        setTimeout(() => {
            navigate("/login");
        }, 1);
    };

    useEffect(() => {
        dispatch(ownerHabits(token!));

    }, [dispatch, user]);

    const updatehabit = async (habitId: string) => {
        try {
            await dispatch(changeHabit(habitId)).unwrap();
            setRemovingHabitIds((prev) => [...prev, habitId]);
            setTimeout(() => {
                setRemovingHabitIds((prev) => prev.filter((id) => id !== habitId));
            }, 3000);
        } catch (err: any) {
            toast.error(err);
        }
    };

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <img src="/images.png" alt="Avatar" className="profile-avatar" />
                <h2 className="profile-name">{user?.username}</h2>
                <p className="profile-email">{user?.email}</p>

                <div className="profile-buttons">
                    <button
                        className="profile-button"
                        onClick={() => navigate("/edit-profile")}
                    >
                        Edit Profile
                    </button>
                    <button onClick={logoutHandler} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>

            <div className="myhabits">
                <h1 className="myhabits-title">My Habits</h1>
                {loading && <p>Loading habits...</p>}
                {error && <p>{error}</p>}
                {habits.length > 0 ? (
                    habits.map((habit) => (
                        <div
                            key={habit._id}
                            className={`habit-card 
                ${habit.done ? "done-habit" : ""} 
                ${removingHabitIds.includes(habit._id) ? "fade-out" : ""}`}
                        >
                            <span>
                                {habit.title} - {habit.done ? "Done" : "Not Done"}
                            </span>
                            {!habit.done && (
                                <button
                                    className="done-btn"
                                    onClick={() => updatehabit(habit._id)}
                                >
                                    Done
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    !loading && <p>No habits found.</p>
                )}
            </div>
        </div>
    );
}
