import { useEffect, useState } from "react";

import { getAllHabits } from "../../apis/habitsapi";

interface Habit {
    _id: string;
    payload: {
        title: string;
        done: boolean;
    };
}

export default function Habits() {
    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        const { getAll } = getAllHabits();
        const fetchHabits = async () => {
            try {
                const response = await getAll();
                setHabits(response ?? []);
            } catch (err) {
                console.error("Error fetching habits:", err);
            }
        };

        fetchHabits();
    }, []);


    return (
        <div className="box">
            <h1 className="myhabits">All Habits</h1>
            {habits.length > 0 ? (
                habits.map((habit) => (
                    <div key={habit._id}>
                        {habit.payload.title} - {habit.payload.done ? "Done" : "Not Done"}
                    </div>
                ))
            ) : (
                <p>No habits found.</p>
            )}
        </div>
    );
}
