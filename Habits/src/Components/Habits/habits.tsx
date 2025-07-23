import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { getAllHabits } from "../../apis/habitsapi";

interface Habit {
    _id: { $oid: string };
    payload: {
        title: string;
        done: boolean;
    };
}

export default function Habits() {
    const { token, loadingUser } = useContext(UserContext);
    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        if (loadingUser || !token) return;
        const { getAll } = getAllHabits();
        const fetchHabits = async () => {
            try {
                const response = await getAll();
                console.log(response);
                setHabits(response ?? []);
            } catch (err) {
                console.error("Error fetching habits:", err);
            }
        };

        fetchHabits();
    }, [loadingUser, token]);

    if (loadingUser) return <p>Loading habits...</p>;

    return (
        <div className="box">
            <h1 className="myhabits">My Habits</h1>
            {habits.length > 0 ? (
                habits.map((habit) => (
                    <div key={habit._id.$oid}>
                        {habit.payload.title} - {habit.payload.done ? "Done" : "Not Done"}
                    </div>
                ))
            ) : (
                <p>No habits found.</p>
            )}
        </div>
    );
}
